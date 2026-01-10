import React from 'react'
import { useFormData } from '@/context/FormDataContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { PhoneInput } from '@/components/ui/phone-input'
import { SignaturePad } from '@/components/ui/signature-pad'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import { createEmptyForm3Medication, Form3Medication } from '@/types/forms'

// FormField component matching Form2 style
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

// FormSection component matching Form2 style
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

export function Form3Fields() {
  const { data, updateField } = useFormData()
  const form3 = data.form3

  const handleChange = (field: string, value: string | boolean) => {
    updateField(`form3.${field}`, value)
  }

  // Helper to get validation class for required fields - matching Form2
  const getValidationClass = (value: string, required: boolean) => {
    if (required && !value?.trim()) {
      return 'border-destructive focus-visible:ring-destructive'
    }
    return ''
  }

  const handleMedicationChange = (index: number, field: keyof Form3Medication, value: string) => {
    const medications = [...form3.medications]
    medications[index] = { ...medications[index], [field]: value }
    updateField('form3.medications', medications)
  }

  const addMedication = () => {
    const medications = [...form3.medications, createEmptyForm3Medication()]
    updateField('form3.medications', medications)
  }

  const removeMedication = (index: number) => {
    const medications = form3.medications?.filter((_: Form3Medication, i: number) => i !== index) || []
    updateField('form3.medications', medications)
  }

  // Initialize with 5 empty rows if none exist
  React.useEffect(() => {
    if (!form3.medications || form3.medications.length === 0) {
      const initialMeds = Array(5).fill(null).map(() => createEmptyForm3Medication())
      updateField('form3.medications', initialMeds)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-6 space-y-6 custom-scrollbar">
      {/* Form Title - matching Form2 style */}
      <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
        <h2 className="text-lg font-bold text-primary">Personal Medication Record</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Form 4968E - Ministry of Health and Long-Term Care
        </p>
      </div>

      {/* Service Info */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="MedsCheck Service Provided">
          <Select
            value={form3.serviceProvided}
            onValueChange={(value) => handleChange('serviceProvided', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">MedsCheck Annual</SelectItem>
              <SelectItem value="followup">MedsCheck Follow-up</SelectItem>
              <SelectItem value="diabetes_annual">MedsCheck for Diabetes Annual</SelectItem>
              <SelectItem value="diabetes_followup">Diabetes Education Follow-up</SelectItem>
              <SelectItem value="at_home">MedsCheck at Home</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Location (Pharmacy / Patient's Home)">
          <Input
            value={form3.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Enter location"
          />
        </FormField>
      </div>

      {/* Patient Information */}
      <FormSection title="Patient Information">
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Patient Last Name" required>
            <Input
              value={form3.patientLastName}
              onChange={(e) => handleChange('patientLastName', e.target.value)}
              className={getValidationClass(form3.patientLastName, true)}
            />
          </FormField>
          <FormField label="Patient First Name" required>
            <Input
              value={form3.patientFirstName}
              onChange={(e) => handleChange('patientFirstName', e.target.value)}
              className={getValidationClass(form3.patientFirstName, true)}
            />
          </FormField>
          <FormField label="Date of Birth (yyyy/mm/dd)" required>
            <Input
              type="date"
              value={form3.patientDOB}
              onChange={(e) => handleChange('patientDOB', e.target.value)}
              className={getValidationClass(form3.patientDOB, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="Unit Number">
            <Input
              value={form3.patientUnitNumber}
              onChange={(e) => handleChange('patientUnitNumber', e.target.value)}
            />
          </FormField>
          <FormField label="Street Number">
            <Input
              value={form3.patientStreetNumber}
              onChange={(e) => handleChange('patientStreetNumber', e.target.value)}
            />
          </FormField>
          <FormField label="Street Name">
            <Input
              value={form3.patientStreetName}
              onChange={(e) => handleChange('patientStreetName', e.target.value)}
            />
          </FormField>
          <FormField label="PO Box">
            <Input
              value={form3.patientPOBox}
              onChange={(e) => handleChange('patientPOBox', e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="City/Town">
            <Input
              value={form3.patientCity}
              onChange={(e) => handleChange('patientCity', e.target.value)}
            />
          </FormField>
          <FormField label="Province">
            <Input
              value={form3.patientProvince}
              onChange={(e) => handleChange('patientProvince', e.target.value)}
              placeholder="Ontario"
            />
          </FormField>
          <FormField label="Postal Code">
            <Input
              value={form3.patientPostalCode}
              onChange={(e) => handleChange('patientPostalCode', e.target.value)}
            />
          </FormField>
          <FormField label="Telephone Number">
            <PhoneInput
              value={form3.patientPhone}
              onChange={(value) => handleChange('patientPhone', value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Date of Interview (yyyy/mm/dd)">
            <Input
              type="date"
              value={form3.interviewDate}
              onChange={(e) => handleChange('interviewDate', e.target.value)}
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              type="email"
              value={form3.patientEmail}
              onChange={(e) => handleChange('patientEmail', e.target.value)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Caregiver/Contact */}
      <FormSection title="Sources Caregiver and/or Contact Name">
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Last Name">
            <Input
              value={form3.caregiverLastName}
              onChange={(e) => handleChange('caregiverLastName', e.target.value)}
            />
          </FormField>
          <FormField label="First Name">
            <Input
              value={form3.caregiverFirstName}
              onChange={(e) => handleChange('caregiverFirstName', e.target.value)}
            />
          </FormField>
          <FormField label="Telephone Number">
            <PhoneInput
              value={form3.caregiverPhone}
              onChange={(value) => handleChange('caregiverPhone', value)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Primary Care Provider */}
      <FormSection title="Primary Care Provider">
        <div className="grid grid-cols-4 gap-3">
          <FormField label="Last Name">
            <Input
              value={form3.providerLastName}
              onChange={(e) => handleChange('providerLastName', e.target.value)}
            />
          </FormField>
          <FormField label="First Name">
            <Input
              value={form3.providerFirstName}
              onChange={(e) => handleChange('providerFirstName', e.target.value)}
            />
          </FormField>
          <FormField label="Telephone Number">
            <PhoneInput
              value={form3.providerPhone}
              onChange={(value) => handleChange('providerPhone', value)}
            />
          </FormField>
          <FormField label="Fax Number">
            <PhoneInput
              value={form3.providerFax}
              onChange={(value) => handleChange('providerFax', value)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Medication Section */}
      <FormSection title="Current Medication List - Prescription, Non-Prescription, Natural Health Products">
        <FormField label="Known Allergies and/or Intolerances">
          <Textarea
            value={form3.allergies}
            onChange={(e) => handleChange('allergies', e.target.value)}
            rows={2}
          />
        </FormField>

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded">
          <Checkbox
            id="noNonPrescription"
            checked={form3.noNonPrescriptionProducts}
            onCheckedChange={(checked) => handleChange('noNonPrescriptionProducts', !!checked)}
          />
          <Label htmlFor="noNonPrescription" className="text-sm cursor-pointer">
            Select <strong>only</strong> if patient is <strong>not</strong> taking any non-prescription products (ie/ vitamins, natural health products, over-the-counter)
          </Label>
        </div>

        {/* Medication Table Header */}
        <div className="border border-border rounded-t overflow-hidden">
          <div className="grid grid-cols-4 bg-muted text-xs font-semibold">
            <div className="p-2 border-r border-border">
              <div className="text-primary">WHAT I TAKE</div>
              <div className="text-muted-foreground font-normal mt-0.5">Name, strength & form of medication</div>
            </div>
            <div className="p-2 border-r border-border">
              <div className="text-primary">WHY I TAKE IT</div>
              <div className="text-muted-foreground font-normal mt-0.5">Disease, condition or symptoms</div>
            </div>
            <div className="p-2 border-r border-border">
              <div className="text-primary">HOW I TAKE IT</div>
              <div className="text-muted-foreground font-normal mt-0.5">Qty, route, times per day</div>
            </div>
            <div className="p-2">
              <div className="text-primary">COMMENTS</div>
              <div className="text-muted-foreground font-normal mt-0.5">Special instructions, etc.</div>
            </div>
          </div>
        </div>

        {/* Medication Rows */}
        <div className="border-x border-b border-border rounded-b overflow-hidden">
          {form3.medications?.map((med: Form3Medication, index: number) => (
            <div key={med.id || index} className="grid grid-cols-4 border-b border-border last:border-b-0 group">
              <div className="p-1 border-r border-border">
                <Input
                  value={med.whatITake}
                  onChange={(e) => handleMedicationChange(index, 'whatITake', e.target.value)}
                  className="h-8 text-sm border-0 focus-visible:ring-1"
                  placeholder="Medication name..."
                />
              </div>
              <div className="p-1 border-r border-border">
                <Input
                  value={med.whyITakeIt}
                  onChange={(e) => handleMedicationChange(index, 'whyITakeIt', e.target.value)}
                  className="h-8 text-sm border-0 focus-visible:ring-1"
                  placeholder="Purpose..."
                />
              </div>
              <div className="p-1 border-r border-border">
                <Input
                  value={med.howITakeIt}
                  onChange={(e) => handleMedicationChange(index, 'howITakeIt', e.target.value)}
                  className="h-8 text-sm border-0 focus-visible:ring-1"
                  placeholder="Dosage..."
                />
              </div>
              <div className="p-1 flex items-center gap-1">
                <Input
                  value={med.comments}
                  onChange={(e) => handleMedicationChange(index, 'comments', e.target.value)}
                  className="h-8 text-sm border-0 focus-visible:ring-1 flex-1"
                  placeholder="Comments..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  onClick={() => removeMedication(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={addMedication} className="gap-2">
          <Plus className="h-4 w-4" /> Add Medication Row
        </Button>
      </FormSection>

      {/* Pharmacy Information */}
      <FormSection title="Pharmacy Information">
        <FormField label="Pharmacy Name (and/or Logo/Label) and Address">
          <Textarea
            value={form3.pharmacyNameAddress}
            onChange={(e) => handleChange('pharmacyNameAddress', e.target.value)}
            rows={2}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Pharmacy Telephone Number">
            <PhoneInput
              value={form3.pharmacyPhone}
              onChange={(value) => handleChange('pharmacyPhone', value)}
            />
          </FormField>
          <FormField label="Pharmacy Fax Number">
            <PhoneInput
              value={form3.pharmacyFax}
              onChange={(value) => handleChange('pharmacyFax', value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="MedsCheck Pharmacist Name">
            <Input
              value={form3.pharmacistName}
              onChange={(e) => handleChange('pharmacistName', e.target.value)}
            />
          </FormField>
          <FormField label="Date MedsCheck Report Completed">
            <Input
              type="date"
              value={form3.dateCompleted}
              onChange={(e) => handleChange('dateCompleted', e.target.value)}
            />
          </FormField>
        </div>
        <div className="mt-4">
          <SignaturePad
            value={form3.pharmacistSignature}
            onChange={(signature) => handleChange('pharmacistSignature', signature)}
            label="Pharmacist's Signature"
          />
        </div>
      </FormSection>
    </div>
  )
}


