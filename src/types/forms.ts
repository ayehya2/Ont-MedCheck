// MedsCheck Forms Data Types
// Single source of truth for all form data across 4 forms

export interface PatientInfo {
  firstName: string
  lastName: string
  dateOfBirth: string // yyyy-mm-dd
  healthCardNumber: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  email: string
  gender: 'male' | 'female' | 'other' | ''
  preferredLanguage: string
}

export interface PharmacyInfo {
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  fax: string
  accreditationNumber: string
  pharmacistName: string
  pharmacistLicenseNumber: string
  pharmacistSignatureDate: string
}

export interface HealthcareProvider {
  name: string
  specialty: string
  phone: string
  fax: string
  address: string
}

export interface Medication {
  id: string
  drugName: string
  din: string // Drug Identification Number
  strength: string
  dosageForm: string // tablet, capsule, etc.
  directions: string
  quantity: string
  frequency: string
  route: string // oral, topical, etc.
  startDate: string
  prescriber: string
  purpose: string
  isOTC: boolean // Over the counter
  isActive: boolean
  notes: string
}

export interface Allergy {
  id: string
  allergen: string
  reaction: string
  severity: 'mild' | 'moderate' | 'severe' | ''
}

export interface MedicalCondition {
  id: string
  condition: string
  diagnosedDate: string
  status: 'active' | 'resolved' | 'managed' | ''
  notes: string
}

export interface DrugTherapyProblem {
  id: string
  category: string
  description: string
  recommendation: string
  priority: 'high' | 'medium' | 'low' | ''
  status: 'identified' | 'resolved' | 'monitoring' | ''
  followUpDate: string
}

export interface MedsCheckService {
  type: 'annual' | 'followUp' | 'diabetes' | 'atHome' | 'ltc' | ''
  serviceDate: string
  reviewDate: string
  nextReviewDate: string
  timeSpent: number // in minutes
  billingCode: string
}

export interface ClinicalNotes {
  pharmacistNotes: string
  patientConcerns: string
  adherenceIssues: string
  lifestyleFactors: string
  recommendations: string
  followUpActions: string
  communicationToPhysician: string
}

export interface Consent {
  patientConsent: boolean
  patientConsentDate: string
  patientSignature: string
  informationSharing: boolean
  dataStorageConsent: boolean
}

export interface Form1Data {
  // Healthcare Provider Notification of MedsCheck Services
  // Recipient Information
  to: string
  faxNumber: string
  telephoneNumber: string
  pages: string
  emailAddress: string
  date: string // yyyy/mm/dd
  
  // Patient Information (Re:)
  patientName: string
  patientAddress: string
  patientPhone: string
  
  // MedsCheck Date
  medsCheckDate: string // yyyy/mm/dd
  
  // Follow-up Status (radio buttons)
  followUpStatus: 'no_issues' | 'issues_identified' | ''
  
  // Issues
  issues: string
  
  // Pharmacist Information
  pharmacistName: string
  pharmacistSignature: string
}

export interface Form2Data {
  // MedsCheck Patient Acknowledgement of Professional Pharmacy Service
  
  // Patient Information
  patientLastName: string
  patientFirstName: string
  patientUnitNumber: string
  patientStreetNumber: string
  patientStreetName: string
  patientPOBox: string
  patientCity: string
  patientProvince: string
  patientPostalCode: string
  patientPhone: string
  patientEmail: string
  
  // Pharmacy Information
  pharmacyName: string
  pharmacyUnitNumber: string
  pharmacyStreetNumber: string
  pharmacyStreetName: string
  pharmacyPOBox: string
  pharmacyCity: string
  pharmacyProvince: string
  pharmacyPostalCode: string
  pharmacyPhone: string
  pharmacyFax: string
  pharmacyEmail: string
  
  // Service Type (radio - only one selected)
  serviceType: 'annual' | 'followup' | 'diabetes' | 'diabetes_followup' | 'at_home' | ''
  
  // Signature
  patientSignature: string
  signatureDate: string
  
  // Comments
  comments: string
}

// Simple medication entry for Form 3 table
export interface Form3Medication {
  id: string
  whatITake: string
  whyITakeIt: string
  howITakeIt: string
  comments: string
}

export interface Form3Data {
  // Personal Medication Record - matching government form
  
