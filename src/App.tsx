import { useState, useEffect } from 'react'
import { FormDataProvider } from '@/context/FormDataContext'
import { PDFFormattingProvider } from '@/context/PDFFormattingContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { InputSection } from '@/components/InputSection'
import { LeftPanel } from '@/components/LeftPanel'
import { RightPanel } from '@/components/RightPanel'
import { LandingPage } from '@/pages/LandingPage'

// Key for storing landing page state in sessionStorage
const SHOW_APP_KEY = 'medscheck_show_app'

function MainApp() {
  // State for input section collapse
  const [isInputCollapsed, setIsInputCollapsed] = useState(false)
  
  // State for panel widths (percentage, min 30% max 70%)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  
  // State for clinical notes height (pixels, min 200px max 800px)
  const [clinicalNotesHeight, setClinicalNotesHeight] = useState(400)
  
  // State for dragging
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingVertical, setIsDraggingVertical] = useState(false)
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const container = document.querySelector('main')
    if (!container) return

    const rect = container.getBoundingClientRect()
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100

    // Clamp between 30% and 70%
    const clampedWidth = Math.max(30, Math.min(70, newWidth))

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setLeftPanelWidth(clampedWidth)
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsDraggingVertical(false)
  }

  const handleVerticalMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingVertical(true)
  }

  const handleVerticalMouseMove = (e: MouseEvent) => {
    if (!isDraggingVertical) return
    e.preventDefault()

    // Calculate new height based on mouse Y position from bottom of viewport
    const newHeight = window.innerHeight - e.clientY

    // Clamp between 200px and 800px
    const clampedHeight = Math.max(200, Math.min(800, newHeight))

    // Use requestAnimationFrame for smoother updates (same as horizontal)
    requestAnimationFrame(() => {
      setClinicalNotesHeight(clampedHeight)
    })
  }
  
  // Add/remove event listeners and prevent text selection during drag
  useEffect(() => {
    if (isDragging || isDraggingVertical) {
      // Prevent text selection during drag
      document.body.style.userSelect = 'none'
      document.body.style.cursor = isDragging ? 'col-resize' : 'row-resize'
    } else {
      // Restore text selection when not dragging
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isDragging, isDraggingVertical])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove as any)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove as any)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  useEffect(() => {
    if (isDraggingVertical) {
      window.addEventListener('mousemove', handleVerticalMouseMove as any)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleVerticalMouseMove as any)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDraggingVertical])

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header - Fixed 60px height */}
      <Header />

      {/* Drag Overlay - Prevents iframes/canvas from capturing mouse events */}
      {(isDragging || isDraggingVertical) && (
        <div className="fixed inset-0 z-[100]" style={{ cursor: isDragging ? 'col-resize' : 'row-resize' }} />
      )}

      {/* Main Content Area - Takes remaining height, split by leftPanelWidth */}
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Left Container - Dynamic width, contains tabs, form fields, and clinical notes input */}
        <div 
          className="border-r border-border flex flex-col overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <LeftPanel />
          
          {/* Vertical Resize Handle - Above Clinical Notes */}
          <div
            className="h-1 bg-border hover:bg-primary cursor-row-resize relative group z-[60]"
            onMouseDown={handleVerticalMouseDown}
            style={{ transition: isDraggingVertical ? 'none' : 'background-color 0.2s' }}
          >
            {/* Larger hitbox for easier grabbing - extends more into InputSection */}
            <div
              className="absolute inset-x-0 -top-2 -bottom-8 z-[60] cursor-row-resize"
              onMouseDown={handleVerticalMouseDown}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
                ⋯ Drag to resize
              </div>
            </div>
          </div>
          
          {/* Clinical Notes Input - Below left panel */}
          <InputSection 
            isCollapsed={isInputCollapsed} 
            onToggleCollapse={() => setIsInputCollapsed(!isInputCollapsed)}
            height={clinicalNotesHeight}
          />
        </div>
        
        {/* Resize Handle */}
        <div
          className="w-1 bg-border hover:bg-primary cursor-col-resize relative group z-[60]"
          onMouseDown={handleMouseDown}
          style={{ transition: isDragging ? 'none' : 'background-color 0.2s' }}
        >
          {/* Larger hitbox for easier grabbing */}
          <div
            className="absolute inset-y-0 -left-4 -right-4 z-[60] cursor-col-resize"
            onMouseDown={handleMouseDown}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
              ⋮⋮ Drag to resize
            </div>
          </div>
        </div>

        {/* Right Panel - Remaining width, contains PDF preview */}
        <div className="flex-1 overflow-hidden">
          <RightPanel />
        </div>
      </main>

      {/* Footer - Fixed 40px height */}
      <Footer />
    </div>
  )
}

function AppContent() {
  // Check sessionStorage for whether to show the app or landing page
  const [showApp, setShowApp] = useState(() => {
    return sessionStorage.getItem(SHOW_APP_KEY) === 'true'
  })

  const handleEnterApp = () => {
    sessionStorage.setItem(SHOW_APP_KEY, 'true')
    setShowApp(true)
  }

  if (!showApp) {
    return <LandingPage onEnterApp={handleEnterApp} />
  }

  return <MainApp />
}

function App() {
  return (
    <FormDataProvider>
      <PDFFormattingProvider>
        <AppContent />
      </PDFFormattingProvider>
    </FormDataProvider>
  )
}

export default App
