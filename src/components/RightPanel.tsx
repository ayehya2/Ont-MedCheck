import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Download, Loader2, FileStack, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormSection } from './ContinuousFormView'
import { pdf } from '@react-pdf/renderer'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Form1PDF } from './pdf/Form1PDF'
import { Form2PDF } from './pdf/Form2PDF'
import { Form3PDF } from './pdf/Form3PDF'
import { Form4PDF } from './pdf/Form4PDF'
import { useFormData } from '@/context/FormDataContext'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface RightPanelProps {
  activeSection: FormSection
}

const formTabs = [
  { id: 1 as FormSection, label: 'Form 1' },
  { id: 2 as FormSection, label: 'Form 2' },
  { id: 3 as FormSection, label: 'Form 3' },
  { id: 4 as FormSection, label: 'Form 4' },
]

// Custom hook to generate PDF blob URL with debounce
function usePDFPreview(activeTab: FormSection, data: ReturnType<typeof useFormData>['data'], manualRefresh: number) {
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

    // Debounce PDF generation - 150ms for responsive feel without too many updates
    timeoutId = setTimeout(generatePDF, 150)

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

export function RightPanel({ activeSection }: RightPanelProps) {
  const { data } = useFormData()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)
  const [manualRefresh, setManualRefresh] = useState(0)
  const [numPages, setNumPages] = useState<number>(0)
  const [scale, setScale] = useState(1.0)
  const [selectedTab, setSelectedTab] = useState<FormSection>(activeSection)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef<number>(0)
  const isRestoringScrollRef = useRef(false)
  const { pdfUrl, isGenerating } = usePDFPreview(selectedTab, data, manualRefresh)
  
  // Auto-sync tab with scroll position (can be overridden by manual tab click)
  const [isAutoSync, setIsAutoSync] = useState(true)
  
  // Update selected tab when activeSection changes (from scroll)
  useEffect(() => {
    if (isAutoSync) {
      setSelectedTab(activeSection)
    }
  }, [activeSection, isAutoSync])
  
  // Manual tab selection
  const handleTabClick = (tabId: FormSection) => {
    setSelectedTab(tabId)
    setIsAutoSync(false)
    // Re-enable auto-sync after 3 seconds of no manual interaction
    setTimeout(() => setIsAutoSync(true), 3000)
  }
  
  // Save scroll position before PDF regenerates
  useEffect(() => {
    if (isGenerating && scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollTop
    }
  }, [isGenerating])
  
  // Restore scroll position after PDF loads
  const restoreScrollPosition = useCallback(() => {
    if (scrollContainerRef.current && scrollPositionRef.current > 0 && !isRestoringScrollRef.current) {
      isRestoringScrollRef.current = true
      // Small delay to ensure pages are rendered
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPositionRef.current
        }
        isRestoringScrollRef.current = false
      })
    }
  }, [])

  // Reset scroll when switching tabs
  useEffect(() => {
    scrollPositionRef.current = 0
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [selectedTab])

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    // Restore scroll after document loads
    restoreScrollPosition()
  }, [restoreScrollPosition])

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true)
    try {
      const patientName = data.form1.patientName.replace(/\s+/g, '_') || 
                         `${data.form2.patientLastName}_${data.form2.patientFirstName}`.replace(/\s+/g, '_') || 
                         'Patient'
      const date = data.form1.date || new Date().toISOString().split('T')[0]
      
      const forms = [
        { doc: <Form1PDF data={data} />, name: '1_Healthcare_Provider_Notification' },
        { doc: <Form2PDF data={data} />, name: '2_Patient_Acknowledgement' },
        { doc: <Form3PDF data={data} />, name: '3_Personal_Medication_Record' },
        { doc: <Form4PDF data={data} />, name: '4_Pharmacist_Worksheet' }
      ]

      const baseFilename = `MedsCheck_AllForms_${patientName}_${date}`
      
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

      switch (selectedTab) {
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

  // Render PDF preview using react-pdf
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

    // Show PDF using react-pdf
    if (pdfUrl) {
      return (
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800"
          style={{ height: '100%' }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
            error={
              <div className="flex items-center justify-center p-8 text-red-500">
                Failed to load PDF
              </div>
            }
            className="flex flex-col items-center py-4 gap-4"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                className="shadow-lg"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            ))}
          </Document>
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col overflow-hidden pdf-preview-container bg-background h-full w-full">
      {/* PDF Tab Bar */}
      <div className="flex items-center border-b border-border bg-muted/30">
        {formTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
              selectedTab === tab.id
                ? 'border-primary text-primary bg-background'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {!isAutoSync && (
          <span className="ml-2 text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
            Manual
          </span>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">
            Preview - Form {selectedTab}
          </div>
          {numPages > 0 && (
            <span className="text-xs text-muted-foreground">
              {numPages} page{numPages > 1 ? 's' : ''}
            </span>
          )}
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="h-7 w-7 p-0"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={scale >= 3.0}
              className="h-7 w-7 p-0"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
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
