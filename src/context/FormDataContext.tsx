import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import { MedsCheckFormData, createEmptyFormData } from '@/types/forms'

const STORAGE_KEY = 'medscheck-form-data'
const AUTO_SAVE_INTERVAL = 10000 // 10 seconds

interface FormDataState {
  data: MedsCheckFormData
  lastSaved: Date | null
  isDirty: boolean
  isLoading: boolean
  error: string | null
}

type FormDataAction =
  | { type: 'SET_DATA'; payload: MedsCheckFormData }
  | { type: 'UPDATE_FIELD'; payload: { path: string; value: unknown } }
  | { type: 'MARK_SAVED' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ALL' }
  | { type: 'LOAD_FROM_STORAGE'; payload: MedsCheckFormData }

interface FormDataContextValue extends FormDataState {
  updateField: (path: string, value: unknown) => void
  setFormData: (data: MedsCheckFormData) => void
  saveToStorage: () => void
  clearAllData: () => void
}

const FormDataContext = createContext<FormDataContextValue | undefined>(undefined)

// Helper function to set nested object value by path
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.')
  const result = { ...obj }
  let current: Record<string, unknown> = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (Array.isArray(current[key])) {
      current[key] = [...(current[key] as unknown[])]
    } else if (typeof current[key] === 'object' && current[key] !== null) {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result
}

function formDataReducer(state: FormDataState, action: FormDataAction): FormDataState {
  console.log('🔧 Reducer action:', action.type)
  
  switch (action.type) {
    case 'SET_DATA':
      console.log('📥 SET_DATA - Replacing entire form data')
      console.log('📥 New form1 data:', action.payload.form1)
      console.log('📥 Old form1 data:', state.data.form1)
      // IMPORTANT: Completely replace the data - the AI service already handles all syncing
      return {
        ...state,
        data: action.payload,
        isDirty: false, // Don't mark as dirty since we're setting complete data
        isLoading: false
      }
    
    case 'UPDATE_FIELD': {
      const newData = setNestedValue(
        state.data as unknown as Record<string, unknown>,
        action.payload.path,
        action.payload.value
      ) as unknown as MedsCheckFormData
      
      newData.updatedAt = new Date().toISOString()
      
      return {
        ...state,
        data: newData,
        isDirty: true
      }
    }
    
    case 'MARK_SAVED':
      return {
        ...state,
        lastSaved: new Date(),
        isDirty: false
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    
    case 'CLEAR_ALL':
      return {
        ...state,
        data: createEmptyFormData(),
        isDirty: true,
        lastSaved: null
      }
    
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        data: action.payload,
        isDirty: false,
        isLoading: false,
        lastSaved: new Date()
      }
    
    default:
      return state
  }
}

export function FormDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formDataReducer, {
    data: createEmptyFormData(),
    lastSaved: null,
    isDirty: false,
    isLoading: true,
    error: null
  })

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as MedsCheckFormData
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed })
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch (error) {
      console.error('Failed to load from storage:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load saved data' })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Save to localStorage
  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data))
      dispatch({ type: 'MARK_SAVED' })
    } catch (error) {
      console.error('Failed to save to storage:', error)
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        dispatch({ type: 'SET_ERROR', payload: 'Storage is full. Please clear some data.' })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to save data' })
      }
    }
  }, [state.data])

  // Auto-save effect
  useEffect(() => {
    if (state.isDirty && !state.isLoading) {
      // Clear existing timer
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }

      // Set new timer for auto-save
      autoSaveTimerRef.current = setTimeout(() => {
        saveToStorage()
      }, AUTO_SAVE_INTERVAL)
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [state.isDirty, state.isLoading, saveToStorage])

  // Sync related fields across forms when one is updated
  const syncRelatedFields = useCallback((path: string, value: unknown) => {
    const updates: { path: string; value: unknown }[] = []
    
    // Patient name syncing
    if (path === 'form1.patientName' && typeof value === 'string') {
      // Split "FirstName LastName" into parts
      const parts = value.trim().split(/\s+/)
      const firstName = parts[0] || ''
      const lastName = parts.slice(1).join(' ') || ''
      
      // Sync to shared patient
      updates.push({ path: 'patient.firstName', value: firstName })
      updates.push({ path: 'patient.lastName', value: lastName })
      
      // Sync to Form 2
      updates.push({ path: 'form2.patientFirstName', value: firstName })
      updates.push({ path: 'form2.patientLastName', value: lastName })
      
      // Sync to Form 3
      updates.push({ path: 'form3.patientFirstName', value: firstName })
      updates.push({ path: 'form3.patientLastName', value: lastName })
    }
    
    // When Form 2 first name or last name changes, sync back
    if (path === 'form2.patientFirstName' || path === 'form2.patientLastName') {
      const currentData = state.data
      const firstName = path === 'form2.patientFirstName' ? value as string : currentData.form2.patientFirstName
      const lastName = path === 'form2.patientLastName' ? value as string : currentData.form2.patientLastName
      const fullName = `${firstName} ${lastName}`.trim()
      
      updates.push({ path: 'patient.firstName', value: firstName })
      updates.push({ path: 'patient.lastName', value: lastName })
      updates.push({ path: 'form1.patientName', value: fullName })
      updates.push({ path: 'form3.patientFirstName', value: firstName })
      updates.push({ path: 'form3.patientLastName', value: lastName })
    }
    
    // When Form 3 first name or last name changes, sync back
    if (path === 'form3.patientFirstName' || path === 'form3.patientLastName') {
      const currentData = state.data
      const firstName = path === 'form3.patientFirstName' ? value as string : currentData.form3.patientFirstName
      const lastName = path === 'form3.patientLastName' ? value as string : currentData.form3.patientLastName
      const fullName = `${firstName} ${lastName}`.trim()
      
      updates.push({ path: 'patient.firstName', value: firstName })
      updates.push({ path: 'patient.lastName', value: lastName })
      updates.push({ path: 'form1.patientName', value: fullName })
      updates.push({ path: 'form2.patientFirstName', value: firstName })
      updates.push({ path: 'form2.patientLastName', value: lastName })
    }
    
    // Shared patient firstName/lastName sync to forms
    if (path === 'patient.firstName' || path === 'patient.lastName') {
      const currentData = state.data
      const firstName = path === 'patient.firstName' ? value as string : currentData.patient.firstName
      const lastName = path === 'patient.lastName' ? value as string : currentData.patient.lastName
      const fullName = `${firstName} ${lastName}`.trim()
      
      updates.push({ path: 'form1.patientName', value: fullName })
      updates.push({ path: 'form2.patientFirstName', value: firstName })
      updates.push({ path: 'form2.patientLastName', value: lastName })
      updates.push({ path: 'form3.patientFirstName', value: firstName })
      updates.push({ path: 'form3.patientLastName', value: lastName })
    }
    
    // Patient phone syncing
    if (path === 'form1.patientPhone' && typeof value === 'string') {
      updates.push({ path: 'patient.phone', value })
      updates.push({ path: 'form2.patientPhone', value })
      updates.push({ path: 'form3.patientPhone', value })
    }
    if (path === 'form2.patientPhone' && typeof value === 'string') {
      updates.push({ path: 'patient.phone', value })
      updates.push({ path: 'form1.patientPhone', value })
      updates.push({ path: 'form3.patientPhone', value })
    }
    if (path === 'form3.patientPhone' && typeof value === 'string') {
      updates.push({ path: 'patient.phone', value })
      updates.push({ path: 'form1.patientPhone', value })
      updates.push({ path: 'form2.patientPhone', value })
    }
    if (path === 'patient.phone' && typeof value === 'string') {
      updates.push({ path: 'form1.patientPhone', value })
      updates.push({ path: 'form2.patientPhone', value })
      updates.push({ path: 'form3.patientPhone', value })
    }
    
    // Patient email syncing
    if (path === 'form2.patientEmail' && typeof value === 'string') {
      updates.push({ path: 'patient.email', value })
      updates.push({ path: 'form3.patientEmail', value })
    }
    if (path === 'form3.patientEmail' && typeof value === 'string') {
      updates.push({ path: 'patient.email', value })
      updates.push({ path: 'form2.patientEmail', value })
    }
    if (path === 'patient.email' && typeof value === 'string') {
      updates.push({ path: 'form2.patientEmail', value })
      updates.push({ path: 'form3.patientEmail', value })
    }
    
    // Patient address syncing (Form 1 has single address, Form 2 and 3 have components)
    if (path === 'form1.patientAddress' && typeof value === 'string') {
      updates.push({ path: 'patient.address', value })
    }
    if (path === 'patient.address' && typeof value === 'string') {
      updates.push({ path: 'form1.patientAddress', value })
    }
    
    // Patient city syncing (Form 2 and Form 3)
    if (path === 'form2.patientCity' && typeof value === 'string') {
      updates.push({ path: 'patient.city', value })
      updates.push({ path: 'form3.patientCity', value })
    }
    if (path === 'form3.patientCity' && typeof value === 'string') {
      updates.push({ path: 'patient.city', value })
      updates.push({ path: 'form2.patientCity', value })
    }
    if (path === 'patient.city' && typeof value === 'string') {
      updates.push({ path: 'form2.patientCity', value })
      updates.push({ path: 'form3.patientCity', value })
    }
    
    // Patient province syncing
    if (path === 'form2.patientProvince' && typeof value === 'string') {
      updates.push({ path: 'patient.province', value })
      updates.push({ path: 'form3.patientProvince', value })
    }
    if (path === 'form3.patientProvince' && typeof value === 'string') {
      updates.push({ path: 'patient.province', value })
      updates.push({ path: 'form2.patientProvince', value })
    }
    if (path === 'patient.province' && typeof value === 'string') {
      updates.push({ path: 'form2.patientProvince', value })
      updates.push({ path: 'form3.patientProvince', value })
    }
    
    // Patient postal code syncing
    if (path === 'form2.patientPostalCode' && typeof value === 'string') {
      updates.push({ path: 'patient.postalCode', value })
      updates.push({ path: 'form3.patientPostalCode', value })
    }
    if (path === 'form3.patientPostalCode' && typeof value === 'string') {
      updates.push({ path: 'patient.postalCode', value })
      updates.push({ path: 'form2.patientPostalCode', value })
    }
    if (path === 'patient.postalCode' && typeof value === 'string') {
      updates.push({ path: 'form2.patientPostalCode', value })
      updates.push({ path: 'form3.patientPostalCode', value })
    }
    
    // Patient address components syncing (Unit, Street Number, Street Name, PO Box)
    const addressFields = ['patientUnitNumber', 'patientStreetNumber', 'patientStreetName', 'patientPOBox']
    for (const field of addressFields) {
      if (path === `form2.${field}` && typeof value === 'string') {
        updates.push({ path: `form3.${field}`, value })
      }
      if (path === `form3.${field}` && typeof value === 'string') {
        updates.push({ path: `form2.${field}`, value })
      }
    }
    
    // Pharmacy name syncing
    if (path === 'form2.pharmacyName' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.name', value })
    }
    if (path === 'pharmacy.name' && typeof value === 'string') {
      updates.push({ path: 'form2.pharmacyName', value })
    }
    
    // Pharmacy phone syncing
    if (path === 'form2.pharmacyPhone' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.phone', value })
      updates.push({ path: 'form3.pharmacyPhone', value })
    }
    if (path === 'form3.pharmacyPhone' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.phone', value })
      updates.push({ path: 'form2.pharmacyPhone', value })
    }
    if (path === 'pharmacy.phone' && typeof value === 'string') {
      updates.push({ path: 'form2.pharmacyPhone', value })
      updates.push({ path: 'form3.pharmacyPhone', value })
    }
    
    // Pharmacy fax syncing
    if (path === 'form2.pharmacyFax' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.fax', value })
      updates.push({ path: 'form3.pharmacyFax', value })
    }
    if (path === 'form3.pharmacyFax' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.fax', value })
      updates.push({ path: 'form2.pharmacyFax', value })
    }
    if (path === 'pharmacy.fax' && typeof value === 'string') {
      updates.push({ path: 'form2.pharmacyFax', value })
      updates.push({ path: 'form3.pharmacyFax', value })
    }
    
    // Pharmacist name syncing
    if (path === 'form1.pharmacistName' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.pharmacistName', value })
      updates.push({ path: 'form3.pharmacistName', value })
    }
    if (path === 'form3.pharmacistName' && typeof value === 'string') {
      updates.push({ path: 'pharmacy.pharmacistName', value })
      updates.push({ path: 'form1.pharmacistName', value })
    }
    if (path === 'pharmacy.pharmacistName' && typeof value === 'string') {
      updates.push({ path: 'form1.pharmacistName', value })
      updates.push({ path: 'form3.pharmacistName', value })
    }
    
    // Primary care provider syncing (Form 3 has providerFirstName/LastName)
    if (path === 'form3.providerFirstName' || path === 'form3.providerLastName') {
      const currentData = state.data
      const firstName = path === 'form3.providerFirstName' ? value as string : currentData.form3.providerFirstName
      const lastName = path === 'form3.providerLastName' ? value as string : currentData.form3.providerLastName
      const fullName = `${firstName} ${lastName}`.trim()
      updates.push({ path: 'primaryCareProvider.name', value: fullName })
    }
    if (path === 'form3.providerPhone' && typeof value === 'string') {
      updates.push({ path: 'primaryCareProvider.phone', value })
    }
    if (path === 'form3.providerFax' && typeof value === 'string') {
      updates.push({ path: 'primaryCareProvider.fax', value })
    }
    
    return updates
  }, [state.data])
  
  const updateField = useCallback((path: string, value: unknown) => {
    // First, dispatch the primary update
    dispatch({ type: 'UPDATE_FIELD', payload: { path, value } })
    
    // Then sync related fields (without causing infinite loops)
    const relatedUpdates = syncRelatedFields(path, value)
    for (const update of relatedUpdates) {
      // Only sync if the path is different from the original
      if (update.path !== path) {
        dispatch({ type: 'UPDATE_FIELD', payload: update })
      }
    }
  }, [syncRelatedFields])

  const setFormData = useCallback((data: MedsCheckFormData) => {
    console.log('🎯 setFormData called with form1:', data.form1)
    console.log('🎯 Full data being set:', data)
    dispatch({ type: 'SET_DATA', payload: data })
    console.log('✅ Dispatched SET_DATA action')
    
    // Force save to localStorage immediately to prevent it from loading old data
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      console.log('💾 Saved to localStorage immediately')
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }, [])

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' })
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value: FormDataContextValue = {
    ...state,
    updateField,
    setFormData,
    saveToStorage,
    clearAllData
  }

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  )
}

export function useFormData() {
  const context = useContext(FormDataContext)
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider')
  }
  return context
}

// Utility hook for accessing specific parts of form data
export function useFormField<T>(path: string): [T, (value: T) => void] {
  const { data, updateField } = useFormData()
  
  const getValue = useCallback((): T => {
    const keys = path.split('.')
    let value: unknown = data
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[key]
      } else {
        return undefined as T
      }
    }
    return value as T
  }, [data, path])

  const setValue = useCallback((value: T) => {
    updateField(path, value)
  }, [updateField, path])

  return [getValue(), setValue]
}
