import { Save, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const handleSave = () => {
    console.log('Save clicked')
  }

  const handleDownloadAll = () => {
    console.log('Download All PDFs clicked')
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      console.log('Clear All Data clicked')
    }
  }

  return (
    <footer className="h-[40px] border-t border-border bg-card px-4 flex items-center justify-between shrink-0">
      {/* Left - Last Saved Status */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Last saved: 2 minutes ago
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
