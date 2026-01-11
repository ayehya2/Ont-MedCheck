import { ContinuousFormView, FormSection } from './ContinuousFormView'

interface LeftPanelProps {
  onVisibleSectionChange: (section: FormSection) => void
}

export function LeftPanel({ onVisibleSectionChange }: LeftPanelProps) {
  return (
    <ContinuousFormView onVisibleSectionChange={onVisibleSectionChange} />
  )
}
