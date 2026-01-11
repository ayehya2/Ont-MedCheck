import { UnifiedFormFields } from './forms/UnifiedFormFields'

export type FormSection = 1 | 2 | 3 | 4 | 5 | 6

export function ContinuousFormView() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-background/50">
      <UnifiedFormFields />
    </div>
  )
}
