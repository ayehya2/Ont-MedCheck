import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormSection, FormRow, FormField } from './FormSection'
import { useFormData } from '@/context/FormDataContext'
import { Plus, Trash2 } from 'lucide-react'
import { createEmptyHealthcareProvider } from '@/types/forms'

export function HealthcareProviderSection() {
  const { data, updateField } = useFormData()
  const pcp = data.primaryCareProvider
  const specialists = data.specialists

  const addSpecialist = () => {
    updateField('specialists', [...specialists, createEmptyHealthcareProvider()])
  }

  const removeSpecialist = (index: number) => {
    updateField('specialists', specialists.filter((_, i) => i !== index))
  }

  const updateSpecialist = (index: number, field: string, value: string) => {
    const updated = [...specialists]
    updated[index] = { ...updated[index], [field]: value }
    updateField('specialists', updated)
  }

  return (
    <>
      <FormSection title="Primary Care Provider">
        <FormField label="Physician Name">
          <Input
            value={pcp.name}
            onChange={(e) => updateField('primaryCareProvider.name', e.target.value)}
            placeholder="Dr. Name"
          />
        </FormField>

        <FormRow>
          <FormField label="Phone">
            <Input
              type="tel"
              value={pcp.phone}
              onChange={(e) => updateField('primaryCareProvider.phone', e.target.value)}
              placeholder="(XXX) XXX-XXXX"
            />
          </FormField>
          <FormField label="Fax">
            <Input
              type="tel"
              value={pcp.fax}
              onChange={(e) => updateField('primaryCareProvider.fax', e.target.value)}
              placeholder="(XXX) XXX-XXXX"
            />
          </FormField>
        </FormRow>

        <FormField label="Address">
          <Input
            value={pcp.address}
            onChange={(e) => updateField('primaryCareProvider.address', e.target.value)}
            placeholder="Clinic address"
          />
        </FormField>
      </FormSection>

      <FormSection title="Specialists">
        {specialists.map((specialist, index) => (
          <div key={index} className="border border-border rounded-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Specialist {index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSpecialist(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <FormRow>
              <FormField label="Name">
                <Input
                  value={specialist.name}
                  onChange={(e) => updateSpecialist(index, 'name', e.target.value)}
                  placeholder="Dr. Name"
                />
              </FormField>
              <FormField label="Specialty">
                <Input
                  value={specialist.specialty}
                  onChange={(e) => updateSpecialist(index, 'specialty', e.target.value)}
                  placeholder="e.g., Cardiology"
                />
              </FormField>
            </FormRow>

            <FormRow>
              <FormField label="Phone">
                <Input
                  type="tel"
                  value={specialist.phone}
                  onChange={(e) => updateSpecialist(index, 'phone', e.target.value)}
                  placeholder="(XXX) XXX-XXXX"
                />
              </FormField>
              <FormField label="Fax">
                <Input
                  type="tel"
                  value={specialist.fax}
                  onChange={(e) => updateSpecialist(index, 'fax', e.target.value)}
                  placeholder="(XXX) XXX-XXXX"
                />
              </FormField>
            </FormRow>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addSpecialist}
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Specialist
        </Button>
      </FormSection>
    </>
  )
}