  // Header
  serviceProvided: 'annual' | 'followup' | 'diabetes_annual' | 'diabetes_followup' | 'at_home' | ''
  location: string // Pharmacy / Patient's Home
  
  // Patient Information
  patientLastName: string
  patientFirstName: string
  patientDOB: string // yyyy/mm/dd
  patientUnitNumber: string
  patientStreetNumber: string
  patientStreetName: string
  patientPOBox: string
  patientCity: string
  patientProvince: string
  patientPostalCode: string
  patientPhone: string
  interviewDate: string // yyyy/mm/dd
  patientEmail: string
  
  // Caregiver/Contact
  caregiverLastName: string
  caregiverFirstName: string
  caregiverPhone: string
  
  // Primary Care Provider
  providerLastName: string
  providerFirstName: string
  providerPhone: string
  providerFax: string
  
  // Allergies
  allergies: string
  noNonPrescriptionProducts: boolean
  
  // Medications (dynamic array)
  medications: Form3Medication[]
  
  // Pharmacy Information
  pharmacyNameAddress: string
  pharmacistName: string
  pharmacyPhone: string
  pharmacistSignature: string
  dateCompleted: string // yyyy/mm/dd
  pharmacyFax: string
}

// Form 4 sub-interfaces for dynamic sections
export interface Form4Medication {
  id: string
  drugName: string
  strength: string
  dosageForm: string
  directionsForUse: string
  indication: string
  adherenceIssue: 'yes' | 'no' | ''
  rxOtcNhp: string
  patientComments: string
  pharmacistNotes: string
  commentsForRecord: string
}

export interface Form4DiscontinuedMed {
  id: string
  nameStrengthFormDirections: string
  notes: string
}

export interface Form4TherapeuticIssue {
  id: string
  issue: string
  suggestedTherapy: string
  actionTaken: string
  notes: string
}

export interface Form4HealthcareProvider {
  id: string
  lastName: string
  firstName: string
  specialty: string
}

export interface Form4Data {
  // Pharmacist Worksheet - 4 pages matching government form
  
  // === PAGE 1 ===
  // Header
  serviceProvided: 'annual' | 'followup' | 'diabetes_annual' | 'diabetes_followup' | 'at_home' | ''
  
  // Patient Information
  patientLastName: string
  patientFirstName: string
  patientGender: string
  patientDOB: string
  patientHealthCardNumber: string
  patientPhone: string
  
  // Patient Address
  patientUnitNumber: string
  patientStreetNumber: string
  patientStreetName: string
  patientPOBox: string
  patientCity: string
  patientProvince: string
  patientPostalCode: string
  patientEmail: string
  patientAcknowledgementDate: string
  
  // Caregiver/Agent Information
  caregiverLastName: string
  caregiverFirstName: string
  caregiverPhone: string
  caregiverEmail: string
  caregiverNotes: string
  
  // Primary Care Provider
  providerLastName: string
  providerFirstName: string
  providerDesignation: string
  providerPhone: string
  providerFax: string
  providerEmail: string
  
  // Known Allergies
  knownAllergies: string
  noKnownAllergies: boolean
  
  // Interview Location
  interviewLocation: 'pharmacy' | 'home' | ''
  
  // Pharmacy Address (if pharmacy selected)
  pharmacyName: string
  pharmacyUnitNumber: string
  pharmacyStreetNumber: string
  pharmacyStreetName: string
  pharmacyPOBox: string
  pharmacyCity: string
  pharmacyProvince: string
  pharmacyPostalCode: string
  
  // Patient Home Address (if home selected)
  homeUnitNumber: string
  homeStreetNumber: string
  homeStreetName: string
  homePOBox: string
  homeCity: string
  homeProvince: string
  homePostalCode: string
  
  // === PAGE 2 ===
  // Lifestyle Information
  tobacco: boolean
  tobaccoYesNo: 'yes' | 'no' | ''
  tobaccoCigPerDay: string
  smokingCessation: boolean
  smokingCessationStatus: string
  recreationalDrugUse: boolean
  recreationalDrugYesNo: 'yes' | 'no' | ''
  recreationalDrugFrequency: string
  alcoholUse: boolean
  alcoholYesNo: 'yes' | 'no' | ''
  alcoholFrequency: string
  exerciseRegimen: boolean
  exerciseRegimenDetails: string
  lifestyleOther: boolean
  lifestyleOtherDetails: string
  lifestyleNotes: string
  
