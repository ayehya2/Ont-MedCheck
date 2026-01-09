import { cn } from '@/lib/utils'

export type FormTab = 1 | 2 | 3 | 4

interface TabBarProps {
  activeTab: FormTab
  onTabChange: (tab: FormTab) => void
}

const tabLabels: Record<FormTab, { title: string; subtitle: string }> = {
  1: { title: 'Form 1', subtitle: 'Healthcare Provider Notification' },
  2: { title: 'Form 2', subtitle: 'Patient Acknowledgement' },
  3: { title: 'Form 3', subtitle: 'Personal Medication Record' },
  4: { title: 'Form 4', subtitle: 'Pharmacist Worksheet' }
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="flex">
        {([1, 2, 3, 4] as FormTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "flex-1 py-2 px-3 text-center transition-all duration-200 border-b-2",
              "hover:bg-accent/50",
              activeTab === tab
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className={cn(
                "text-xs font-semibold",
                activeTab === tab ? "text-primary" : "text-foreground"
              )}>
                {tabLabels[tab].title}
              </span>
              <span className={cn(
                "text-[9px] hidden sm:block",
                activeTab === tab ? "text-primary/70" : "text-muted-foreground"
              )}>
                {tabLabels[tab].subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
