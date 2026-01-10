import { useState, useEffect, useMemo, useRef } from 'react'
import { Download, Loader2, FileStack } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormTab } from './TabBar'
import { pdf } from '@react-pdf/renderer'
import { Form1PDF } from './pdf/Form1PDF'
import { Form2PDF } from './pdf/Form2PDF'
import { Form3PDF } from './pdf/Form3PDF'
import { Form4PDF } from './pdf/Form4PDF'
import { useFormData } from '@/context/FormDataContext'

interface RightPanelProps {
  activeTab: FormTab
}

// Custom hook to generate PDF blob URL with debounce
function usePDFPreview(activeTab: FormTab, data: ReturnType<typeof useFormData>['data'], manualRefresh: number) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const previousUrlRef = useRef<string | null>(null)

  // Memoize the document based on active tab and data
  const doc = useMemo(() => {
    switch (activeTab) {
      case 1:
        return <Form1PDF data={data} />
      case 2:
        return <Form2PDF data={data} />
      case 3:
        return <Form3PDF data={data} />
      case 4:
        return <Form4PDF data={data} />
      default:
        return null
    }
  }, [activeTab, data])

  useEffect(() => {
    if (!doc) {
      setPdfUrl(null)
      return
    }

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const generatePDF = async () => {
      setIsGenerating(true)
      try {
        const blob = await pdf(doc).toBlob()
        if (!cancelled) {
          const newUrl = URL.createObjectURL(blob)
          
          // Keep old URL visible until new one is ready (prevents flicker)
          setPdfUrl(newUrl)
          
          // Revoke old URL after a short delay (after browser has loaded new one)
          if (previousUrlRef.current) {
            setTimeout(() => {
              if (previousUrlRef.current) {
                URL.revokeObjectURL(previousUrlRef.current)
              }
            }, 100)
          }
          
          // Store new URL for next cleanup
          previousUrlRef.current = newUrl
        }
      } catch (error) {
        console.error('PDF preview generation failed:', error)
        if (!cancelled) {
          setPdfUrl(null)
        }
      } finally {
        if (!cancelled) {
          setIsGenerating(false)
        }
      }
    }

    // Near-instant updates with minimal 100ms debounce for live preview
    timeoutId = setTimeout(generatePDF, 100)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [doc, manualRefresh])

  // Cleanup all URLs on unmount
  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current)
      }
    }
  }, [])

  return { pdfUrl, isGenerating }
}

export function RightPanel({ activeTab }: RightPanelProps) {
  const { data } = useFormData()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)
  const [manualRefresh, setManualRefresh] = useState(0)
  const { pdfUrl, isGenerating } = usePDFPreview(activeTab, data, manualRefresh)

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true)
    try {
      // Create a consolidated PDF with all 4 forms
      const patientName = data.form1.patientName.replace(/\s+/g, '_') || 
                         `${data.form2.patientLastName}_${data.form2.patientFirstName}`.replace(/\s+/g, '_') || 
                         'Patient'
      const date = data.form1.date || new Date().toISOString().split('T')[0]
      
      // We need to combine all PDFs - React-PDF doesn't support multi-document PDFs directly
      // So we'll download them sequentially with bookmarks in filenames
      const forms = [
        { doc: <Form1PDF data={data} />, name: '1_Healthcare_Provider_Notification' },
        { doc: <Form2PDF data={data} />, name: '2_Patient_Acknowledgement' },
        { doc: <Form3PDF data={data} />, name: '3_Personal_Medication_Record' },
        { doc: <Form4PDF data={data} />, name: '4_Pharmacist_Worksheet' }
      ]

      // Create a single combined filename
      const baseFilename = `MedsCheck_AllForms_${patientName}_${date}`
      
      // Download each PDF with numbered prefix
      for (const form of forms) {
        const blob = await pdf(form.doc).toBlob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${baseFilename}_${form.name}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        // Small delay between downloads to avoid browser blocking
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    } catch (error) {
      console.error('Consolidated PDF download failed:', error)
    } finally {
      setIsDownloadingAll(false)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      let doc
      let filename = 'MedsCheck_Form'

      switch (activeTab) {
        case 1:
          doc = <Form1PDF data={data} />
          const patientName1 = data.form1.patientName.replace(/\s+/g, '_') || 'Patient'
          const date1 = data.form1.date || new Date().toISOString().split('T')[0]
          filename = `Form1_Notification_${patientName1}_${date1}.pdf`
          break
        case 2:
          doc = <Form2PDF data={data} />
          const patientName2 = `${data.form2.patientLastName}_${data.form2.patientFirstName}`.replace(/\s+/g, '_') || 'Patient'
          const date2 = data.form2.signatureDate || new Date().toISOString().split('T')[0]
          filename = `Form2_PatientAcknowledgement_${patientName2}_${date2}.pdf`
          break
        case 3:
          doc = <Form3PDF data={data} />
          const patientName3 = `${data.form3.patientLastName}_${data.form3.patientFirstName}`.replace(/\s+/g, '_') || 'Patient'
          const date3 = data.form3.dateCompleted || new Date().toISOString().split('T')[0]
          filename = `Form3_PersonalMedicationRecord_${patientName3}_${date3}.pdf`
          break
        case 4:
          doc = <Form4PDF data={data} />
          const patientName4 = `${data.form4.patientLastName}_${data.form4.patientFirstName}`.replace(/\s+/g, '_') || 'Patient'
          const date4 = data.form4.medsCheckReviewDate || new Date().toISOString().split('T')[0]
          filename = `Form4_PharmacistWorksheet_${patientName4}_${date4}.pdf`
          break
        default:
          setIsDownloading(false)
          return
      }

      const blob = await pdf(doc).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  // Render PDF preview based on active tab
  const renderPDFPreview = () => {
    // Show loading state
    if (isGenerating && !pdfUrl) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Generating PDF preview...</p>
          </div>
        </div>
      )
    }

    // Show PDF in iframe
    if (pdfUrl) {
      return (
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0`}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title={`Form ${activeTab} PDF Preview`}
        />
      )
    }

    return null
  }

  return (
    <div className="flex flex-col overflow-hidden pdf-preview-container bg-background h-full w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="text-sm font-medium">
          Preview - Form {activeTab}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setManualRefresh(prev => prev + 1)}
            disabled={isGenerating}
            className="gap-2"
            title="Refresh PDF preview now"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            className="gap-2"
            title="Download all 4 forms as separate PDFs"
          >
            {isDownloadingAll ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileStack className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Download All</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
            className="gap-2"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </Button>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="flex-1 overflow-hidden">
        {renderPDFPreview()}
      </div>
    </div>
  )
}