  // Clinical Need for Service
  clinicalNeedNotes: string
  
  // Patient Characteristics (18 checkboxes with details)
  char3OrMoreMeds: boolean
  char3OrMoreMedsDetails: string
  charMultipleConditions: boolean
  charMultipleConditionsDetails: string
  charNonPrescriptionMeds: boolean
  charNonPrescriptionMedsDetails: string
  charNaturalHealthProducts: boolean
  charNaturalHealthProductsDetails: string
  charUnaddressedSymptoms: boolean
  charUnaddressedSymptomsDetails: string
  charPotentialDrugProblem: boolean
  charPotentialDrugProblemDetails: string
  charMultiplePrescribers: boolean
  charMultiplePrescribersDetails: string
  charEarlyLateRefills: boolean
  charEarlyLateRefillsDetails: string
  charNonAdherence: boolean
  charNonAdherenceDetails: string
  charConfusedPatient: boolean
  charConfusedPatientDetails: string
  charLabMonitoring: boolean
  charLabMonitoringDetails: string
  charAbnormalLabResults: boolean
  charAbnormalLabResultsDetails: string
  charPlannedAdmission: boolean
  charPlannedAdmissionDetails: string
  charDischargeTransition: boolean
  charDischargeTransitionDetails: string
  charCompliancePackaging: boolean
  charCompliancePackagingDetails: string
  charRenalFunction: boolean
  charRenalFunctionDetails: string
  charLiverFunction: boolean
  charLiverFunctionDetails: string
  charOther: boolean
  charOtherDetails: string
  
  // === PAGE 3 ===
  // Sources Consulted
  sourcesConsultedNotes: string
  sourcePharmacyProfile: boolean
  sourcePharmacyProfileDetails: string
  sourcePhysician: boolean
  sourcePhysicianDetails: string
  sourcePatient: boolean
  sourcePatientDetails: string
  sourceCaregiver: boolean
  sourceCaregiverDetails: string
  sourceAnotherPharmacy: boolean
  sourceAnotherPharmacyDetails: string
  sourceMedPackages: boolean
  sourceMedPackagesDetails: string
  sourceLabValues: boolean
  sourceLabValuesDetails: string
  sourceEHR: boolean
  sourceEHRDetails: string
  sourceHospital: boolean
  sourceHospitalDetails: string
  sourceOther: boolean
  sourceOtherDetails: string
  
  // Current Medication List (dynamic array)
  medications: Form4Medication[]
  
  // Discontinued Medications (dynamic array)
  discontinuedMedications: Form4DiscontinuedMed[]
  
  // Therapeutic Issues (dynamic array)
  therapeuticIssues: Form4TherapeuticIssue[]
  
  // === PAGE 4 ===
  // Checklist for Completeness (11 items)
  checkAskedRxFromOthers: boolean
  checkAskedRxFromOthersDetails: string
  checkMedsRemovedFromHome: boolean
  checkMedsRemovedFromHomeDetails: string
  checkAskedOTCProducts: boolean
  checkAskedOTCProductsDetails: string
  checkAskedHerbalProducts: boolean
  checkAskedHerbalProductsDetails: string
  checkPromptedDosageForms: boolean
  checkPromptedDosageFormsDetails: string
  checkAskedAntiInfectives: boolean
  checkAskedAntiInfectivesDetails: string
  checkReferencedNotes: boolean
  checkReferencedNotesDetails: string
  checkDiscussedCircleOfCare: boolean
  checkDiscussedCircleOfCareDetails: string
  checkDiscussedCompletionDate: boolean
  checkDiscussedCompletionDateDetails: string
  checkEnsureDocumented: boolean
  checkEnsureDocumentedDetails: string
  checklistOther: boolean
  checklistOtherDetails: string
  
  // Plan for Follow Up
  followUpWithProviders: boolean
  healthcareProviders: Form4HealthcareProvider[]
  
  // Summary and Goals
  summaryOfDiscussion: string
  patientGoals: string
  whatIWillDo: string
  resourcesAndContacts: string
  otherFollowUp: string
  
  // Prepared By
  pharmacistFullName: string
  ocpNumber: string
  medsCheckReviewDate: string
  appointmentTime: string
  documentationCompletedDate: string
}

