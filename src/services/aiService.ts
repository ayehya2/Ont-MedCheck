import { MedsCheckFormData, generateId } from '@/types/forms'

// AI Service for processing clinical notes
// Supports Google Gemini API (works directly in browser!)

// Get API key from localStorage (set by user in Settings dialog)
function getApiKey(): string {
  return localStorage.getItem('medscheck_gemini_api_key') || ''
}

interface AIExtractionResult {
  form1?: Partial<MedsCheckFormData['form1']>
  form2?: Partial<MedsCheckFormData['form2']>
  form3?: Partial<MedsCheckFormData['form3']>
  form4?: Partial<MedsCheckFormData['form4']>
  
  // Legacy format support (for backwards compatibility)
  patient?: Partial<MedsCheckFormData['patient']>
  pharmacy?: Partial<MedsCheckFormData['pharmacy']>
  primaryCareProvider?: {
    firstName?: string
    lastName?: string
    phone?: string
    fax?: string
  }
  specialists?: Array<{
    name: string
    specialty: string
    phone?: string
    fax?: string
  }>
  medications?: Array<{
    drugName: string
    strength?: string
    dosageForm?: string
    directions?: string
    frequency?: string
    route?: string
    purpose?: string
    isOTC?: boolean
  }>
  allergies?: Array<{
    allergen: string
    reaction?: string
    severity?: string
  }>
  medicalConditions?: Array<{
    condition: string
    status?: string
  }>
  clinicalNotes?: Partial<MedsCheckFormData['clinicalNotes']>
}

