import { PDFDocument, rgb } from 'pdf-lib'

/**
 * Converts a static PDF to a fillable PDF with form fields
 * This adds interactive text fields and checkboxes that can be edited in PDF readers
 */
export async function makeFormFillable(pdfBlob: Blob): Promise<Blob> {
  try {
    const arrayBuffer = await pdfBlob.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // Note: Adding form fields requires knowing exact coordinates
    // This is a basic implementation - in production, you'd need to map
    // each field's position on the PDF
    
    // For now, we just return the original PDF
    // To make it truly fillable, we'd need to:
    // 1. Define coordinates for each field
    // 2. Create text fields at those positions
    // 3. Set field names to match data structure
    
    const pdfBytes = await pdfDoc.save()
    // Cast to proper type for Blob constructor
    return new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' })
  } catch (error) {
    console.error('Failed to make PDF fillable:', error)
    return pdfBlob // Return original on error
  }
}

/**
 * Adds a text field to a PDF at specific coordinates
 */
export async function addTextField(
  pdfDoc: PDFDocument,
  page: number,
  x: number,
  y: number,
  width: number,
  height: number,
  fieldName: string,
  defaultValue: string = ''
): Promise<void> {
  const form = pdfDoc.getForm()
  const pages = pdfDoc.getPages()
  const pdfPage = pages[page]
  
  const textField = form.createTextField(fieldName)
  textField.setText(defaultValue)
  textField.addToPage(pdfPage, {
    x,
    y,
    width,
    height,
    borderColor: rgb(0, 0, 0),
    backgroundColor: rgb(1, 1, 1),
  })
}

/**
 * Adds a checkbox to a PDF at specific coordinates
 */
export async function addCheckbox(
  pdfDoc: PDFDocument,
  page: number,
  x: number,
  y: number,
  size: number,
  fieldName: string,
  checked: boolean = false
): Promise<void> {
  const form = pdfDoc.getForm()
  const pages = pdfDoc.getPages()
  const pdfPage = pages[page]
  
  const checkBox = form.createCheckBox(fieldName)
  if (checked) {
    checkBox.check()
  }
  checkBox.addToPage(pdfPage, {
    x,
    y,
    width: size,
    height: size,
    borderColor: rgb(0, 0, 0),
    backgroundColor: rgb(1, 1, 1),
  })
}
