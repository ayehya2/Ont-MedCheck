import { useRef, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from './button'
import { Eraser, Upload } from 'lucide-react'

interface SignaturePadProps {
  value: string
  onChange: (signature: string) => void
  label?: string
  required?: boolean
}

export function SignaturePad({ value, onChange, label, required }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load existing signature when component mounts or value changes externally
  useEffect(() => {
    if (value && sigCanvas.current && sigCanvas.current.isEmpty()) {
      sigCanvas.current.fromDataURL(value)
    }
  }, [value])

  const handleClear = () => {
    sigCanvas.current?.clear()
    onChange('')
  }

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.toDataURL('image/png')
      onChange(dataURL)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataURL = event.target?.result as string
        onChange(dataURL)
        // Load the image into the canvas
        if (sigCanvas.current) {
          sigCanvas.current.fromDataURL(dataURL)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1 font-bold">*</span>}
        </label>
      )}
      
      <div className="border-2 border-input rounded-md bg-background focus-within:border-primary transition-colors">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'w-full h-32 cursor-crosshair rounded-md',
            style: { touchAction: 'none' }
          }}
          onEnd={handleEnd}
          backgroundColor="rgb(255, 255, 255)"
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="gap-2"
        >
          <Eraser className="h-4 w-4" />
          Clear
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Image
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Draw your signature with your mouse/touchpad, or upload an image
      </p>
    </div>
  )
}
