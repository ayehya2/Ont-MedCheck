import { ChevronDown, ChevronUp, Sparkles, Trash2, Loader2, Zap, Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { OCRUpload } from '@/components/OCRUpload'
import { useState, useEffect, useRef } from 'react'
import { useFormData } from '@/context/FormDataContext'
import { useToast } from '@/hooks/use-toast'
import { processWithAI } from '@/services/aiService'

// Check if Gemini API key is configured
const hasAIKey = !!import.meta.env.VITE_GEMINI_API_KEY

interface InputSectionProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  height?: number
}

// Simple pattern-based extraction (fallback when no API key)
function extractDataFromNotes(notes: string) {
  const extracted: Record<string, any> = {}
  const lines = notes.split('\n')
  
  // Patient name patterns
  const namePatterns = [
    /patient\s*(?:name)?[:\s]+([A-Za-z]+)\s+([A-Za-z]+)/i,
    /name[:\s]+([A-Za-z]+)\s+([A-Za-z]+)/i,
    /^([A-Za-z]+)\s+([A-Za-z]+)\s*,?\s*(?:patient|pt)/i
  ]
  for (const pattern of namePatterns) {
    const match = notes.match(pattern)
    if (match) {
      extracted.patientFirstName = match[1]
      extracted.patientLastName = match[2]
      break
    }
  }

  // Date of Birth
  const dobPatterns = [
    /(?:dob|date of birth|born)[:\s]+(\d{4}[-/]\d{2}[-/]\d{2})/i,
    /(?:dob|date of birth|born)[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})/i
  ]
  for (const pattern of dobPatterns) {
    const match = notes.match(pattern)
    if (match) {
      let dob = match[1]
      // Convert MM/DD/YYYY to YYYY-MM-DD if needed
      if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(dob)) {
        const parts = dob.split(/[-/]/)
        dob = `${parts[2]}-${parts[0]}-${parts[1]}`
      }
      extracted.patientDOB = dob.replace(/\//g, '-')
      break
    }
  }

  // Phone number
  const phoneMatch = notes.match(/(?:phone|tel|cell)[:\s]+([0-9\-\(\)\s]+)/i)
  if (phoneMatch) {
    extracted.patientPhone = phoneMatch[1].trim()
  }

  // Health Card Number
  const hcnMatch = notes.match(/(?:health card|hcn|ohip)[:\s#]+(\d{10})/i)
  if (hcnMatch) {
    extracted.healthCardNumber = hcnMatch[1]
  }

  // Address
  const addressMatch = notes.match(/(?:address)[:\s]+(.+?)(?:\n|$)/i)
  if (addressMatch) {
    extracted.patientAddress = addressMatch[1].trim()
  }

  // City
  const cityMatch = notes.match(/(?:city)[:\s]+([A-Za-z\s]+?)(?:,|\n|$)/i)
  if (cityMatch) {
    extracted.patientCity = cityMatch[1].trim()
  }

  // Postal Code
  const postalMatch = notes.match(/(?:postal|zip)[:\s]+([A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d)/i)
  if (postalMatch) {
    extracted.patientPostalCode = postalMatch[1].toUpperCase()
  }

  // Pharmacy name
  const pharmacyMatch = notes.match(/(?:pharmacy)[:\s]+(.+?)(?:\n|$)/i)
  if (pharmacyMatch) {
    extracted.pharmacyName = pharmacyMatch[1].trim()
  }

  // Physician/Doctor
  const doctorPatterns = [
    /(?:physician|doctor|dr\.?|primary care)[:\s]+(?:dr\.?\s*)?([A-Za-z]+)\s+([A-Za-z]+)/i,
    /(?:pcp)[:\s]+(?:dr\.?\s*)?([A-Za-z]+)\s+([A-Za-z]+)/i
  ]
  for (const pattern of doctorPatterns) {
    const match = notes.match(pattern)
    if (match) {
      extracted.doctorFirstName = match[1]
      extracted.doctorLastName = match[2]
      break
    }
  }

  // Allergies
  const allergyMatch = notes.match(/(?:allergies|allergy)[:\s]+(.+?)(?:\n|$)/i)
  if (allergyMatch) {
    extracted.allergies = allergyMatch[1].trim()
  }

  // Medications - look for common patterns
  const medications: Array<{ name: string; strength?: string; directions?: string }> = []
  
  for (const line of lines) {
    // Match lines that look like medications (e.g., "Metformin 500mg twice daily")
    const medMatch = line.match(/^\s*[-•*]?\s*([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+\s*(?:mg|mcg|ml|units?))\s*(.*)$/i)
    if (medMatch) {
      medications.push({
        name: medMatch[1],
        strength: medMatch[2],
        directions: medMatch[3] || ''
      })
    }
  }
  if (medications.length > 0) {
    extracted.medications = medications
  }

  return extracted
}

export function InputSection({ isCollapsed, onToggleCollapse, height = 600 }: InputSectionProps) {
  const [notes, setNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [useAI, setUseAI] = useState(hasAIKey)
  const [isListening, setIsListening] = useState(false)
  const { updateField, data, setFormData } = useFormData()
  const { toast } = useToast()
  const recognitionRef = useRef<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          setNotes(prev => prev ? `${prev} ${finalTranscript}` : finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        toast({
          title: "Speech Recognition Error",
          description: event.error === 'no-speech' ? 'No speech detected. Please try again.' : `Error: ${event.error}`,
          variant: "destructive"
        })
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [toast])

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
        variant: "destructive"
      })
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        toast({
          title: "Listening...",
          description: "Speak into your microphone. Click again to stop.",
        })
      } catch (error) {
        console.error('Failed to start recognition:', error)
        toast({
          title: "Failed to Start",
          description: "Could not access microphone. Check permissions.",
          variant: "destructive"
        })
      }
    }
  }

  // AI-powered extraction using Gemini API
  const handleProcessWithAI = async () => {
    if (!notes.trim()) return
    
    setIsProcessing(true)
    
    try {
      console.log('🚀 InputSection - Starting AI extraction...')
      toast({
        title: "Processing with AI",
        description: "Analyzing clinical notes with Gemini AI...",
      })

      const extractedData = await processWithAI(notes, data)
      console.log('✨ InputSection - AI returned data:', extractedData)
      console.log('📝 InputSection - Form1 data from AI:', extractedData.form1)
      
      // Use setFormData to update ALL data at once - this prevents sync issues
      console.log('🎯 InputSection - Calling setFormData...')
      setFormData(extractedData)
      console.log('✅ InputSection - setFormData called successfully')
      
      // Count how many Form 1 fields were populated
      const form1Fields = Object.entries(extractedData.form1 || {}).filter(([_, value]) => value && value !== '')
      const fieldsUpdated = form1Fields.length
      
      console.log(`📊 Populated ${fieldsUpdated} Form 1 fields`)
      
      toast({
        title: "AI Extraction Complete",
        description: `Successfully extracted and populated ${fieldsUpdated} field(s)`,
      })
    } catch (error) {
      console.error('❌ InputSection - AI extraction failed:', error)
      toast({
        title: "AI Extraction Failed",
        description: "Falling back to pattern matching...",
        variant: "destructive"
      })
      await handleProcessBasic()
    } finally {
      setIsProcessing(false)
    }
  }

  // Basic pattern-based extraction (fallback)
  const handleProcessBasic = async () => {
    if (!notes.trim()) return
    
    setIsProcessing(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const extracted = extractDataFromNotes(notes)
      let fieldsUpdated = 0

      // Update patient info
      if (extracted.patientFirstName) {
        updateField('patient.firstName', extracted.patientFirstName)
        fieldsUpdated++
      }
      if (extracted.patientLastName) {
        updateField('patient.lastName', extracted.patientLastName)
        fieldsUpdated++
      }
      if (extracted.patientDOB) {
        updateField('patient.dateOfBirth', extracted.patientDOB)
        fieldsUpdated++
      }
      if (extracted.patientPhone) {
        updateField('patient.phone', extracted.patientPhone)
        fieldsUpdated++
      }
      if (extracted.healthCardNumber) {
        updateField('patient.healthCardNumber', extracted.healthCardNumber)
        fieldsUpdated++
      }
      if (extracted.patientAddress) {
        updateField('patient.address', extracted.patientAddress)
        fieldsUpdated++
      }
      if (extracted.patientCity) {
        updateField('patient.city', extracted.patientCity)
        fieldsUpdated++
      }
      if (extracted.patientPostalCode) {
        updateField('patient.postalCode', extracted.patientPostalCode)
        fieldsUpdated++
      }

      // Update pharmacy info
      if (extracted.pharmacyName) {
        updateField('pharmacy.name', extracted.pharmacyName)
        fieldsUpdated++
      }

      // Update primary care provider
      if (extracted.doctorFirstName) {
        updateField('primaryCareProvider.firstName', extracted.doctorFirstName)
        fieldsUpdated++
      }
      if (extracted.doctorLastName) {
        updateField('primaryCareProvider.lastName', extracted.doctorLastName)
        fieldsUpdated++
      }

      // Update allergies in Form 4
      if (extracted.allergies) {
        updateField('form4.allergiesDetails', extracted.allergies)
        fieldsUpdated++
      }

      // Add medications to the existing list
      if (extracted.medications && extracted.medications.length > 0) {
        const existingMeds = data.medications || []
        const newMeds = extracted.medications.map((med: { name: string; strength?: string; directions?: string }, idx: number) => ({
          id: `extracted-${Date.now()}-${idx}`,
          drugName: med.name,
          strength: med.strength || '',
          directions: med.directions || '',
          dosageForm: '',
          startDate: '',
          prescriber: '',
          purpose: '',
          isOTC: false
        }))
        updateField('medications', [...existingMeds, ...newMeds])
        fieldsUpdated += newMeds.length
      }

      if (fieldsUpdated > 0) {
        toast({
          title: "Data Extracted",
          description: `Found ${fieldsUpdated} field${fieldsUpdated > 1 ? 's' : ''} using pattern matching.`,
        })
      } else {
        toast({
          title: "No Data Found",
          description: "Try: 'Patient: John Smith' or 'DOB: 1990-01-15'",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "An error occurred while processing.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClear = () => {
    setNotes('')
  }

  const handleProcess = async () => {
    if (useAI && hasAIKey) {
      await handleProcessWithAI()
    } else {
      await handleProcessBasic()
    }
  }

  const handleOCRTextExtracted = async (text: string) => {
    // Add extracted text to notes
    setNotes(prev => prev ? `${prev}\n\n--- OCR Extracted ---\n${text}` : text)
    
    // Automatically process with AI if available
    toast({
      title: "OCR Complete",
      description: "Text extracted successfully. Processing with AI...",
    })
    
    // Process the extracted text
    setTimeout(async () => {
      if (useAI && hasAIKey) {
        await handleProcessWithAI()
      } else {
        await handleProcessBasic()
      }
    }, 500)
  }

  const handleOCRError = (error: string) => {
    toast({
      title: "OCR Failed",
      description: error,
      variant: "destructive"
    })
  }

  return (
    <div 
      className="border-t bg-muted/30 overflow-hidden transition-all duration-300 ease-in-out flex flex-col"
      style={{ height: isCollapsed ? '40px' : `${height}px` }}
    >
      {/* Header / Title Bar - Always visible */}
      <button
        onClick={onToggleCollapse}
        className="w-full h-10 px-4 flex items-center justify-between hover:bg-accent/30 transition-colors group border-b border-border"
      >
        <span className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          Clinical Notes Input
          {notes.trim() && (
            <span className="text-xs text-muted-foreground ml-2 bg-primary/10 px-2 py-0.5 rounded-full">
              {notes.length} chars
            </span>
          )}
        </span>
        {isCollapsed ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </button>

      {/* Expandable Content */}
      <div className="px-4 pb-4 pt-3 flex-1 flex flex-col overflow-hidden">
        {/* OCR Upload Section */}
        <div className="mb-3">
          <OCRUpload 
            onTextExtracted={handleOCRTextExtracted}
            onError={handleOCRError}
          />
        </div>

        <div className="relative mb-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-muted/30 px-2 text-muted-foreground">Or paste text manually</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 mb-3">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste clinical notes here. Try patterns like:
Patient: John Smith
DOB: 1990-05-15
Phone: 416-555-1234
Address: 123 Main St
City: Toronto
Postal: M5V 2K1
Physician: Dr. Jane Doe
Allergies: Penicillin, Sulfa"
            className="flex-1 resize-y font-mono text-sm bg-background border-border focus:border-primary transition-colors min-h-[100px]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={toggleSpeechRecognition}
            variant={isListening ? "destructive" : "outline"}
            className="gap-2"
            disabled={isProcessing}
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 animate-pulse" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                Voice Input
              </>
            )}
          </Button>

          <Button
            onClick={handleProcess}
            disabled={!notes.trim() || isProcessing}
            className="gap-2 shadow-sm"
            variant={useAI && hasAIKey ? "default" : "secondary"}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {useAI && hasAIKey ? "AI Processing..." : "Extracting..."}
              </>
            ) : (
              <>
                {useAI && hasAIKey ? (
                  <Zap className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {useAI && hasAIKey ? "Extract with AI" : "Extract (Basic)"}
              </>
            )}
          </Button>

          {hasAIKey && (
            <Button
              variant={useAI ? "default" : "outline"}
              size="sm"
              onClick={() => setUseAI(!useAI)}
              className="gap-1 text-xs"
            >
              {useAI ? "✨ AI: ON" : "AI: OFF"}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!notes.trim() || isProcessing}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
          
          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            {hasAIKey 
              ? (useAI ? (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Using Gemini AI
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                    Pattern matching
                  </>
                ))
              : "Add VITE_GEMINI_API_KEY to .env for AI"
            }
          </span>
        </div>
      </div>
    </div>
  )
}
