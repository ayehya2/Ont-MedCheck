import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Upload, FileImage, Loader2, X } from 'lucide-react'
import { extractTextFromImage, extractTextFromMultipleImages } from '@/lib/ocrUtils'

interface OCRUploadProps {
  onTextExtracted: (text: string) => void
  onError?: (error: string) => void
}

export function OCRUpload({ onTextExtracted, onError }: OCRUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleExtract = async () => {
    if (selectedFiles.length === 0) return

    setIsProcessing(true)
    setProgress(0)

    try {
      let extractedText: string

      if (selectedFiles.length === 1) {
        extractedText = await extractTextFromImage(selectedFiles[0], setProgress)
      } else {
        extractedText = await extractTextFromMultipleImages(selectedFiles, setProgress)
      }

      onTextExtracted(extractedText)
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'OCR extraction failed'
      onError?.(errorMessage)
      console.error('OCR error:', error)
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  return (
    <div className="border-2 border-dashed border-input rounded-lg p-3 space-y-2 bg-card/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
            <FileImage className="h-4 w-4 text-primary" />
            <span>Upload Patient Documents (OCR)</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Upload images of patient profiles, prescriptions, or medical records. AI will extract and fill the form automatically.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="gap-2 shrink-0"
        >
          <Upload className="h-4 w-4" />
          Select Images
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleExtract}
            disabled={isProcessing}
            className="gap-2 w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Extracting... {progress}%
              </>
            ) : (
              <>
                Extract & Fill Form
              </>
            )}
          </Button>

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-foreground">
              Selected files ({selectedFiles.length}):
            </p>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-xs bg-background border border-border rounded px-2 py-1">
                  <span className="truncate flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    disabled={isProcessing}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