const EXTRACTION_PROMPT = `You are a clinical data extraction AI for Ontario MedsCheck pharmacy services.
Extract ALL relevant data from clinical notes and return as valid JSON (no markdown, no comments).

CRITICAL VALIDATION RULES - READ CAREFULLY:
⚠️ NAMES must be ONLY names (2-4 words max). NO full sentences, NO descriptions.
   ✓ CORRECT: "Maria Santos", "Dr Sarah Johnson", "Jennifer Park"  
   ✗ WRONG: "Patient is Maria Santos who lives at", "Main issue is occasional missed"
   
⚠️ PHONE/FAX must be ONLY numbers formatted as (XXX) XXX-XXXX. NO text.
   ✓ CORRECT: "(416) 555-1234"
   ✗ WRONG: "phone 416-555-1234", "call at 416"
   
⚠️ DATES must be YYYY-MM-DD format ONLY. NO text.
   ✓ CORRECT: "2024-01-18"
   ✗ WRONG: "completed on Jan 18", "today"
   
⚠️ ADDRESSES for Form 1 can be full string. For Forms 2/3/4, split into components.
   ✓ Form 1 patientAddress: "Unit 308, 2456 Queensway Blvd, Etobicoke, ON M9C 5K7"
   ✓ Form 2 patientUnitNumber: "308", patientStreetNumber: "2456", patientStreetName: "Queensway Blvd"
   
⚠️ MEDICATION drugName should be ONLY the drug name (1-3 words max).
   ✓ CORRECT: "Metformin", "Lantus insulin", "Vitamin D"
   ✗ WRONG: "Metformin 500mg tablet take 1 twice daily for diabetes"

EXTRACTION INSTRUCTIONS:
1. Patient names: Look for "patient", "pt:", "name:", "patient is", "patient name is", followed by actual name. Extract ONLY the name (First Last OR Last, First).
2. Physician names: Look for "Dr", "Doctor", "send to", "fax to", "physician is", "provider is". Extract ONLY name with "Dr" prefix if present.
3. Pharmacist names: Look for "pharmacist", "pharmacist name", "pharmacist is", "reviewed by", "completed by", "done by". Extract ONLY the name.
4. Phone numbers: Find patterns like XXX-XXX-XXXX, (XXX) XXX-XXXX, XXX.XXX.XXXX. Format as (XXX) XXX-XXXX.
5. Dates: Find patterns like "Jan 18 2024", "2024-01-18", "01/18/2024", "today". Convert to YYYY-MM-DD.
6. Addresses: Extract unit/apt, street number, street name, city, province, postal code separately.
7. Gender: Look for explicit "male"/"female"/"M"/"F" or infer from pronouns (he/she/his/her).
8. Health card: Find patterns like XXXX-XXX-XXX-XX or "health card: XXXXXXXXXX".
9. Email: Find patterns like word@word.word.
10. Allergies: Extract allergen name + reaction in parentheses if provided. If "NKDA" or "no known allergies", set noKnownAllergies: true.
11. Medications: Extract drug name ONLY (not full sentence). Then extract strength, form, directions, indication separately.
12. Checkboxes (tobacco, alcohol, exercise, characteristics, sources): Set to true if mentioned, false otherwise.
13. Text fields (summary, goals, action plan, clinical need): Extract full multi-line text as-is.
14. Service type: Look for "annual", "followup", "diabetes", "diabetes followup", "at home".
15. Interview location: Look for "at pharmacy", "pharmacy premises", "patient's home", "home visit". Set to "pharmacy" or "home".
16. Follow-up status (Form 1): "no_issues" if stable/well/no problems. "issues_identified" if concerns/problems/issues mentioned.

SIMPLE ONE-LINER EXAMPLES (extract correctly):
"patient name is john smith" → patientFirstName: "John", patientLastName: "Smith"
"pharmacist name is sara smith" → pharmacistName: "Sara Smith"
"reviewed by dr jennifer lee" → providerFirstName: "Jennifer", providerLastName: "Lee"
"phone 416-555-1234" → phone: "(416) 555-1234"
"dob 1985-06-15" → patientDOB: "1985-06-15"

COMMON MISTAKES TO AVOID:
❌ Don't put full sentences in name fields
❌ Don't put descriptions in single-value fields  
❌ Don't include labels/keywords in extracted values ("phone:" should not be in the phone number)
❌ Don't mix data types (numbers in text fields, text in number fields)
❌ Don't leave fields empty if data exists - search thoroughly
❌ Don't invent data - only extract what's actually in the notes

RETURN THIS COMPREHENSIVE JSON STRUCTURE (include ALL fields you can extract):
{
  "form1": {
    "to": "Dr FirstName LastName (physician receiving notification)",
    "faxNumber": "(XXX) XXX-XXXX (physician's fax)",
    "telephoneNumber": "(XXX) XXX-XXXX (physician's phone)",
    "pages": "1",
    "emailAddress": "physician@example.com",
    "date": "YYYY-MM-DD (date of this notification)",
    "patientName": "FirstName LastName (patient full name)",
    "patientAddress": "Full address as single string (unit, street, city, province, postal)",
    "patientPhone": "(XXX) XXX-XXXX (patient's phone)",
    "medsCheckDate": "YYYY-MM-DD (date MedsCheck completed)",
    "followUpStatus": "no_issues OR issues_identified",
    "issues": "Any drug therapy problems, concerns, or recommendations (leave empty if no_issues)",
    "pharmacistName": "FirstName LastName (pharmacist who did review)",
    "pharmacistSignature": "FirstName LastName (same as pharmacistName)"
  },
  "form2": {
    "patientLastName": "",
    "patientFirstName": "",
    "patientUnitNumber": "",
    "patientStreetNumber": "",
    "patientStreetName": "",
    "patientPOBox": "",
    "patientCity": "",
    "patientProvince": "Ontario",
    "patientPostalCode": "A1A 1A1",
    "patientPhone": "(XXX) XXX-XXXX",
    "patientEmail": "email@example.com",
    "pharmacyName": "",
    "pharmacyUnitNumber": "",
    "pharmacyStreetNumber": "",
    "pharmacyStreetName": "",
    "pharmacyPOBox": "",
    "pharmacyCity": "",
    "pharmacyProvince": "Ontario",
    "pharmacyPostalCode": "",
    "pharmacyPhone": "(XXX) XXX-XXXX",
    "pharmacyFax": "(XXX) XXX-XXXX",
    "pharmacyEmail": "",
    "serviceType": "annual|followup|diabetes|diabetes_followup|at_home"
  },
  "form3": {
    "serviceProvided": "annual|followup|diabetes_annual|diabetes_followup|at_home",
    "location": "Pharmacy / Patient's Home",
    "patientLastName": "",
    "patientFirstName": "",
    "patientDOB": "YYYY-MM-DD",
    "patientUnitNumber": "",
    "patientStreetNumber": "",
    "patientStreetName": "",
    "patientPOBox": "",
    "patientCity": "",
    "patientProvince": "Ontario",
    "patientPostalCode": "",
    "patientPhone": "(XXX) XXX-XXXX",
    "patientEmail": "",
    "caregiverLastName": "",
    "caregiverFirstName": "",
    "caregiverPhone": "(XXX) XXX-XXXX",
    "providerLastName": "",
    "providerFirstName": "",
    "providerPhone": "(XXX) XXX-XXXX",
    "providerFax": "(XXX) XXX-XXXX",
    "allergies": "List of allergies",
    "noNonPrescriptionProducts": false,
    "medications": [
      {
        "whatITake": "Med name, strength, form",
        "whyITakeIt": "Purpose/condition",
        "howITakeIt": "Directions",
        "comments": "Special instructions"
      }
    ],
    "pharmacyNameAddress": "Pharmacy name and address",
    "pharmacyPhone": "(XXX) XXX-XXXX",
    "pharmacyFax": "(XXX) XXX-XXXX",
    "pharmacistName": "Pharmacist name"
  },
  "form4": {
    "serviceProvided": "annual|followup|diabetes_annual|diabetes_followup|at_home",
    "patientLastName": "Last name",
    "patientFirstName": "First name",
    "patientGender": "male|female|other (look for gender keywords or pronouns)",
    "patientDOB": "YYYY-MM-DD",
    "patientHealthCardNumber": "Health card number (any format)",
    "patientPhone": "(XXX) XXX-XXXX",
    "patientUnitNumber": "Apt/unit number",
    "patientStreetNumber": "Street number",
    "patientStreetName": "Street name",
    "patientPOBox": "PO Box if mentioned",
    "patientCity": "City",
    "patientProvince": "Ontario (default if not specified)",
    "patientPostalCode": "Postal code",
    "patientEmail": "Email address",
    "caregiverLastName": "Caregiver last name (spouse/family member)",
    "caregiverFirstName": "Caregiver first name",
    "caregiverPhone": "(XXX) XXX-XXXX",
    "caregiverEmail": "Caregiver email",
    "caregiverNotes": "Relationship and how they help (e.g., 'husband helps with meds')",
    "providerLastName": "Doctor/NP last name",
    "providerFirstName": "Doctor/NP first name",
    "providerDesignation": "MD|NP|DO|PA (extract designation if mentioned)",
    "providerPhone": "(XXX) XXX-XXXX",
    "providerFax": "(XXX) XXX-XXXX",
    "providerEmail": "Provider email",
    "knownAllergies": "List all allergies with reactions (e.g., 'Penicillin causes rash')",
    "noKnownAllergies": true (if NKDA or 'no known allergies' mentioned),
    "interviewLocation": "pharmacy|home (where interview conducted)",
    "tobacco": true (checkbox - true if any tobacco use mentioned),
    "tobaccoYesNo": "yes|no",
    "tobaccoCigPerDay": "Number of cigarettes per day (e.g., '10')",
    "smokingCessation": true (if interested in quitting mentioned),
    "recreationalDrugUse": true (checkbox),
    "recreationalDrugYesNo": "yes|no",
    "alcoholUse": true (checkbox - true if any alcohol mentioned),
    "alcoholYesNo": "yes|no",
    "alcoholFrequency": "Description (e.g., '2-3 glasses wine on weekends')",
    "exerciseRegimen": true (checkbox - true if exercise mentioned),
    "exerciseRegimenDetails": "Description (e.g., 'walks 30 minutes 3 times per week')",
    "lifestyleNotes": "Any additional lifestyle information",
    "clinicalNeedNotes": "Why MedsCheck needed - extract full explanation",
    "char3OrMoreMeds": true (if patient takes 3+ meds),
    "charMultipleConditions": true (if multiple conditions mentioned),
    "charNonPrescriptionMeds": true (if OTC meds mentioned),
    "charNaturalHealthProducts": true (if vitamins/supplements mentioned),
    "charNonAdherence": true (if adherence issues mentioned),
    "sourcesConsultedNotes": "What sources were checked",
    "sourcePharmacyProfile": true (if pharmacy profile/computer checked),
    "sourcePatient": true (if spoke with patient),
    "medications": [
      {
        "drugName": "Drug name (e.g., 'Metformin')",
        "strength": "Strength with units (e.g., '500mg')",
        "dosageForm": "tablet|capsule|inhaler|injection|etc",
        "directionsForUse": "Full directions (e.g., 'take 1 twice daily')",
        "indication": "What it's for (e.g., 'diabetes', 'blood pressure')",
        "adherenceIssue": "yes|no (is patient taking correctly?)",
        "rxOtcNhp": "Rx|OTC|NHP (prescription, over-counter, natural)",
        "patientComments": "What patient said about taking it",
        "pharmacistNotes": "Pharmacist observations",
        "commentsForRecord": "Any additional notes"
      }
    ],
    "summaryOfDiscussion": "Full summary - extract entire summary section",
    "patientGoals": "Patient's health goals - extract all goals mentioned",
    "whatIWillDo": "Action plan - what patient will do - extract full action plan",
    "pharmacistFullName": "Pharmacist name (Last, First OR First Last format)",
    "ocpNumber": "OCP registration number (just the numbers, e.g., '98765')",
    "medsCheckReviewDate": "YYYY-MM-DD (date review completed)"
  }
}

Only include fields found in notes. Set checkboxes to true when applicable. Use proper values for dropdowns.

Clinical Notes:
`

