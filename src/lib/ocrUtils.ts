import { createWorker } from 'tesseract.js'

/**
 * Extracts text from an image using Tesseract OCR
 * Supports patient profile documents, prescription images, medical records, etc.
 */
export async function extractTextFromImage(
  imageFile: File | Blob | string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(Math.round(m.progress * 100))
        }
      }
    })
    
    const result = await worker.recognize(imageFile)
    await worker.terminate()
    
    return result.data.text
  } catch (error) {
    console.error('OCR extraction failed:', error)
    throw new Error('Failed to extract text from image')
  }
}

/**
 * Extracts text from multiple images and combines them
 */
export async function extractTextFromMultipleImages(
  images: (File | Blob | string)[],
  onProgress?: (overallProgress: number) => void
): Promise<string> {
  const texts: string[] = []
  
  for (let i = 0; i < images.length; i++) {
    const text = await extractTextFromImage(images[i], (progress) => {
      if (onProgress) {
        const overallProgress = ((i + progress / 100) / images.length) * 100
        onProgress(Math.round(overallProgress))
      }
    })
    texts.push(text)
  }
  
  return texts.join('\n\n--- Next Document ---\n\n')
}

/**
 * Preprocesses image for better OCR accuracy
 * Can be extended with image enhancement techniques
 */
export function preprocessImage(imageFile: File): Promise<File> {
  // For now, return as-is
  // Future enhancements: contrast adjustment, noise reduction, deskewing
  return Promise.resolve(imageFile)
}
