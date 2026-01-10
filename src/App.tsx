import { useState, useEffect } from 'react'
import { FormDataProvider } from '@/context/FormDataContext'
import { PDFFormattingProvider } from '@/context/PDFFormattingContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { InputSection } from '@/components/InputSection'
import { LeftPanel } from '@/components/LeftPanel'
import { RightPanel } from '@/components/RightPanel'
import { FormTab } from '@/components/TabBar'
import { LandingPage } from '@/pages/LandingPage'

// Key for storing landing page state in sessionStorage
const SHOW_APP_KEY = 'medscheck_show_app'

function MainApp() {
  // State for active tab (1, 2, 3, or 4)
  const [activeTab, setActiveTab] = useState<FormTab>(1)
  
  // State for input section collapse
  const [isInputCollapsed, setIsInputCollapsed] = useState(false)
  
  // State for panel widths (percentage, min 30% max 70%)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  
  // State for dragging
  const [isDragging, setIsDragging] = useState(false)
  
  const handleMouseDown = () => {
    setIsDragging(true)
  }
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const container = document.querySelector('main')
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100
    
    // Clamp between 30% and 70%
    const clampedWidth = Math.max(30, Math.min(70, newWidth))
    setLeftPanelWidth(clampedWidth)
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  // Add/remove event listeners
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

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header - Fixed 60px height */}
      <Header />

      {/* Main Content Area - Takes remaining height, split by leftPanelWidth */}
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Left Container - Dynamic width, contains tabs, form fields, and clinical notes input */}
        <div 
          className="border-r border-border flex flex-col overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <LeftPanel activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Clinical Notes Input - Below left panel */}
          <InputSection 
            isCollapsed={isInputCollapsed} 
            onToggleCollapse={() => setIsInputCollapsed(!isInputCollapsed)} 
          />
        </div>
        
        {/* Resize Handle */}
        <div 
          className="w-1 bg-border hover:bg-primary hover:w-1.5 cursor-col-resize transition-all relative group z-10"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
              ⋮⋮ Drag to resize
            </div>
          </div>
        </div>

        {/* Right Panel - Remaining width, contains PDF preview */}
        <div className="flex-1 overflow-hidden">
          <RightPanel activeTab={activeTab} />
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
