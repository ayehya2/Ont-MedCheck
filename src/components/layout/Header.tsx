import { HelpCircle, FileText, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useFormData } from '@/context/FormDataContext'
import { useToast } from '@/hooks/use-toast'

export function Header() {
  const { saveToStorage, clearAllData, isDirty, lastSaved } = useFormData()
  const { toast } = useToast()

  const handleSave = () => {
    saveToStorage()
    toast({
      title: "Data Saved",
      description: "Your form data has been saved successfully.",
    })
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      clearAllData()
      toast({
        title: "Data Cleared",
        description: "All form data has been cleared.",
      })
    }
  }

  const handleHelp = () => {
    toast({
      title: "Help",
      description: "Check the README.md file for detailed documentation.",
    })
  }

  return (
    <header className="h-[56px] border-b border-border bg-card px-3 flex items-center justify-between shrink-0">
      {/* Left - Logo and Title */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-lg">
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">MedsCheck Forms</h1>
          <p className="text-[10px] text-muted-foreground">Ontario Pharmacists Auto-Fill</p>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1.5">
        {lastSaved && (
          <span className="text-[10px] text-muted-foreground hidden sm:block">
            Saved: {new Date(lastSaved).toLocaleTimeString()}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="gap-1.5 h-7 text-xs px-2"
          title="Save Draft"
        >
          <Save className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Save</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          className="gap-1.5 h-7 text-xs px-2 text-destructive hover:text-destructive"
          title="Clear All Data"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
        <div className="w-px h-5 bg-border" />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelp}
          title="Help"
          className="h-7 w-7 p-0"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