// Main form data object - single source of truth
export interface MedsCheckFormData {
  // Shared data across all forms
  patient: PatientInfo
  pharmacy: PharmacyInfo
  primaryCareProvider: HealthcareProvider
  specialists: HealthcareProvider[]
  medications: Medication[]
  allergies: Allergy[]
  medicalConditions: MedicalCondition[]
  drugTherapyProblems: DrugTherapyProblem[]
  service: MedsCheckService
  clinicalNotes: ClinicalNotes
  consent: Consent
  
  // Form-specific data
  form1: Form1Data
  form2: Form2Data
  form3: Form3Data
  form4: Form4Data
  
  // Metadata
  createdAt: string
  updatedAt: string
  version: string
}

// Default/empty form data
export const createEmptyFormData = (): MedsCheckFormData => ({
  patient: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    healthCardNumber: '',
    address: '',
    city: '',
    province: 'Ontario',
    postalCode: '',
    phone: '',
    email: '',
    gender: '',
    preferredLanguage: 'English'
  },
  pharmacy: {
    name: '',
    address: '',
    city: '',
    province: 'Ontario',
    postalCode: '',
    phone: '',
    fax: '',
    accreditationNumber: '',
    pharmacistName: '',
    pharmacistLicenseNumber: '',
    pharmacistSignatureDate: ''
  },
  primaryCareProvider: {
    name: '',
    specialty: 'Family Medicine',
    phone: '',
    fax: '',
    address: ''
  },
  specialists: [],
  medications: [],
  allergies: [],
  medicalConditions: [],
  drugTherapyProblems: [],
  service: {
    type: '',
    serviceDate: new Date().toISOString().split('T')[0],
    reviewDate: '',
    nextReviewDate: '',
    timeSpent: 0,
    billingCode: ''
  },
  clinicalNotes: {
    pharmacistNotes: '',
    patientConcerns: '',
    adherenceIssues: '',
    lifestyleFactors: '',
    recommendations: '',
    followUpActions: '',
    communicationToPhysician: ''
  },
  consent: {
    patientConsent: false,
    patientConsentDate: '',
    patientSignature: '',
    informationSharing: false,
    dataStorageConsent: false
  },
  form1: {
    to: '',
    faxNumber: '',
    telephoneNumber: '',
    pages: '',
    emailAddress: '',
    date: new Date().toISOString().split('T')[0],
    patientName: '',
    patientAddress: '',
    patientPhone: '',
    medsCheckDate: new Date().toISOString().split('T')[0],
    followUpStatus: '',
    issues: '',
    pharmacistName: '',
    pharmacistSignature: ''
  },
  form2: {
    patientLastName: '',
    patientFirstName: '',
    patientUnitNumber: '',
    patientStreetNumber: '',
    patientStreetName: '',
    patientPOBox: '',
    patientCity: '',
    patientProvince: 'Ontario',
    patientPostalCode: '',
    patientPhone: '',
    patientEmail: '',
    pharmacyName: '',
    pharmacyUnitNumber: '',
    pharmacyStreetNumber: '',
    pharmacyStreetName: '',
    pharmacyPOBox: '',
    pharmacyCity: '',
    pharmacyProvince: 'Ontario',
    pharmacyPostalCode: '',
    pharmacyPhone: '',
    pharmacyFax: '',
    pharmacyEmail: '',
    serviceType: '',
    patientSignature: '',
    signatureDate: new Date().toISOString().split('T')[0],
    comments: ''
  },
  form3: {
    serviceProvided: '',
    location: '',
    patientLastName: '',
    patientFirstName: '',
    patientDOB: '',
    patientUnitNumber: '',
    patientStreetNumber: '',
    patientStreetName: '',
    patientPOBox: '',
    patientCity: '',
    patientProvince: 'Ontario',
    patientPostalCode: '',
    patientPhone: '',
    interviewDate: '',
    patientEmail: '',
    caregiverLastName: '',
    caregiverFirstName: '',
    caregiverPhone: '',
    providerLastName: '',
    providerFirstName: '',
    providerPhone: '',
    providerFax: '',
    allergies: '',
    noNonPrescriptionProducts: false,
    medications: [],
    pharmacyNameAddress: '',
    pharmacistName: '',
    pharmacyPhone: '',
    pharmacistSignature: '',
    dateCompleted: new Date().toISOString().split('T')[0],
    pharmacyFax: ''
  },
  form4: {
    // === PAGE 1 ===
    serviceProvided: '',
    
    // Patient Information
    patientLastName: '',
    patientFirstName: '',
    patientGender: '',
    patientDOB: '',
    patientHealthCardNumber: '',
    patientPhone: '',
    
    // Patient Address
    patientUnitNumber: '',
    patientStreetNumber: '',
    patientStreetName: '',
    patientPOBox: '',
    patientCity: '',
    patientProvince: 'Ontario',
    patientPostalCode: '',
    patientEmail: '',
    patientAcknowledgementDate: '',
    
    // Caregiver/Agent Information
    caregiverLastName: '',
    caregiverFirstName: '',
    caregiverPhone: '',
    caregiverEmail: '',
    caregiverNotes: '',
    
    // Primary Care Provider
    providerLastName: '',
    providerFirstName: '',
    providerDesignation: '',
    providerPhone: '',
    providerFax: '',
    providerEmail: '',
    
    // Known Allergies
    knownAllergies: '',
    noKnownAllergies: false,
    
    // Interview Location
    interviewLocation: '',
    
    // Pharmacy Address
    pharmacyName: '',
    pharmacyUnitNumber: '',
    pharmacyStreetNumber: '',
    pharmacyStreetName: '',
    pharmacyPOBox: '',
    pharmacyCity: '',
    pharmacyProvince: 'Ontario',
    pharmacyPostalCode: '',
    
    // Patient Home Address
    homeUnitNumber: '',
    homeStreetNumber: '',
    homeStreetName: '',
    homePOBox: '',
    homeCity: '',
    homeProvince: 'Ontario',
    homePostalCode: '',
    
    // === PAGE 2 ===
    // Lifestyle Information
    tobacco: false,
    tobaccoYesNo: '',
    tobaccoCigPerDay: '',
    smokingCessation: false,
    smokingCessationStatus: '',
    recreationalDrugUse: false,
    recreationalDrugYesNo: '',
    recreationalDrugFrequency: '',
    alcoholUse: false,
    alcoholYesNo: '',
    alcoholFrequency: '',
    exerciseRegimen: false,
    exerciseRegimenDetails: '',
    lifestyleOther: false,
    lifestyleOtherDetails: '',
    lifestyleNotes: '',
    
    // Clinical Need for Service
    clinicalNeedNotes: '',
    
    // Patient Characteristics (18 checkboxes with details)
    char3OrMoreMeds: false,
    char3OrMoreMedsDetails: '',
    charMultipleConditions: false,
    charMultipleConditionsDetails: '',
    charNonPrescriptionMeds: false,
    charNonPrescriptionMedsDetails: '',
    charNaturalHealthProducts: false,
    charNaturalHealthProductsDetails: '',
    charUnaddressedSymptoms: false,
    charUnaddressedSymptomsDetails: '',
    charPotentialDrugProblem: false,
    charPotentialDrugProblemDetails: '',
    charMultiplePrescribers: false,
    charMultiplePrescribersDetails: '',
    charEarlyLateRefills: false,
    charEarlyLateRefillsDetails: '',
    charNonAdherence: false,
    charNonAdherenceDetails: '',
    charConfusedPatient: false,
    charConfusedPatientDetails: '',
    charLabMonitoring: false,
    charLabMonitoringDetails: '',
    charAbnormalLabResults: false,
    charAbnormalLabResultsDetails: '',
    charPlannedAdmission: false,
    charPlannedAdmissionDetails: '',
    charDischargeTransition: false,
    charDischargeTransitionDetails: '',
    charCompliancePackaging: false,
    charCompliancePackagingDetails: '',
    charRenalFunction: false,
    charRenalFunctionDetails: '',
    charLiverFunction: false,
    charLiverFunctionDetails: '',
    charOther: false,
    charOtherDetails: '',
    
    // === PAGE 3 ===
    // Sources Consulted
    sourcesConsultedNotes: '',
    sourcePharmacyProfile: false,
    sourcePharmacyProfileDetails: '',
    sourcePhysician: false,
    sourcePhysicianDetails: '',
    sourcePatient: false,
    sourcePatientDetails: '',
    sourceCaregiver: false,
    sourceCaregiverDetails: '',
    sourceAnotherPharmacy: false,
    sourceAnotherPharmacyDetails: '',
    sourceMedPackages: false,
    sourceMedPackagesDetails: '',
    sourceLabValues: false,
    sourceLabValuesDetails: '',
    sourceEHR: false,
    sourceEHRDetails: '',
    sourceHospital: false,
    sourceHospitalDetails: '',
    sourceOther: false,
    sourceOtherDetails: '',
    
    // Current Medication List
    medications: [],
    
    // Discontinued Medications
    discontinuedMedications: [],
    
    // Therapeutic Issues
    therapeuticIssues: [],
    
    // === PAGE 4 ===
    // Checklist for Completeness
    checkAskedRxFromOthers: false,
    checkAskedRxFromOthersDetails: '',
    checkMedsRemovedFromHome: false,
    checkMedsRemovedFromHomeDetails: '',
    checkAskedOTCProducts: false,
    checkAskedOTCProductsDetails: '',
    checkAskedHerbalProducts: false,
    checkAskedHerbalProductsDetails: '',
    checkPromptedDosageForms: false,
    checkPromptedDosageFormsDetails: '',
    checkAskedAntiInfectives: false,
    checkAskedAntiInfectivesDetails: '',
    checkReferencedNotes: false,
    checkReferencedNotesDetails: '',
    checkDiscussedCircleOfCare: false,
    checkDiscussedCircleOfCareDetails: '',
    checkDiscussedCompletionDate: false,
    checkDiscussedCompletionDateDetails: '',
    checkEnsureDocumented: false,
    checkEnsureDocumentedDetails: '',
    checklistOther: false,
    checklistOtherDetails: '',
    
    // Plan for Follow Up
    followUpWithProviders: false,
    healthcareProviders: [],
    
    // Summary and Goals
    summaryOfDiscussion: '',
    patientGoals: '',
    whatIWillDo: '',
    resourcesAndContacts: '',
    otherFollowUp: '',
    
    // Prepared By
    pharmacistFullName: '',
    ocpNumber: '',
    medsCheckReviewDate: '',
    appointmentTime: '',
    documentationCompletedDate: ''
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: '1.0.0'
})

