/**
 * Phone number formatting utilities
 * Automatically formats phone numbers to (XXX) XXX-XXXX format
 */

/**
 * Format a phone number string as user types
 * Converts "1234567890" to "(123) 456-7890"
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')
  
  // Limit to 10 digits
  const trimmed = digits.slice(0, 10)
  
  // Format based on length
  if (trimmed.length === 0) {
    return ''
  } else if (trimmed.length <= 3) {
    return `(${trimmed}`
  } else if (trimmed.length <= 6) {
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`
  } else {
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`
  }
}

/**
 * Get raw digits from formatted phone number
 */
export function getPhoneDigits(formatted: string): string {
  return formatted.replace(/\D/g, '')
}

/**
 * Check if phone number is complete (10 digits)
 */
export function isPhoneComplete(value: string): boolean {
  return getPhoneDigits(value).length === 10
}

/**
 * Format phone for display - handles partial and complete numbers
 */
export function displayPhoneNumber(value: string): string {
  if (!value) return ''
  // If already formatted, return as-is
  if (value.includes('(') || value.includes('-')) {
    return value
  }
  return formatPhoneNumber(value)
}
