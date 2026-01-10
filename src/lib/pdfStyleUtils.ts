import { StyleSheet } from '@react-pdf/renderer'
import { PDFFormattingSettings } from '@/context/PDFFormattingContext'

export function createPDFStyles(settings: PDFFormattingSettings) {
  return StyleSheet.create({
    text: {
      fontFamily: settings.fontFamily,
      fontSize: settings.fontSize,
      color: settings.textColor,
      fontWeight: settings.isBold ? 'bold' : 'normal',
    },
    border: {
      borderWidth: settings.borderWidth,
      borderColor: settings.borderColor,
      borderStyle: 'solid',
    },
  })
}

export function getTextStyle(settings: PDFFormattingSettings, additionalStyles: any = {}) {
  return {
    fontFamily: settings.fontFamily,
    fontSize: settings.fontSize,
    color: settings.textColor,
    fontWeight: settings.isBold ? 'bold' : 'normal',
    ...additionalStyles,
  }
}

export function getBorderStyle(settings: PDFFormattingSettings) {
  return {
    borderWidth: settings.borderWidth,
    borderColor: settings.borderColor,
    borderStyle: 'solid' as const,
  }
}
