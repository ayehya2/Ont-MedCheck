import { FormTab, TabBar } from './TabBar'
import { Form1Fields } from './forms/Form1Fields'
import { Form2Fields } from './forms/Form2Fields'
import { Form3Fields } from './forms/Form3Fields'
import { Form4Fields } from './forms/Form4Fields'


interface LeftPanelProps {
  activeTab: FormTab
  onTabChange: (tab: FormTab) => void
}

export function LeftPanel({ activeTab, onTabChange }: LeftPanelProps) {
  // Render form fields based on active tab
  const renderFormFields = () => {
    switch (activeTab) {
      case 1:
        return <Form1Fields />
      case 2:
        return <Form2Fields />
      case 3:
        return <Form3Fields />
      case 4:
       return <Form4Fields />
      default:
        return null
    }
  }

  return (
    <>
      {/* Tab Bar at top */}
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Form Fields Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background/50">
        {renderFormFields()}
      </div>
    </>
  )
}
