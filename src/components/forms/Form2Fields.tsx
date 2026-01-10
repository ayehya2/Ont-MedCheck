import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { SignaturePad } from '@/components/ui/signature-pad'
import { useFormData } from '@/context/FormDataContext'

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">
        {label}
        {required && <span className="text-destructive ml-1 font-bold">*</span>}
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
    <div className="border-2 border-border rounded-lg p-5 space-y-4 bg-card/30">
      <h3 className="text-base font-bold text-primary pb-2 border-b-2 border-border">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

export function Form2Fields() {
  const { data, updateField } = useFormData()
  const form2 = data.form2

  // Helper to get validation class for required fields
  const getValidationClass = (value: string, required: boolean) => {
    if (required && (!value || !value.trim())) {
      return 'border-destructive focus-visible:ring-destructive'
    }
    return ''
  }

  return (
    <div className="p-6 space-y-6 custom-scrollbar">
      {/* Form Title */}
      <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
        <h2 className="text-lg font-bold text-primary">
          Form 2: MedsCheck Patient Acknowledgement of Professional Pharmacy Service
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          To be completed annually for MedsCheck Professional Pharmacy Services. Please provide a copy to the patient and/or patient's agent.
        </p>
      </div>

      {/* Section 1: Patient Information */}
      <FormSection title="Patient Information">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Last Name" required>
            <Input
              value={form2.patientLastName}
              onChange={(e) => updateField('form2.patientLastName', e.target.value)}
              placeholder="Last name"
              className={getValidationClass(form2.patientLastName, true)}
            />
          </FormField>
          <FormField label="First Name" required>
            <Input
              value={form2.patientFirstName}
              onChange={(e) => updateField('form2.patientFirstName', e.target.value)}
              placeholder="First name"
              className={getValidationClass(form2.patientFirstName, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="Unit Number">
            <Input
              value={form2.patientUnitNumber}
              onChange={(e) => updateField('form2.patientUnitNumber', e.target.value)}
              placeholder="Unit #"
            />
          </FormField>
          <FormField label="Street Number" required>
            <Input
              value={form2.patientStreetNumber}
              onChange={(e) => updateField('form2.patientStreetNumber', e.target.value)}
              placeholder="Street #"
              className={getValidationClass(form2.patientStreetNumber, true)}
            />
          </FormField>
          <FormField label="Street Name" required>
            <Input
              value={form2.patientStreetName}
              onChange={(e) => updateField('form2.patientStreetName', e.target.value)}
              placeholder="Street name"
              className={getValidationClass(form2.patientStreetName, true)}
            />
          </FormField>
          <FormField label="PO Box">
            <Input
              value={form2.patientPOBox}
              onChange={(e) => updateField('form2.patientPOBox', e.target.value)}
              placeholder="PO Box"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="City/Town" required>
            <Input
              value={form2.patientCity}
              onChange={(e) => updateField('form2.patientCity', e.target.value)}
              placeholder="City/Town"
              className={getValidationClass(form2.patientCity, true)}
            />
          </FormField>
          <FormField label="Province" required>
            <Input
              value={form2.patientProvince}
              onChange={(e) => updateField('form2.patientProvince', e.target.value)}
              placeholder="Province"
              className={getValidationClass(form2.patientProvince, true)}
            />
          </FormField>
          <FormField label="Postal Code" required>
            <Input
              value={form2.patientPostalCode}
              onChange={(e) => updateField('form2.patientPostalCode', e.target.value)}
              placeholder="A1A 1A1"
              className={getValidationClass(form2.patientPostalCode, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Telephone Number">
            <PhoneInput
              value={form2.patientPhone}
              onChange={(value) => updateField('form2.patientPhone', value)}
            />
          </FormField>
          <FormField label="Email Address (if available)">
            <Input
              type="email"
              value={form2.patientEmail}
              onChange={(e) => updateField('form2.patientEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
        </div>
      </FormSection>

      {/* Section 2: Pharmacy Information */}
      <FormSection title="Pharmacy Information">
        <FormField label="Pharmacy Name" required>
          <Input
            value={form2.pharmacyName}
            onChange={(e) => updateField('form2.pharmacyName', e.target.value)}
            placeholder="Pharmacy name"
            className={getValidationClass(form2.pharmacyName, true)}
          />
        </FormField>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="Unit Number">
            <Input
              value={form2.pharmacyUnitNumber}
              onChange={(e) => updateField('form2.pharmacyUnitNumber', e.target.value)}
              placeholder="Unit #"
            />
          </FormField>
          <FormField label="Street Number" required>
            <Input
              value={form2.pharmacyStreetNumber}
              onChange={(e) => updateField('form2.pharmacyStreetNumber', e.target.value)}
              placeholder="Street #"
              className={getValidationClass(form2.pharmacyStreetNumber, true)}
            />
          </FormField>
          <FormField label="Street Name" required>
            <Input
              value={form2.pharmacyStreetName}
              onChange={(e) => updateField('form2.pharmacyStreetName', e.target.value)}
              placeholder="Street name"
              className={getValidationClass(form2.pharmacyStreetName, true)}
            />
          </FormField>
          <FormField label="PO Box">
            <Input
              value={form2.pharmacyPOBox}
              onChange={(e) => updateField('form2.pharmacyPOBox', e.target.value)}
              placeholder="PO Box"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="City/Town" required>
            <Input
              value={form2.pharmacyCity}
              onChange={(e) => updateField('form2.pharmacyCity', e.target.value)}
              placeholder="City/Town"
              className={getValidationClass(form2.pharmacyCity, true)}
            />
          </FormField>
          <FormField label="Province" required>
            <Input
              value={form2.pharmacyProvince}
              onChange={(e) => updateField('form2.pharmacyProvince', e.target.value)}
              placeholder="Province"
              className={getValidationClass(form2.pharmacyProvince, true)}
            />
          </FormField>
          <FormField label="Postal Code" required>
            <Input
              value={form2.pharmacyPostalCode}
              onChange={(e) => updateField('form2.pharmacyPostalCode', e.target.value)}
              placeholder="A1A 1A1"
              className={getValidationClass(form2.pharmacyPostalCode, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Telephone Number">
            <PhoneInput
              value={form2.pharmacyPhone}
              onChange={(value) => updateField('form2.pharmacyPhone', value)}
            />
          </FormField>
          <FormField label="Fax Number">
            <PhoneInput
              value={form2.pharmacyFax}
              onChange={(value) => updateField('form2.pharmacyFax', value)}
            />
          </FormField>
          <FormField label="Email Address (if available)">
            <Input
              type="email"
              value={form2.pharmacyEmail}
              onChange={(e) => updateField('form2.pharmacyEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
        </div>
      </FormSection>

      {/* Section 3: Service Type */}
      <FormSection title="MedsCheck Service Type">
        <p className="text-sm text-muted-foreground mb-3">
          Professional Pharmacy Services may include: <span className="text-destructive">*</span>
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="serviceType"
              value="annual"
              checked={form2.serviceType === 'annual'}
              onChange={(e) => updateField('form2.serviceType', e.target.value)}
            />
            <span className="text-sm font-medium">MedsCheck Annual</span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="serviceType"
              value="followup"
              checked={form2.serviceType === 'followup'}
              onChange={(e) => updateField('form2.serviceType', e.target.value)}
            />
            <span className="text-sm font-medium">MedsCheck Follow-up</span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="serviceType"
              value="diabetes"
              checked={form2.serviceType === 'diabetes'}
              onChange={(e) => updateField('form2.serviceType', e.target.value)}
            />
            <span className="text-sm font-medium">MedsCheck for Diabetes Annual</span>
          </label>

          <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="serviceType"
              value="diabetes_followup"
              checked={form2.serviceType === 'diabetes_followup'}
              onChange={(e) => updateField('form2.serviceType', e.target.value)}
            />
            <span className="text-sm font-medium">Diabetes Education Follow-up</span>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
            <input
              type="radio"
              name="serviceType"
              value="at_home"
              checked={form2.serviceType === 'at_home'}
              onChange={(e) => updateField('form2.serviceType', e.target.value)}
              className="mt-0.5"
            />
            <div className="text-sm">
              <span className="font-medium">MedsCheck at Home</span>
              <p className="text-muted-foreground mt-1">
                (also includes a medication cabinet clean-up and pharmacist disposal of unused medication from the patient's home with the patient's understanding)
              </p>
            </div>
          </label>
        </div>
      </FormSection>

      {/* Section 4: Patient Acknowledgement Signature */}
      <FormSection title="Patient Acknowledgement">
        <p className="text-sm text-muted-foreground mb-4">
          By signing this form, you are acknowledging participation in an in-person MedsCheck medication review with a pharmacist associated with the pharmacy noted above. It may be necessary for the pharmacist to discuss and share your health information with other health care professionals (e.g., physicians, nurses, etc.) in accordance with generally accepted medication therapy management principles.
        </p>

        <div className="space-y-4">
          <SignaturePad
            value={form2.patientSignature}
            onChange={(signature) => updateField('form2.patientSignature', signature)}
            label="Patient/Agent Signature"
            required
          />
          <FormField label="Date (yyyy/mm/dd)" required>
            <Input
              type="date"
              value={form2.signatureDate}
              onChange={(e) => updateField('form2.signatureDate', e.target.value)}
              className={getValidationClass(form2.signatureDate, true)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Section 5: Comments */}
      <FormSection title="Comments">
        <FormField label="Comments">
          <Textarea
            value={form2.comments}
            onChange={(e) => updateField('form2.comments', e.target.value)}
            placeholder="Additional comments..."
            className="min-h-[100px] resize-y"
          />
        </FormField>
      </FormSection>
    </div>
  )
}


