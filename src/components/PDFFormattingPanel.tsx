import { usePDFFormatting } from '@/context/PDFFormattingContext'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RotateCcw, Type } from 'lucide-react'

export function PDFFormattingPanel() {
  const { settings, updateSettings, resetSettings } = usePDFFormatting()

  return (
    <div className="border-2 border-border rounded-lg p-4 space-y-4 bg-card/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-primary" />
          <h3 className="text-base font-bold text-primary">PDF Formatting</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetSettings}
          className="gap-2"
          title="Reset to defaults"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Customize how your text and borders appear in the generated PDF
      </p>

      <div className="space-y-4">
        {/* Font Family */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Font Family</Label>
          <Select
            value={settings.fontFamily}
            onValueChange={(value) => updateSettings({ fontFamily: value as any })}
          >
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Times-Roman">Times New Roman</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Courier">Courier</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Font Size (pt)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="6"
              max="20"
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
              className="h-10"
            />
            <span className="text-sm text-muted-foreground min-w-[30px]">{settings.fontSize}pt</span>
          </div>
        </div>

        {/* Text Color */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Text Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={settings.textColor}
              onChange={(e) => updateSettings({ textColor: e.target.value })}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={settings.textColor}
              onChange={(e) => updateSettings({ textColor: e.target.value })}
              placeholder="#000000"
              className="h-10 flex-1 font-mono text-sm"
            />
          </div>
        </div>

        {/* Bold Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Bold Text</Label>
          <Button
            variant={settings.isBold ? "default" : "outline"}
            size="sm"
            onClick={() => updateSettings({ isBold: !settings.isBold })}
            className="gap-2 font-bold"
          >
            <span className="font-bold">B</span>
            {settings.isBold ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Border Color */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Table Border Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={settings.borderColor}
              onChange={(e) => updateSettings({ borderColor: e.target.value })}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={settings.borderColor}
              onChange={(e) => updateSettings({ borderColor: e.target.value })}
              placeholder="#000000"
              className="h-10 flex-1 font-mono text-sm"
            />
          </div>
        </div>

        {/* Border Width */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Border Width (pt)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0.5"
              max="3"
              step="0.5"
              value={settings.borderWidth}
              onChange={(e) => updateSettings({ borderWidth: Number(e.target.value) })}
              className="h-10"
            />
            <span className="text-sm text-muted-foreground min-w-[30px]">{settings.borderWidth}pt</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <strong>Preview:</strong> Changes apply to new PDF generations
        </p>
      </div>
    </div>
  )
}
