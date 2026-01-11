import { Save, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormData } from '@/context/FormDataContext'

export function Footer() {
  const { clearAllData, saveToStorage, lastSaved } = useFormData()

  const handleSave = () => {
    saveToStorage()
  }

  const handleDownloadAll = () => {
    console.log('Download All PDFs clicked')
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearAllData()
    }
  }

  // Format last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved yet'
    const diff = Date.now() - lastSaved.getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes === 1) return '1 minute ago'
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours === 1) return '1 hour ago'
    return `${hours} hours ago`
  }

  return (
    <footer className="h-[40px] border-t border-border bg-card px-4 flex items-center justify-between shrink-0">
      {/* Left - Last Saved Status */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Last saved: {formatLastSaved()}
        </span>
      </div>

      {/* Right - Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={handleDownloadAll}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download All PDFs
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>
    </footer>
  )
}
