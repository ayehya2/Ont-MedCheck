import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, children, className = '' }: FormSectionProps) {
  return (
    <div className={`border-2 border-border rounded-lg p-5 space-y-4 bg-card/30 ${className}`}>
      <h3 className="text-base font-bold text-primary pb-2 border-b-2 border-border">
        {title}
      </h3>
      <div className="space-y-4">
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
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1 font-bold">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
