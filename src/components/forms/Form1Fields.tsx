import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { useFormData } from '@/context/FormDataContext'
import { useEffect } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  )
}

interface FormSectionProps {
  title: string
  children: React.ReactNode
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-primary border-b border-border pb-1.5">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

export function Form1Fields() {
  const { data, updateField } = useFormData()
  const form1 = data.form1

  // Debug: Log form1 data whenever it changes
  useEffect(() => {
    console.log('📋 Form1Fields component - Current form1 data:', form1)
  }, [form1])

  // Helper to get validation class
  const getValidationClass = (value: string, required: boolean) => {
    if (required && !value.trim()) {
      return 'border-destructive focus-visible:ring-destructive'
    }
    return ''
  }

  return (
    <div className="p-4 space-y-4 custom-scrollbar">
      {/* Form Title */}
      <div className="bg-primary/10 rounded-lg p-3">
        <h2 className="text-base font-bold text-primary">
          Form 1: Healthcare Provider Notification of MedsCheck Services
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Complete this form to notify the patient's healthcare provider about the MedsCheck consultation.
        </p>
      </div>

      {/* Section 1: Recipient Information */}
      <FormSection title="Recipient Information">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="To">
            <Input
              value={form1.to}
              onChange={(e) => updateField('form1.to', e.target.value)}
              placeholder="Recipient name"
              className="h-8 text-sm"
            />
          </FormField>
          <FormField label="Fax Number">
            <PhoneInput
              value={form1.faxNumber}
              onChange={(value) => updateField('form1.faxNumber', value)}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Telephone Number">
            <PhoneInput
              value={form1.telephoneNumber}
              onChange={(value) => updateField('form1.telephoneNumber', value)}
            />
          </FormField>
          <FormField label="Pages">
            <Input
              value={form1.pages}
              onChange={(e) => updateField('form1.pages', e.target.value)}
              placeholder="Number of pages"
            />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Email Address">
            <Input
              type="email"
              value={form1.emailAddress}
              onChange={(e) => updateField('form1.emailAddress', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
          <FormField label="Date (yyyy/mm/dd)">
            <Input
              type="date"
              value={form1.date}
              onChange={(e) => updateField('form1.date', e.target.value)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Section 2: Patient Information */}
      <FormSection title="Re: Patient Information">
        <FormField label="Patient's Name" required>
          <Input
            value={form1.patientName}
            onChange={(e) => updateField('form1.patientName', e.target.value)}
            placeholder="Patient's full name"
            className={getValidationClass(form1.patientName, true)}
          />
        </FormField>
        <FormField label="Patient's Address">
          <Input
            value={form1.patientAddress}
            onChange={(e) => updateField('form1.patientAddress', e.target.value)}
            placeholder="Street address, City, Province, Postal Code"
          />
        </FormField>
        <FormField label="Telephone Number">
          <PhoneInput
            value={form1.patientPhone}
            onChange={(value) => updateField('form1.patientPhone', value)}
          />
        </FormField>
      </FormSection>

      {/* Section 3: MedsCheck Date */}
      <FormSection title="MedsCheck Completion">
        <FormField label="Date MedsCheck Completed (yyyy/mm/dd)" required>
          <Input
            type="date"
            value={form1.medsCheckDate}
            onChange={(e) => updateField('form1.medsCheckDate', e.target.value)}
            className={getValidationClass(form1.medsCheckDate, true)}
          />
        </FormField>
      </FormSection>

      {/* Section 4: Follow-up Status */}
      <FormSection title="Follow-up Status">
        <p className="text-sm text-muted-foreground mb-3">Please take note of the following:</p>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="followUpStatus"
              value="no_issues"
              checked={form1.followUpStatus === 'no_issues'}
              onChange={(e) => updateField('form1.followUpStatus', e.target.value)}
              className="mt-0.5"
            />
            <div className="text-sm">
              <span className="font-medium">No follow-up issues have been identified at this time.</span>
              <p className="text-muted-foreground mt-1">
                The MedsCheck Personal Medication Record is an accurate assessment of the patient's prescription, non-prescription and natural health product usage at this current moment.
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="followUpStatus"
              value="issues_identified"
              checked={form1.followUpStatus === 'issues_identified'}
              onChange={(e) => updateField('form1.followUpStatus', e.target.value)}
              className="mt-0.5"
            />
            <div className="text-sm">
              <span className="font-medium">Follow-up issues have been identified with this MedsCheck review.</span>
              <p className="text-muted-foreground mt-1">
                They have been summarized and are attached with this fax transmission.
              </p>
            </div>
          </label>
        </div>
      </FormSection>

      {/* Section 5: Issues */}
      <FormSection title="Issues">
        <FormField label="Issues">
          <Textarea
            value={form1.issues}
            onChange={(e) => updateField('form1.issues', e.target.value)}
            placeholder="Describe any issues identified during the MedsCheck review..."
            className="min-h-[150px] resize-y"
          />
        </FormField>
      </FormSection>

      {/* Section 6: Pharmacist Information */}
      <FormSection title="Pharmacist Information">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Pharmacist Name" required>
            <Input
              value={form1.pharmacistName}
              onChange={(e) => updateField('form1.pharmacistName', e.target.value)}
              placeholder="Pharmacist's full name"
              className={getValidationClass(form1.pharmacistName, true)}
            />
          </FormField>
          <FormField label="Pharmacist's Signature">
            <Input
              value={form1.pharmacistSignature}
              onChange={(e) => updateField('form1.pharmacistSignature', e.target.value)}
              placeholder="Type name as signature"
            />
          </FormField>
        </div>
      </FormSection>
    </div>
  )
}
