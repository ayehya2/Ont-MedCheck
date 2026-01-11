import { useEffect, useRef, useCallback } from 'react'
import { Form1Fields } from './forms/Form1Fields'
import { Form2Fields } from './forms/Form2Fields'
import { Form3Fields } from './forms/Form3Fields'
import { Form4Fields } from './forms/Form4Fields'

export type FormSection = 1 | 2 | 3 | 4

interface ContinuousFormViewProps {
  onVisibleSectionChange: (section: FormSection) => void
}

const formSections = [
  { id: 1 as FormSection, title: 'Form 1: Healthcare Provider Notification', component: Form1Fields },
  { id: 2 as FormSection, title: 'Form 2: Patient Acknowledgement', component: Form2Fields },
  { id: 3 as FormSection, title: 'Form 3: Personal Medication Record', component: Form3Fields },
  { id: 4 as FormSection, title: 'Form 4: Pharmacist Worksheet', component: Form4Fields },
]

export function ContinuousFormView({ onVisibleSectionChange }: ContinuousFormViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<FormSection, HTMLDivElement>>(new Map())

  // Set up IntersectionObserver to detect which section is most visible
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observerOptions: IntersectionObserverInit = {
      root: container,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in top 20-40% of viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
    }

    const visibilityMap = new Map<FormSection, number>()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = Number(entry.target.getAttribute('data-section-id')) as FormSection
        if (sectionId) {
          visibilityMap.set(sectionId, entry.intersectionRatio)
        }
      })

      // Find the section with highest visibility
      let maxVisibility = 0
      let mostVisibleSection: FormSection = 1

      visibilityMap.forEach((ratio, sectionId) => {
        if (ratio > maxVisibility) {
          maxVisibility = ratio
          mostVisibleSection = sectionId
        }
      })

      // Also check if any section header is near the top
      sectionRefs.current.forEach((element, sectionId) => {
        const rect = element.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const relativeTop = rect.top - containerRect.top
        
        // If section header is within top 150px of container, prioritize it
        if (relativeTop >= 0 && relativeTop < 150) {
          mostVisibleSection = sectionId
        }
      })

      onVisibleSectionChange(mostVisibleSection)
    }, observerOptions)

    // Observe all sections
    sectionRefs.current.forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [onVisibleSectionChange])

  const setSectionRef = useCallback((id: FormSection) => (el: HTMLDivElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto custom-scrollbar bg-background/50"
    >
      {formSections.map((section, index) => {
        const FormComponent = section.component
        return (
          <div
            key={section.id}
            ref={setSectionRef(section.id)}
            data-section-id={section.id}
            className="relative"
          >
            {/* Section Header */}
            <div className={`sticky top-0 z-10 bg-primary text-primary-foreground px-4 py-3 shadow-md ${index > 0 ? 'mt-6' : ''}`}>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            
            {/* Form Content */}
            <div className="p-0">
              <FormComponent />
            </div>
          </div>
        )
      })}
      
      {/* Bottom padding for better scrolling */}
      <div className="h-24" />
    </div>
  )
}
