import { createContext, useContext, useState, ReactNode } from 'react'

export interface PDFFormattingSettings {
  fontFamily: 'Times-Roman' | 'Helvetica' | 'Courier'
  fontSize: number
  textColor: string
  isBold: boolean
  borderColor: string
  borderWidth: number
}

interface PDFFormattingContextType {
  settings: PDFFormattingSettings
  updateSettings: (updates: Partial<PDFFormattingSettings>) => void
  resetSettings: () => void
}

const defaultSettings: PDFFormattingSettings = {
  fontFamily: 'Times-Roman',
  fontSize: 9,
  textColor: '#000000',
  isBold: false,
  borderColor: '#000000',
  borderWidth: 1
}

const PDFFormattingContext = createContext<PDFFormattingContextType | undefined>(undefined)

export function PDFFormattingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PDFFormattingSettings>(defaultSettings)

  const updateSettings = (updates: Partial<PDFFormattingSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <PDFFormattingContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </PDFFormattingContext.Provider>
  )
}

export function usePDFFormatting() {
  const context = useContext(PDFFormattingContext)
  if (!context) {
    throw new Error('usePDFFormatting must be used within PDFFormattingProvider')
  }
  return context
}