// Validation function to clean up extracted data
function validateAndCleanExtractedData(extracted: AIExtractionResult): void {
  console.log('🧹 Validating and cleaning extracted data...')
  
  // Helper: Check if string is too long to be a name (likely a sentence)
  const isValidName = (name: string): boolean => {
    if (!name) return true
    const words = name.trim().split(/\s+/)
    return words.length <= 5 && name.length <= 50 && !/[.,:;]/.test(name)
  }
  
  // Helper: Extract just the name if there's extra text
  const cleanName = (name: string): string => {
    if (!name) return ''
    // Remove common prefixes/suffixes that aren't part of names
    name = name.replace(/^(patient|pt|name|is|called)\s+/i, '')
    name = name.replace(/\s+(who|lives|at|phone|tel|address|born).*/i, '')
    // Take only first 2-3 words if too long
    const words = name.trim().split(/\s+/)
    if (words.length > 4) {
      return words.slice(0, 3).join(' ')
    }
    return name.trim()
  }
  
  // Validate Form 1
  if (extracted.form1) {
    if (extracted.form1.to && !isValidName(extracted.form1.to)) {
      console.warn('⚠️ Form1.to looks invalid, cleaning:', extracted.form1.to)
      extracted.form1.to = cleanName(extracted.form1.to)
    }
    if (extracted.form1.patientName && !isValidName(extracted.form1.patientName)) {
      console.warn('⚠️ Form1.patientName looks invalid, cleaning:', extracted.form1.patientName)
      extracted.form1.patientName = cleanName(extracted.form1.patientName)
    }
    if (extracted.form1.pharmacistName && !isValidName(extracted.form1.pharmacistName)) {
      console.warn('⚠️ Form1.pharmacistName looks invalid, cleaning:', extracted.form1.pharmacistName)
      extracted.form1.pharmacistName = cleanName(extracted.form1.pharmacistName)
    }
  }
  
  // Validate Form 2
  if (extracted.form2) {
    if (extracted.form2.patientFirstName && !isValidName(extracted.form2.patientFirstName)) {
      console.warn('⚠️ Form2.patientFirstName looks invalid, cleaning:', extracted.form2.patientFirstName)
      extracted.form2.patientFirstName = cleanName(extracted.form2.patientFirstName)
    }
    if (extracted.form2.patientLastName && !isValidName(extracted.form2.patientLastName)) {
      console.warn('⚠️ Form2.patientLastName looks invalid, cleaning:', extracted.form2.patientLastName)
      extracted.form2.patientLastName = cleanName(extracted.form2.patientLastName)
    }
  }
  
  // Validate Form 3
  if (extracted.form3) {
    if (extracted.form3.patientFirstName && !isValidName(extracted.form3.patientFirstName)) {
      console.warn('⚠️ Form3.patientFirstName looks invalid, cleaning:', extracted.form3.patientFirstName)
      extracted.form3.patientFirstName = cleanName(extracted.form3.patientFirstName)
    }
    if (extracted.form3.patientLastName && !isValidName(extracted.form3.patientLastName)) {
      console.warn('⚠️ Form3.patientLastName looks invalid, cleaning:', extracted.form3.patientLastName)
      extracted.form3.patientLastName = cleanName(extracted.form3.patientLastName)
    }
    if (extracted.form3.pharmacistName && !isValidName(extracted.form3.pharmacistName)) {
      console.warn('⚠️ Form3.pharmacistName looks invalid, cleaning:', extracted.form3.pharmacistName)
      extracted.form3.pharmacistName = cleanName(extracted.form3.pharmacistName)
    }
  }
  
  // Validate Form 4
  if (extracted.form4) {
    if (extracted.form4.patientFirstName && !isValidName(extracted.form4.patientFirstName)) {
      console.warn('⚠️ Form4.patientFirstName looks invalid, cleaning:', extracted.form4.patientFirstName)
      extracted.form4.patientFirstName = cleanName(extracted.form4.patientFirstName)
    }
    if (extracted.form4.patientLastName && !isValidName(extracted.form4.patientLastName)) {
      console.warn('⚠️ Form4.patientLastName looks invalid, cleaning:', extracted.form4.patientLastName)
      extracted.form4.patientLastName = cleanName(extracted.form4.patientLastName)
    }
    if (extracted.form4.pharmacistFullName && !isValidName(extracted.form4.pharmacistFullName)) {
      console.warn('⚠️ Form4.pharmacistFullName looks invalid, cleaning:', extracted.form4.pharmacistFullName)
      extracted.form4.pharmacistFullName = cleanName(extracted.form4.pharmacistFullName)
    }
    
    // Clean medication drug names if they're too long
    if (extracted.form4.medications) {
      extracted.form4.medications.forEach((med: any, index: number) => {
        if (med.drugName && med.drugName.length > 50) {
          console.warn(`⚠️ Form4 medication ${index + 1} drugName too long, truncating:`, med.drugName)
          // Take just the first few words (drug name only, not full description)
          const words = med.drugName.split(/\s+/)
          med.drugName = words.slice(0, 3).join(' ')
        }
      })
    }
  }
  
  console.log('✅ Validation complete')
}

