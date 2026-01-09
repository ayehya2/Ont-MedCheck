import { useState } from 'react'
import { FormDataProvider } from '@/context/FormDataContext'
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

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header - Fixed 60px height */}
      <Header />

      {/* Main Content Area - Takes remaining height, split 50/50 */}
      <main className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Container - 50% width, contains tabs, form fields, and clinical notes input */}
        <div className="w-1/2 border-r border-border flex flex-col overflow-hidden">
          <LeftPanel activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Clinical Notes Input - Below left panel */}
          <InputSection 
            isCollapsed={isInputCollapsed} 
            onToggleCollapse={() => setIsInputCollapsed(!isInputCollapsed)} 
          />
        </div>

        {/* Right Panel - 50% width, contains PDF preview */}
        <RightPanel activeTab={activeTab} />
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
      <AppContent />
    </FormDataProvider>
  )
}

export default App