// Utility function to generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Create empty medication
export const createEmptyMedication = (): Medication => ({
  id: generateId(),
  drugName: '',
  din: '',
  strength: '',
  dosageForm: '',
  directions: '',
  quantity: '',
  frequency: '',
  route: 'oral',
  startDate: '',
  prescriber: '',
  purpose: '',
  isOTC: false,
  isActive: true,
  notes: ''
})

// Create empty Form3 medication entry
export const createEmptyForm3Medication = (): Form3Medication => ({
  id: generateId(),
  whatITake: '',
  whyITakeIt: '',
  howITakeIt: '',
  comments: ''
})

// Create empty allergy
export const createEmptyAllergy = (): Allergy => ({
  id: generateId(),
  allergen: '',
  reaction: '',
  severity: ''
})

// Create empty medical condition
export const createEmptyMedicalCondition = (): MedicalCondition => ({
  id: generateId(),
  condition: '',
  diagnosedDate: '',
  status: '',
  notes: ''
})

// Create empty drug therapy problem
export const createEmptyDrugTherapyProblem = (): DrugTherapyProblem => ({
  id: generateId(),
  category: '',
  description: '',
  recommendation: '',
  priority: '',
  status: 'identified',
  followUpDate: ''
})

// Create empty healthcare provider
export const createEmptyHealthcareProvider = (): HealthcareProvider => ({
  name: '',
  specialty: '',
  phone: '',
  fax: '',
  address: ''
})

// Form 4 helper functions
export const createEmptyForm4Medication = (): Form4Medication => ({
  id: generateId(),
  drugName: '',
  strength: '',
  dosageForm: '',
  directionsForUse: '',
  indication: '',
  adherenceIssue: '',
  rxOtcNhp: '',
  patientComments: '',
  pharmacistNotes: '',
  commentsForRecord: ''
})

export const createEmptyForm4DiscontinuedMed = (): Form4DiscontinuedMed => ({
  id: generateId(),
  nameStrengthFormDirections: '',
  notes: ''
})

export const createEmptyForm4TherapeuticIssue = (): Form4TherapeuticIssue => ({
  id: generateId(),
  issue: '',
  suggestedTherapy: '',
  actionTaken: '',
  notes: ''
})

export const createEmptyForm4HealthcareProvider = (): Form4HealthcareProvider => ({
  id: generateId(),
  lastName: '',
  firstName: '',
  specialty: ''
})
