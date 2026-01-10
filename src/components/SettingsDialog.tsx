import { useState, useEffect } from 'react'
import { Settings, Key, Eye, EyeOff, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

// LocalStorage key for Gemini API key
const GEMINI_API_KEY_STORAGE = 'medscheck_gemini_api_key'

// Helper functions for API key management
export function getStoredApiKey(): string {
  return localStorage.getItem(GEMINI_API_KEY_STORAGE) || ''
}

export function setStoredApiKey(key: string): void {
  if (key.trim()) {
    localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim())
  } else {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE)
  }
}

export function hasStoredApiKey(): boolean {
  return !!getStoredApiKey()
}

export function SettingsDialog() {
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const { toast } = useToast()

  // Load API key when dialog opens
  useEffect(() => {
    if (open) {
      setApiKey(getStoredApiKey())
    }
  }, [open])

  const handleSave = () => {
    setStoredApiKey(apiKey)
    
    toast({
      title: apiKey.trim() ? "API Key Saved" : "API Key Removed",
      description: apiKey.trim() 
        ? "Your Gemini API key has been saved to browser storage." 
        : "Your API key has been removed.",
    })
    
    setOpen(false)
    
    // Trigger a storage event to notify other components
    window.dispatchEvent(new Event('storage'))
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to remove your API key?')) {
      setApiKey('')
      setStoredApiKey('')
      toast({
        title: "API Key Removed",
        description: "Your Gemini API key has been removed.",
      })
      window.dispatchEvent(new Event('storage'))
    }
  }

  const openGeminiDocs = () => {
    window.open('https://ai.google.dev/gemini-api/docs/api-key', '_blank')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          title="Settings"
          className="h-7 w-7 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your AI settings and API keys for enhanced features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Gemini API Key Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="gemini-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Google Gemini API Key
              </Label>
              <Button
                variant="link"
                size="sm"
                onClick={openGeminiDocs}
                className="h-auto p-0 text-xs"
              >
                Get API Key <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="relative">
              <Input
                id="gemini-key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="pr-10 font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to any server except Google's Gemini API.
            </p>
          </div>

          {/* Information about AI features */}
          <div className="rounded-lg border border-border bg-muted/50 p-3 space-y-2">
            <h4 className="text-sm font-semibold">AI-Powered Features</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Automatic extraction of patient data from clinical notes</li>
              <li>• Intelligent parsing of medications, allergies, and conditions</li>
              <li>• Natural language understanding of medical records</li>
              <li>• Faster form completion with AI assistance</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          {apiKey.trim() && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="text-destructive hover:text-destructive"
            >
              Remove Key
            </Button>
          )}
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