export async function processWithAI(
  clinicalNotes: string,
  existingData: MedsCheckFormData
): Promise<MedsCheckFormData> {
  const apiKey = getApiKey()
  
  // If no API key, use mock extraction
  if (!apiKey) {
    console.warn('No Gemini API key found. Using mock extraction.')
    return mockExtraction(clinicalNotes, existingData)
  }

  try {
    console.log('Calling Gemini API...')
    
    // Use gemini-2.0-flash (stable model)
    const model = 'gemini-2.0-flash'
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: EXTRACTION_PROMPT + clinicalNotes
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 4096,
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Gemini API Error:', response.status, errorText)
      throw new Error(`API request failed: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Gemini API Response:', result)
    
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    console.log('📝 Extracted Content:', content)
    
    // Parse the JSON from the response (handle markdown code blocks)
    let jsonStr = content
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || content.match(/(\{[\s\S]*\})/)
    if (jsonMatch) {
      jsonStr = jsonMatch[1] || jsonMatch[0]
    }
    
    console.log('🔍 Parsing JSON:', jsonStr.substring(0, 200) + '...')
    const extracted: AIExtractionResult = JSON.parse(jsonStr.trim())
    
    // Validate and clean extracted data
    validateAndCleanExtractedData(extracted)
    
    console.log('📊 Extracted Data:', extracted)
    
    const mergedData = mergeExtractedData(extracted, existingData)
    console.log('✨ Merged Data - Form 1:', mergedData.form1)
    
    return mergedData
  } catch (error) {
    console.error('❌ AI extraction failed:', error)
    console.log('🔄 Falling back to mock extraction...')
    // Fall back to mock extraction
    return mockExtraction(clinicalNotes, existingData)
  }
}

function mockExtraction(
  clinicalNotes: string,
  existingData: MedsCheckFormData
): MedsCheckFormData {
  console.log('🔧 Using mock extraction (no API key or API failed)')
  const result = { ...existingData }
  const notes = clinicalNotes.toLowerCase()

  // ========= FORM 1 EXTRACTION =========
  console.log('🔍 Extracting Form 1 data from:', clinicalNotes.substring(0, 100) + '...')
  
  // Extract physician name (recipient)
  const drMatch = clinicalNotes.match(/(?:send to|dr\.?|doctor)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i)
  if (drMatch) {
    result.form1.to = drMatch[1].trim()
    console.log('✅ Found physician:', result.form1.to)
  }

  // Extract fax number
  const faxMatch = clinicalNotes.match(/fax[:\s]+(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/i)
  if (faxMatch) {
    const digits = faxMatch[1].replace(/\D/g, '')
    result.form1.faxNumber = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
  }

  // Extract telephone
  const phoneMatch = clinicalNotes.match(/(?:phone|telephone|tel)[:\s]+(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/i)
  if (phoneMatch) {
    const digits = phoneMatch[1].replace(/\D/g, '')
    result.form1.telephoneNumber = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
  }

  // Extract patient name
  const patientMatch = clinicalNotes.match(/patient\s+(?:is\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i)
  if (patientMatch) {
    result.form1.patientName = patientMatch[1].trim()
    console.log('✅ Found patient:', result.form1.patientName)
    const names = patientMatch[1].trim().split(/\s+/)
    if (names.length >= 2) {
      result.patient.firstName = names[0]
      result.patient.lastName = names.slice(1).join(' ')
    }
  }

  // Extract patient address
  const addressMatch = clinicalNotes.match(/(?:lives at|address[:\s]+)([^\n]+(?:ON|Ontario)[^\n]+[A-Z]\d[A-Z]\s*\d[A-Z]\d)/i)
  if (addressMatch) {
    result.form1.patientAddress = addressMatch[1].trim()
    console.log('✅ Found address:', result.form1.patientAddress)
  }

  // Extract patient phone
  const patientPhoneMatch = clinicalNotes.match(/(?:phone|tel|cell)[:\s]+(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/i)
  if (patientPhoneMatch) {
    const digits = patientPhoneMatch[1].replace(/\D/g, '')
    result.form1.patientPhone = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
    console.log('✅ Found patient phone:', result.form1.patientPhone)
  }

  // Extract MedsCheck date
  const dateMatch = clinicalNotes.match(/(?:completed|review|medscheck).*?(?:on\s+|date\s+)?(\d{4}[-/]\d{2}[-/]\d{2}|\w+\s+\d{1,2}\s+\d{4}|today)/i)
  if (dateMatch) {
    const dateStr = dateMatch[1].toLowerCase()
    if (dateStr === 'today') {
      const today = new Date()
      result.form1.medsCheckDate = today.toISOString().split('T')[0]
      result.form1.date = today.toISOString().split('T')[0]
      console.log('✅ MedsCheck date (today):', result.form1.medsCheckDate)
    } else {
      // Try to parse date
      const parsedDate = dateStr.replace(/\//g, '-')
      result.form1.medsCheckDate = parsedDate
      result.form1.date = parsedDate
      console.log('✅ MedsCheck date:', result.form1.medsCheckDate)
    }
  }

  // Determine follow-up status
  if (notes.includes('no issues') || notes.includes('doing well') || notes.includes('no major') || 
      notes.includes('no problems') || notes.includes('stable')) {
    result.form1.followUpStatus = 'no_issues'
    result.form1.issues = ''
    console.log('✅ Follow-up status: no_issues')
  } else if (notes.includes('issue') || notes.includes('problem') || notes.includes('concern')) {
    result.form1.followUpStatus = 'issues_identified'
    console.log('✅ Follow-up status: issues_identified')
    // Try to extract issues description
    const issuesMatch = clinicalNotes.match(/(?:issues?|problems?|concerns?)[:\s]+([^\n]+)/i)
    if (issuesMatch) {
      result.form1.issues = issuesMatch[1].trim()
      console.log('✅ Issues:', result.form1.issues)
    }
  }

  // Extract pharmacist name
  const pharmacistMatch = clinicalNotes.match(/pharmacist[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i)
  if (pharmacistMatch) {
    result.form1.pharmacistName = pharmacistMatch[1].trim()
    result.form1.pharmacistSignature = pharmacistMatch[1].trim()
    console.log('✅ Found pharmacist:', result.form1.pharmacistName)
  }

  result.form1.pages = '1'
  
  console.log('📊 Mock extraction complete - Form 1 data:', result.form1)

  // ========= LEGACY EXTRACTION =========
  
  // Extract DOB
  const dobMatch = clinicalNotes.match(/dob[:\s]+(\d{4}-\d{2}-\d{2})/i) ||
                   clinicalNotes.match(/date of birth[:\s]+(\d{4}-\d{2}-\d{2})/i)
  if (dobMatch) {
    result.patient.dateOfBirth = dobMatch[1]
  }

  // Extract medications
  const medMatch = clinicalNotes.match(/medications?[:\s]+([^\n]+)/i)
  if (medMatch) {
    const medList = medMatch[1].split(/,|;/).map(m => m.trim()).filter(Boolean)
    result.medications = medList.map(med => {
      const parts = med.match(/([A-Za-z]+)\s*(\d+\s*mg)?/i)
      return {
        id: generateId(),
        drugName: parts?.[1] || med,
        strength: parts?.[2] || '',
        din: '',
        dosageForm: 'tablet',
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
      }
    })
  }

  // Extract allergies
  const allergyMatch = clinicalNotes.match(/allergies?[:\s]+([^\n]+)/i)
  if (allergyMatch) {
    const allergyList = allergyMatch[1].split(/,|;/).map(a => a.trim()).filter(Boolean)
    result.allergies = allergyList.map(allergy => {
      const parts = allergy.match(/([A-Za-z]+)\s*\(([^)]+)\)?/i)
      return {
        id: generateId(),
        allergen: parts?.[1] || allergy,
        reaction: parts?.[2] || '',
        severity: '' as const
      }
    })
  }

  // Extract conditions
  const condMatch = clinicalNotes.match(/conditions?[:\s]+([^\n]+)/i)
  if (condMatch) {
    const condList = condMatch[1].split(/,|;/).map(c => c.trim()).filter(Boolean)
    result.medicalConditions = condList.map(cond => ({
      id: generateId(),
      condition: cond,
      diagnosedDate: '',
      status: 'active' as const,
      notes: ''
    }))
  }

  // Extract notes
  const notesMatch = clinicalNotes.match(/notes?[:\s]+([^\n]+)/i)
  if (notesMatch) {
    result.clinicalNotes.pharmacistNotes = notesMatch[1]
  }

  result.updatedAt = new Date().toISOString()
  return result
}

function mergeExtractedData(
  extracted: AIExtractionResult,
  existingData: MedsCheckFormData
): MedsCheckFormData {
  const result = { ...existingData }

  // ========================================================================
  // FORM 1: Healthcare Provider Notification
  // ========================================================================
  if (extracted.form1) {
    result.form1 = {
      ...result.form1,
      ...extracted.form1
    }
  }

  // ========================================================================
  // FORM 2: Patient Acknowledgement
  // ========================================================================
  if (extracted.form2) {
    result.form2 = {
      ...result.form2,
      ...extracted.form2
    }
  }

  // ========================================================================
  // FORM 3: Personal Medication Record
  // ========================================================================
  if (extracted.form3) {
    // Merge all form3 fields
    result.form3 = {
      ...result.form3,
      ...extracted.form3
    }
    
    // Handle medications array specially
    if (extracted.form3.medications && Array.isArray(extracted.form3.medications)) {
      result.form3.medications = extracted.form3.medications.map(med => ({
        id: generateId(),
        whatITake: med.whatITake || '',
        whyITakeIt: med.whyITakeIt || '',
        howITakeIt: med.howITakeIt || '',
        comments: med.comments || ''
      }))
    }
  }

  // ========================================================================
  // FORM 4: Pharmacist Worksheet (Most Comprehensive)
  // ========================================================================
  if (extracted.form4) {
    // Merge all form4 fields
    const form4Data = extracted.form4
    
    // Basic patient info
    if (form4Data.patientLastName) result.form4.patientLastName = form4Data.patientLastName
    if (form4Data.patientFirstName) result.form4.patientFirstName = form4Data.patientFirstName
    if (form4Data.patientGender) result.form4.patientGender = form4Data.patientGender
    if (form4Data.patientDOB) result.form4.patientDOB = form4Data.patientDOB
    if (form4Data.patientHealthCardNumber) result.form4.patientHealthCardNumber = form4Data.patientHealthCardNumber
    if (form4Data.patientPhone) result.form4.patientPhone = form4Data.patientPhone
    
    // Patient address components
    if (form4Data.patientUnitNumber) result.form4.patientUnitNumber = form4Data.patientUnitNumber
    if (form4Data.patientStreetNumber) result.form4.patientStreetNumber = form4Data.patientStreetNumber
    if (form4Data.patientStreetName) result.form4.patientStreetName = form4Data.patientStreetName
    if (form4Data.patientPOBox) result.form4.patientPOBox = form4Data.patientPOBox
    if (form4Data.patientCity) result.form4.patientCity = form4Data.patientCity
    if (form4Data.patientProvince) result.form4.patientProvince = form4Data.patientProvince
    if (form4Data.patientPostalCode) result.form4.patientPostalCode = form4Data.patientPostalCode
    if (form4Data.patientEmail) result.form4.patientEmail = form4Data.patientEmail
    
    // Caregiver info
    if (form4Data.caregiverLastName) result.form4.caregiverLastName = form4Data.caregiverLastName
    if (form4Data.caregiverFirstName) result.form4.caregiverFirstName = form4Data.caregiverFirstName
    if (form4Data.caregiverPhone) result.form4.caregiverPhone = form4Data.caregiverPhone
    if (form4Data.caregiverEmail) result.form4.caregiverEmail = form4Data.caregiverEmail
    if (form4Data.caregiverNotes) result.form4.caregiverNotes = form4Data.caregiverNotes
    
    // Primary Care Provider
    if (form4Data.providerLastName) result.form4.providerLastName = form4Data.providerLastName
    if (form4Data.providerFirstName) result.form4.providerFirstName = form4Data.providerFirstName
    if (form4Data.providerDesignation) result.form4.providerDesignation = form4Data.providerDesignation
    if (form4Data.providerPhone) result.form4.providerPhone = form4Data.providerPhone
    if (form4Data.providerFax) result.form4.providerFax = form4Data.providerFax
    if (form4Data.providerEmail) result.form4.providerEmail = form4Data.providerEmail
    
    // Allergies
    if (form4Data.knownAllergies) result.form4.knownAllergies = form4Data.knownAllergies
    if (form4Data.noKnownAllergies !== undefined) result.form4.noKnownAllergies = form4Data.noKnownAllergies
    
    // Interview Location
    if (form4Data.interviewLocation) result.form4.interviewLocation = form4Data.interviewLocation
    
    // Service Type
    if (form4Data.serviceProvided) result.form4.serviceProvided = form4Data.serviceProvided
    
    // Lifestyle Information (Page 2)
    if (form4Data.tobacco !== undefined) result.form4.tobacco = form4Data.tobacco
    if (form4Data.tobaccoYesNo) result.form4.tobaccoYesNo = form4Data.tobaccoYesNo
    if (form4Data.tobaccoCigPerDay) result.form4.tobaccoCigPerDay = form4Data.tobaccoCigPerDay
    if (form4Data.smokingCessation !== undefined) result.form4.smokingCessation = form4Data.smokingCessation
    if (form4Data.recreationalDrugUse !== undefined) result.form4.recreationalDrugUse = form4Data.recreationalDrugUse
    if (form4Data.recreationalDrugYesNo) result.form4.recreationalDrugYesNo = form4Data.recreationalDrugYesNo
    if (form4Data.alcoholUse !== undefined) result.form4.alcoholUse = form4Data.alcoholUse
    if (form4Data.alcoholYesNo) result.form4.alcoholYesNo = form4Data.alcoholYesNo
    if (form4Data.alcoholFrequency) result.form4.alcoholFrequency = form4Data.alcoholFrequency
    if (form4Data.exerciseRegimen !== undefined) result.form4.exerciseRegimen = form4Data.exerciseRegimen
    if (form4Data.exerciseRegimenDetails) result.form4.exerciseRegimenDetails = form4Data.exerciseRegimenDetails
    if (form4Data.lifestyleNotes) result.form4.lifestyleNotes = form4Data.lifestyleNotes
    
    // Clinical Need
    if (form4Data.clinicalNeedNotes) result.form4.clinicalNeedNotes = form4Data.clinicalNeedNotes
    
    // Patient Characteristics (18 checkboxes)
    if (form4Data.char3OrMoreMeds !== undefined) result.form4.char3OrMoreMeds = form4Data.char3OrMoreMeds
    if (form4Data.charMultipleConditions !== undefined) result.form4.charMultipleConditions = form4Data.charMultipleConditions
    if (form4Data.charNonPrescriptionMeds !== undefined) result.form4.charNonPrescriptionMeds = form4Data.charNonPrescriptionMeds
    if (form4Data.charNaturalHealthProducts !== undefined) result.form4.charNaturalHealthProducts = form4Data.charNaturalHealthProducts
    if (form4Data.charUnaddressedSymptoms !== undefined) result.form4.charUnaddressedSymptoms = form4Data.charUnaddressedSymptoms
    if (form4Data.charPotentialDrugProblem !== undefined) result.form4.charPotentialDrugProblem = form4Data.charPotentialDrugProblem
    if (form4Data.charMultiplePrescribers !== undefined) result.form4.charMultiplePrescribers = form4Data.charMultiplePrescribers
    if (form4Data.charEarlyLateRefills !== undefined) result.form4.charEarlyLateRefills = form4Data.charEarlyLateRefills
    if (form4Data.charNonAdherence !== undefined) result.form4.charNonAdherence = form4Data.charNonAdherence
    if (form4Data.charConfusedPatient !== undefined) result.form4.charConfusedPatient = form4Data.charConfusedPatient
    if (form4Data.charLabMonitoring !== undefined) result.form4.charLabMonitoring = form4Data.charLabMonitoring
    if (form4Data.charAbnormalLabResults !== undefined) result.form4.charAbnormalLabResults = form4Data.charAbnormalLabResults
    if (form4Data.charPlannedAdmission !== undefined) result.form4.charPlannedAdmission = form4Data.charPlannedAdmission
    if (form4Data.charDischargeTransition !== undefined) result.form4.charDischargeTransition = form4Data.charDischargeTransition
    if (form4Data.charCompliancePackaging !== undefined) result.form4.charCompliancePackaging = form4Data.charCompliancePackaging
    if (form4Data.charRenalFunction !== undefined) result.form4.charRenalFunction = form4Data.charRenalFunction
    if (form4Data.charLiverFunction !== undefined) result.form4.charLiverFunction = form4Data.charLiverFunction
    if (form4Data.charOther !== undefined) result.form4.charOther = form4Data.charOther
    
    // Sources Consulted (Page 3)
    if (form4Data.sourcesConsultedNotes) result.form4.sourcesConsultedNotes = form4Data.sourcesConsultedNotes
    if (form4Data.sourcePharmacyProfile !== undefined) result.form4.sourcePharmacyProfile = form4Data.sourcePharmacyProfile
    if (form4Data.sourcePhysician !== undefined) result.form4.sourcePhysician = form4Data.sourcePhysician
    if (form4Data.sourcePatient !== undefined) result.form4.sourcePatient = form4Data.sourcePatient
    if (form4Data.sourceCaregiver !== undefined) result.form4.sourceCaregiver = form4Data.sourceCaregiver
    if (form4Data.sourceAnotherPharmacy !== undefined) result.form4.sourceAnotherPharmacy = form4Data.sourceAnotherPharmacy
    if (form4Data.sourceMedPackages !== undefined) result.form4.sourceMedPackages = form4Data.sourceMedPackages
    if (form4Data.sourceLabValues !== undefined) result.form4.sourceLabValues = form4Data.sourceLabValues
    if (form4Data.sourceEHR !== undefined) result.form4.sourceEHR = form4Data.sourceEHR
    if (form4Data.sourceHospital !== undefined) result.form4.sourceHospital = form4Data.sourceHospital
    if (form4Data.sourceOther !== undefined) result.form4.sourceOther = form4Data.sourceOther
    
    // Medications (Page 3)
    if (form4Data.medications && Array.isArray(form4Data.medications)) {
      result.form4.medications = form4Data.medications.map(med => ({
        id: generateId(),
        drugName: med.drugName || '',
        strength: med.strength || '',
        dosageForm: med.dosageForm || '',
        directionsForUse: med.directionsForUse || '',
        indication: med.indication || '',
        adherenceIssue: med.adherenceIssue || '',
        rxOtcNhp: med.rxOtcNhp || '',
        patientComments: med.patientComments || '',
        pharmacistNotes: med.pharmacistNotes || '',
        commentsForRecord: med.commentsForRecord || ''
      }))
    }
    
    // Summary and Goals (Page 4)
    if (form4Data.summaryOfDiscussion) result.form4.summaryOfDiscussion = form4Data.summaryOfDiscussion
    if (form4Data.patientGoals) result.form4.patientGoals = form4Data.patientGoals
    if (form4Data.whatIWillDo) result.form4.whatIWillDo = form4Data.whatIWillDo
    
    // Pharmacist Information (Page 4)
    if (form4Data.pharmacistFullName) result.form4.pharmacistFullName = form4Data.pharmacistFullName
    if (form4Data.ocpNumber) result.form4.ocpNumber = form4Data.ocpNumber
    if (form4Data.medsCheckReviewDate) result.form4.medsCheckReviewDate = form4Data.medsCheckReviewDate
  }

  // ========================================================================
  // CROSS-FORM SYNCHRONIZATION
  // Sync data from Form 4 to other forms (Form 4 is most comprehensive)
  // ========================================================================
  
  // Sync patient data across all forms
  if (result.form4.patientFirstName || result.form4.patientLastName) {
    const firstName = result.form4.patientFirstName
    const lastName = result.form4.patientLastName
    
    // Update shared patient object
    result.patient.firstName = firstName || result.patient.firstName
    result.patient.lastName = lastName || result.patient.lastName
    result.patient.dateOfBirth = result.form4.patientDOB || result.patient.dateOfBirth
    result.patient.healthCardNumber = result.form4.patientHealthCardNumber || result.patient.healthCardNumber
    result.patient.phone = result.form4.patientPhone || result.patient.phone
    result.patient.email = result.form4.patientEmail || result.patient.email
    result.patient.city = result.form4.patientCity || result.patient.city
    result.patient.province = result.form4.patientProvince || result.patient.province
    result.patient.postalCode = result.form4.patientPostalCode || result.patient.postalCode
    
    // Sync to Form 1
    result.form1.patientName = `${firstName} ${lastName}`.trim() || result.form1.patientName
    result.form1.patientPhone = result.form4.patientPhone || result.form1.patientPhone
    
    // Sync to Form 2
    result.form2.patientFirstName = firstName || result.form2.patientFirstName
    result.form2.patientLastName = lastName || result.form2.patientLastName
    result.form2.patientStreetNumber = result.form4.patientStreetNumber || result.form2.patientStreetNumber
    result.form2.patientStreetName = result.form4.patientStreetName || result.form2.patientStreetName
    result.form2.patientCity = result.form4.patientCity || result.form2.patientCity
    result.form2.patientProvince = result.form4.patientProvince || result.form2.patientProvince
    result.form2.patientPostalCode = result.form4.patientPostalCode || result.form2.patientPostalCode
    result.form2.patientPhone = result.form4.patientPhone || result.form2.patientPhone
    result.form2.patientEmail = result.form4.patientEmail || result.form2.patientEmail
    
    // Sync to Form 3
    result.form3.patientFirstName = firstName || result.form3.patientFirstName
    result.form3.patientLastName = lastName || result.form3.patientLastName
    result.form3.patientDOB = result.form4.patientDOB || result.form3.patientDOB
    result.form3.patientStreetNumber = result.form4.patientStreetNumber || result.form3.patientStreetNumber
    result.form3.patientStreetName = result.form4.patientStreetName || result.form3.patientStreetName
    result.form3.patientCity = result.form4.patientCity || result.form3.patientCity
    result.form3.patientProvince = result.form4.patientProvince || result.form3.patientProvince
    result.form3.patientPostalCode = result.form4.patientPostalCode || result.form3.patientPostalCode
    result.form3.patientPhone = result.form4.patientPhone || result.form3.patientPhone
    result.form3.patientEmail = result.form4.patientEmail || result.form3.patientEmail
  }
  
  // Sync provider data across forms
  if (result.form4.providerFirstName || result.form4.providerLastName) {
    const provFirstName = result.form4.providerFirstName
    const provLastName = result.form4.providerLastName
    
    result.form3.providerFirstName = provFirstName || result.form3.providerFirstName
    result.form3.providerLastName = provLastName || result.form3.providerLastName
    result.form3.providerPhone = result.form4.providerPhone || result.form3.providerPhone
    result.form3.providerFax = result.form4.providerFax || result.form3.providerFax
  }
  
  // Sync allergies across forms
  if (result.form4.knownAllergies) {
    result.form3.allergies = result.form4.knownAllergies
  }
  
  // Sync pharmacist name across all forms
  let pharmacistName = ''
  if (result.form1.pharmacistName) {
    pharmacistName = result.form1.pharmacistName
  } else if (result.form3.pharmacistName) {
    pharmacistName = result.form3.pharmacistName
  } else if (result.form4.pharmacistFullName) {
    pharmacistName = result.form4.pharmacistFullName
  } else if (result.pharmacy.pharmacistName) {
    pharmacistName = result.pharmacy.pharmacistName
  }
  
  if (pharmacistName) {
    result.form1.pharmacistName = pharmacistName
    result.form1.pharmacistSignature = pharmacistName
    result.form3.pharmacistName = pharmacistName
    result.form4.pharmacistFullName = pharmacistName
    result.pharmacy.pharmacistName = pharmacistName
  }
  
  // Sync medications from Form 4 to Form 3
  if (result.form4.medications && result.form4.medications.length > 0) {
    result.form3.medications = result.form4.medications.map(med => ({
      id: generateId(),
      whatITake: `${med.drugName} ${med.strength} ${med.dosageForm}`.trim(),
      whyITakeIt: med.indication || '',
      howITakeIt: med.directionsForUse || '',
      comments: med.commentsForRecord || ''
    }))
  }

  // ========================================================================
  // LEGACY FORMAT SUPPORT (for backwards compatibility)
  // ========================================================================
  
  // Handle legacy patient extraction
  if (extracted.patient) {
    result.patient = {
      ...result.patient,
      ...extracted.patient
    }
    
    // Sync legacy patient data to forms
    if (extracted.patient.firstName || extracted.patient.lastName) {
      const firstName = extracted.patient.firstName || ''
      const lastName = extracted.patient.lastName || ''
      
      result.form1.patientName = `${firstName} ${lastName}`.trim()
      result.form2.patientFirstName = firstName
      result.form2.patientLastName = lastName
      result.form3.patientFirstName = firstName
      result.form3.patientLastName = lastName
      result.form4.patientFirstName = firstName
      result.form4.patientLastName = lastName
    }
  }

  // Handle legacy pharmacy extraction
  if (extracted.pharmacy) {
    result.pharmacy = {
      ...result.pharmacy,
      ...extracted.pharmacy
    }
    
    result.form2.pharmacyName = extracted.pharmacy.name || result.form2.pharmacyName
    result.form3.pharmacyNameAddress = extracted.pharmacy.name || result.form3.pharmacyNameAddress
    result.form4.pharmacyName = extracted.pharmacy.name || result.form4.pharmacyName
  }

  // Handle legacy medications extraction
  if (extracted.medications?.length) {
    result.medications = extracted.medications.map(med => ({
      id: generateId(),
      drugName: med.drugName || '',
      din: '',
      strength: med.strength || '',
      dosageForm: med.dosageForm || '',
      directions: med.directions || '',
      quantity: '',
      frequency: med.frequency || '',
      route: med.route || 'oral',
      startDate: '',
      prescriber: '',
      purpose: med.purpose || '',
      isOTC: med.isOTC || false,
      isActive: true,
      notes: ''
    }))
  }

  // Handle legacy allergies extraction
  if (extracted.allergies?.length) {
    result.allergies = extracted.allergies.map(allergy => ({
      id: generateId(),
      allergen: allergy.allergen || '',
      reaction: allergy.reaction || '',
      severity: (allergy.severity as 'mild' | 'moderate' | 'severe' | '') || ''
    }))
    
    const allergyText = extracted.allergies.map(a => 
      `${a.allergen}${a.reaction ? ` (${a.reaction})` : ''}`
    ).join(', ')
    
    result.form3.allergies = allergyText
    result.form4.knownAllergies = allergyText
    result.form4.noKnownAllergies = false
  }

  result.updatedAt = new Date().toISOString()
  return result
}
