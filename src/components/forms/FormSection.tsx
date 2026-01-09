import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, children, className = '' }: FormSectionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-primary border-b border-border pb-1.5 mb-2">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

interface FormRowProps {
  children: ReactNode
  className?: string
}

export function FormRow({ children, className = '' }: FormRowProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      {children}
    </div>
  )
}

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className = '' }: FormFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-xs font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
