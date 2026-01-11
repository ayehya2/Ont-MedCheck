import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { SignaturePad } from '@/components/ui/signature-pad'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useFormData } from '@/context/FormDataContext'
import { 
  createEmptyForm3Medication, 
  createEmptyForm5Discussion,
  createEmptyForm5Goal,
  createEmptyForm5Action,
  createEmptyForm5Resource,
  createEmptyForm5Referral
} from '@/types/forms'
import { useState } from 'react'

// Reusable FormField component
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

// Reusable FormSection component with collapsible feature
interface FormSectionProps {
  title: string
  children: React.ReactNode
  defaultCollapsed?: boolean
  badge?: string
}

function FormSection({ title, children, defaultCollapsed = false, badge }: FormSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <div className="border-2 border-border rounded-lg bg-card/30">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-primary">{title}</h3>
          {badge && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        {isCollapsed ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      
      {!isCollapsed && (
        <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}

// Helper to get validation class
const getValidationClass = (value: string, required: boolean) => {
  if (required && (!value || !value.trim())) {
    return 'border-destructive focus-visible:ring-destructive'
  }
  return ''
}

export function UnifiedFormFields() {
  const { data, updateField } = useFormData()

  // Helper to update shared patient data (syncs to all forms automatically via context)
  const updateSharedPatient = (field: string, value: string) => {
    updateField(`patient.${field}`, value)
  }

  // Helper to update shared pharmacy data
  const updateSharedPharmacy = (field: string, value: string) => {
    updateField(`pharmacy.${field}`, value)
  }

  return (
    <div className="p-6 space-y-6 custom-scrollbar">
      {/* Page Title */}
      <div className="border-2 border-primary rounded-lg p-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <h1 className="text-2xl font-bold text-primary mb-2">
          MedsCheck Forms - Unified Entry
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter information once in the shared sections below. It will automatically populate across all 4 forms and PDFs.
        </p>
        <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-md">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✓ No more duplicate data entry - Patient, Pharmacy, and Provider info entered once
          </p>
        </div>
      </div>

      {/* SHARED SECTION: Patient Information */}
      <FormSection title="📋 Shared: Patient Information" badge="Fills all forms">
        <p className="text-xs text-muted-foreground mb-3">
          This information will automatically populate patient fields in Forms 1, 2, 3, and 4
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First Name" required>
            <Input
              value={data.patient.firstName}
              onChange={(e) => updateSharedPatient('firstName', e.target.value)}
              placeholder="Patient's first name"
              className={getValidationClass(data.patient.firstName, true)}
            />
          </FormField>
          <FormField label="Last Name" required>
            <Input
              value={data.patient.lastName}
              onChange={(e) => updateSharedPatient('lastName', e.target.value)}
              placeholder="Patient's last name"
              className={getValidationClass(data.patient.lastName, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Date of Birth (yyyy/mm/dd)" required>
            <Input
              type="date"
              value={data.patient.dateOfBirth}
              onChange={(e) => updateSharedPatient('dateOfBirth', e.target.value)}
              className={getValidationClass(data.patient.dateOfBirth, true)}
            />
          </FormField>
          <FormField label="Health Card Number">
            <Input
              value={data.patient.healthCardNumber}
              onChange={(e) => updateSharedPatient('healthCardNumber', e.target.value)}
              placeholder="Health card #"
            />
          </FormField>
          <FormField label="Gender">
            <Select 
              value={data.patient.gender} 
              onValueChange={(v) => updateSharedPatient('gender', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="Unit Number">
            <Input
              value={data.form2.patientUnitNumber}
              onChange={(e) => updateField('form2.patientUnitNumber', e.target.value)}
              placeholder="Unit #"
            />
          </FormField>
          <FormField label="Street Number" required>
            <Input
              value={data.form2.patientStreetNumber}
              onChange={(e) => updateField('form2.patientStreetNumber', e.target.value)}
              placeholder="Street #"
              className={getValidationClass(data.form2.patientStreetNumber, true)}
            />
          </FormField>
          <FormField label="Street Name" required>
            <Input
              value={data.form2.patientStreetName}
              onChange={(e) => updateField('form2.patientStreetName', e.target.value)}
              placeholder="Street name"
              className={getValidationClass(data.form2.patientStreetName, true)}
            />
          </FormField>
          <FormField label="PO Box">
            <Input
              value={data.form2.patientPOBox}
              onChange={(e) => updateField('form2.patientPOBox', e.target.value)}
              placeholder="PO Box"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="City/Town" required>
            <Input
              value={data.patient.city}
              onChange={(e) => updateSharedPatient('city', e.target.value)}
              placeholder="City/Town"
              className={getValidationClass(data.patient.city, true)}
            />
          </FormField>
          <FormField label="Province" required>
            <Input
              value={data.patient.province}
              onChange={(e) => updateSharedPatient('province', e.target.value)}
              placeholder="Province"
              className={getValidationClass(data.patient.province, true)}
            />
          </FormField>
          <FormField label="Postal Code" required>
            <Input
              value={data.patient.postalCode}
              onChange={(e) => updateSharedPatient('postalCode', e.target.value)}
              placeholder="A1A 1A1"
              className={getValidationClass(data.patient.postalCode, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Telephone Number">
            <PhoneInput
              value={data.patient.phone}
              onChange={(value) => updateSharedPatient('phone', value)}
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              type="email"
              value={data.patient.email}
              onChange={(e) => updateSharedPatient('email', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
        </div>
      </FormSection>

      {/* SHARED SECTION: Pharmacy Information */}
      <FormSection title="🏥 Shared: Pharmacy Information" badge="Fills all forms">
        <p className="text-xs text-muted-foreground mb-3">
          This information will automatically populate pharmacy fields in Forms 2, 3, and 4
        </p>
        
        <FormField label="Pharmacy Name" required>
          <Input
            value={data.pharmacy.name}
            onChange={(e) => updateSharedPharmacy('name', e.target.value)}
            placeholder="Pharmacy name"
            className={getValidationClass(data.pharmacy.name, true)}
          />
        </FormField>

        <div className="grid grid-cols-4 gap-3">
          <FormField label="Unit Number">
            <Input
              value={data.form2.pharmacyUnitNumber}
              onChange={(e) => updateField('form2.pharmacyUnitNumber', e.target.value)}
              placeholder="Unit #"
            />
          </FormField>
          <FormField label="Street Number" required>
            <Input
              value={data.form2.pharmacyStreetNumber}
              onChange={(e) => updateField('form2.pharmacyStreetNumber', e.target.value)}
              placeholder="Street #"
              className={getValidationClass(data.form2.pharmacyStreetNumber, true)}
            />
          </FormField>
          <FormField label="Street Name" required>
            <Input
              value={data.form2.pharmacyStreetName}
              onChange={(e) => updateField('form2.pharmacyStreetName', e.target.value)}
              placeholder="Street name"
              className={getValidationClass(data.form2.pharmacyStreetName, true)}
            />
          </FormField>
          <FormField label="PO Box">
            <Input
              value={data.form2.pharmacyPOBox}
              onChange={(e) => updateField('form2.pharmacyPOBox', e.target.value)}
              placeholder="PO Box"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="City/Town" required>
            <Input
              value={data.form2.pharmacyCity}
              onChange={(e) => updateField('form2.pharmacyCity', e.target.value)}
              placeholder="City/Town"
              className={getValidationClass(data.form2.pharmacyCity, true)}
            />
          </FormField>
          <FormField label="Province" required>
            <Input
              value={data.form2.pharmacyProvince}
              onChange={(e) => updateField('form2.pharmacyProvince', e.target.value)}
              placeholder="Province"
              className={getValidationClass(data.form2.pharmacyProvince, true)}
            />
          </FormField>
          <FormField label="Postal Code" required>
            <Input
              value={data.form2.pharmacyPostalCode}
              onChange={(e) => updateField('form2.pharmacyPostalCode', e.target.value)}
              placeholder="A1A 1A1"
              className={getValidationClass(data.form2.pharmacyPostalCode, true)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Telephone Number">
            <PhoneInput
              value={data.pharmacy.phone}
              onChange={(value) => updateSharedPharmacy('phone', value)}
            />
          </FormField>
          <FormField label="Fax Number">
            <PhoneInput
              value={data.pharmacy.fax}
              onChange={(value) => updateSharedPharmacy('fax', value)}
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              type="email"
              value={data.form2.pharmacyEmail}
              onChange={(e) => updateField('form2.pharmacyEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
        </div>

        <FormField label="Pharmacist Name" required>
          <Input
            value={data.pharmacy.pharmacistName}
            onChange={(e) => updateSharedPharmacy('pharmacistName', e.target.value)}
            placeholder="Pharmacist's full name"
            className={getValidationClass(data.pharmacy.pharmacistName, true)}
          />
        </FormField>
      </FormSection>

      {/* SHARED SECTION: Primary Care Provider */}
      <FormSection title="👨‍⚕️ Shared: Primary Care Provider" badge="Fills all forms">
        <p className="text-xs text-muted-foreground mb-3">
          This information will automatically populate provider fields in Forms 3 and 4
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Last Name">
            <Input
              value={data.form3.providerLastName}
              onChange={(e) => updateField('form3.providerLastName', e.target.value)}
              placeholder="Provider's last name"
            />
          </FormField>
          <FormField label="First Name">
            <Input
              value={data.form3.providerFirstName}
              onChange={(e) => updateField('form3.providerFirstName', e.target.value)}
              placeholder="Provider's first name"
            />
          </FormField>
          <FormField label="Designation (Form 4 only)">
            <Input
              value={data.form4.providerDesignation}
              onChange={(e) => updateField('form4.providerDesignation', e.target.value)}
              placeholder="MD, NP, etc."
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Telephone Number">
            <PhoneInput
              value={data.form3.providerPhone}
              onChange={(value) => updateField('form3.providerPhone', value)}
            />
          </FormField>
          <FormField label="Fax Number">
            <PhoneInput
              value={data.form3.providerFax}
              onChange={(value) => updateField('form3.providerFax', value)}
            />
          </FormField>
          <FormField label="Email Address (Form 4 only)">
            <Input
              type="email"
              value={data.form4.providerEmail}
              onChange={(e) => updateField('form4.providerEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
        </div>
      </FormSection>

      {/* SHARED SECTION: Caregiver/Contact */}
      <FormSection title="👥 Shared: Caregiver / Patient's Agent" badge="Fills Forms 3 & 4" defaultCollapsed>
        <p className="text-xs text-muted-foreground mb-3">
          Optional - Enter if patient has a caregiver or authorized agent
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Last Name">
            <Input
              value={data.form3.caregiverLastName}
              onChange={(e) => updateField('form3.caregiverLastName', e.target.value)}
              placeholder="Caregiver's last name"
            />
          </FormField>
          <FormField label="First Name">
            <Input
              value={data.form3.caregiverFirstName}
              onChange={(e) => updateField('form3.caregiverFirstName', e.target.value)}
              placeholder="Caregiver's first name"
            />
          </FormField>
          <FormField label="Telephone Number">
            <PhoneInput
              value={data.form3.caregiverPhone}
              onChange={(value) => updateField('form3.caregiverPhone', value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Email Address (Form 4 only)">
            <Input
              type="email"
              value={data.form4.caregiverEmail}
              onChange={(e) => updateField('form4.caregiverEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
          <FormField label="Notes (Form 4 only)">
            <Textarea
              value={data.form4.caregiverNotes}
              onChange={(e) => updateField('form4.caregiverNotes', e.target.value)}
              placeholder="Additional caregiver notes..."
              rows={3}
            />
          </FormField>
        </div>
      </FormSection>

      {/* FORM 1 SPECIFIC FIELDS */}
      <FormSection title="📄 Form 1: Healthcare Provider Notification" defaultCollapsed>
        <p className="text-xs text-muted-foreground mb-3">
          Fields specific to Form 1 - Notification to Healthcare Provider
        </p>

        {/* Recipient Information */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Recipient Information</h4>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="To">
              <Input
                value={data.form1.to}
                onChange={(e) => updateField('form1.to', e.target.value)}
                placeholder="Recipient name"
              />
            </FormField>
            <FormField label="Fax Number">
              <PhoneInput
                value={data.form1.faxNumber}
                onChange={(value) => updateField('form1.faxNumber', value)}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FormField label="Telephone Number">
              <PhoneInput
                value={data.form1.telephoneNumber}
                onChange={(value) => updateField('form1.telephoneNumber', value)}
              />
            </FormField>
            <FormField label="Pages">
              <Input
                value={data.form1.pages}
                onChange={(e) => updateField('form1.pages', e.target.value)}
                placeholder="Number of pages"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FormField label="Email Address">
              <Input
                type="email"
                value={data.form1.emailAddress}
                onChange={(e) => updateField('form1.emailAddress', e.target.value)}
                placeholder="email@example.com"
              />
            </FormField>
            <FormField label="Date (yyyy/mm/dd)">
              <Input
                type="date"
                value={data.form1.date}
                onChange={(e) => updateField('form1.date', e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* MedsCheck Completion Date */}
        <FormField label="MedsCheck Completion Date (yyyy/mm/dd)" required>
          <Input
            type="date"
            value={data.form1.medsCheckDate}
            onChange={(e) => updateField('form1.medsCheckDate', e.target.value)}
            className={getValidationClass(data.form1.medsCheckDate, true)}
          />
        </FormField>

        {/* Follow-up Status */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Follow-up Status</h4>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="followUpStatus"
                value="no_issues"
                checked={data.form1.followUpStatus === 'no_issues'}
                onChange={(e) => updateField('form1.followUpStatus', e.target.value)}
                className="mt-0.5"
              />
              <div className="text-sm">
                <span className="font-medium">No follow-up issues identified</span>
                <p className="text-muted-foreground mt-1">
                  The MedsCheck Personal Medication Record is accurate.
                </p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="followUpStatus"
                value="issues_identified"
                checked={data.form1.followUpStatus === 'issues_identified'}
                onChange={(e) => updateField('form1.followUpStatus', e.target.value)}
                className="mt-0.5"
              />
              <div className="text-sm">
                <span className="font-medium">Follow-up issues identified</span>
                <p className="text-muted-foreground mt-1">
                  Issues are summarized and attached with this fax.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Issues */}
        <FormField label="Issues Identified">
          <Textarea
            value={data.form1.issues}
            onChange={(e) => updateField('form1.issues', e.target.value)}
            placeholder="Describe any issues identified during the MedsCheck review..."
            rows={4}
          />
        </FormField>

        {/* Pharmacist Signature */}
        <SignaturePad
          value={data.form1.pharmacistSignature}
          onChange={(signature) => updateField('form1.pharmacistSignature', signature)}
          label="Pharmacist's Signature"
        />
      </FormSection>

      {/* FORM 2 SPECIFIC FIELDS */}
      <FormSection title="📝 Form 2: Patient Acknowledgement" defaultCollapsed>
        <p className="text-xs text-muted-foreground mb-3">
          Fields specific to Form 2 - Patient Acknowledgement of Service
        </p>

        {/* Service Type */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">MedsCheck Service Type <span className="text-destructive">*</span></h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="serviceType"
                value="annual"
                checked={data.form2.serviceType === 'annual'}
                onChange={(e) => updateField('form2.serviceType', e.target.value)}
              />
              <span className="text-sm font-medium">MedsCheck Annual</span>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="serviceType"
                value="followup"
                checked={data.form2.serviceType === 'followup'}
                onChange={(e) => updateField('form2.serviceType', e.target.value)}
              />
              <span className="text-sm font-medium">MedsCheck Follow-up</span>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="serviceType"
                value="diabetes"
                checked={data.form2.serviceType === 'diabetes'}
                onChange={(e) => updateField('form2.serviceType', e.target.value)}
              />
              <span className="text-sm font-medium">MedsCheck for Diabetes Annual</span>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="serviceType"
                value="diabetes_followup"
                checked={data.form2.serviceType === 'diabetes_followup'}
                onChange={(e) => updateField('form2.serviceType', e.target.value)}
              />
              <span className="text-sm font-medium">Diabetes Education Follow-up</span>
            </label>

            <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
              <input
                type="radio"
                name="serviceType"
                value="at_home"
                checked={data.form2.serviceType === 'at_home'}
                onChange={(e) => updateField('form2.serviceType', e.target.value)}
                className="mt-0.5"
              />
              <div className="text-sm">
                <span className="font-medium">MedsCheck at Home</span>
                <p className="text-muted-foreground mt-1">
                  (includes medication cabinet clean-up and disposal)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Patient Acknowledgement */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-2">Patient Acknowledgement</h4>
          <p className="text-xs text-muted-foreground mb-4">
            By signing, patient acknowledges participation and information sharing with healthcare providers.
          </p>
          
          <SignaturePad
            value={data.form2.patientSignature}
            onChange={(signature) => updateField('form2.patientSignature', signature)}
            label="Patient/Agent Signature"
            required
          />

          <FormField label="Signature Date (yyyy/mm/dd)" required>
            <Input
              type="date"
              value={data.form2.signatureDate}
              onChange={(e) => updateField('form2.signatureDate', e.target.value)}
              className={getValidationClass(data.form2.signatureDate, true)}
            />
          </FormField>
        </div>

        {/* Comments */}
        <FormField label="Comments">
          <Textarea
            value={data.form2.comments}
            onChange={(e) => updateField('form2.comments', e.target.value)}
            placeholder="Additional comments..."
            rows={4}
          />
        </FormField>
      </FormSection>

      {/* FORM 3 SPECIFIC FIELDS */}
      <FormSection title="💊 Form 3: Personal Medication Record" defaultCollapsed>
        <p className="text-xs text-muted-foreground mb-3">
          Fields specific to Form 3 - Personal Medication Record
        </p>

        {/* Service Info */}
        <div className="grid grid-cols-2 gap-3">
          <FormField label="MedsCheck Service Provided">
            <Select
              value={data.form3.serviceProvided}
              onValueChange={(value) => updateField('form3.serviceProvided', value)}
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
              value={data.form3.location}
              onChange={(e) => updateField('form3.location', e.target.value)}
              placeholder="Enter location"
            />
          </FormField>
        </div>

        <FormField label="Date of Interview (yyyy/mm/dd)">
          <Input
            type="date"
            value={data.form3.interviewDate}
            onChange={(e) => updateField('form3.interviewDate', e.target.value)}
          />
        </FormField>

        {/* Allergies */}
        <FormField label="Known Allergies and/or Intolerances">
          <Textarea
            value={data.form3.allergies}
            onChange={(e) => updateField('form3.allergies', e.target.value)}
            rows={2}
            placeholder="List any known allergies..."
          />
        </FormField>

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded">
          <Checkbox
            id="noNonPrescription"
            checked={data.form3.noNonPrescriptionProducts}
            onCheckedChange={(checked) => updateField('form3.noNonPrescriptionProducts', !!checked)}
          />
          <Label htmlFor="noNonPrescription" className="text-sm cursor-pointer">
            Select <strong>only</strong> if patient is <strong>not</strong> taking any non-prescription products
          </Label>
        </div>

        {/* Medication Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 bg-muted text-xs font-semibold p-2">
            <div className="p-2">WHAT I TAKE</div>
            <div className="p-2">WHY I TAKE IT</div>
            <div className="p-2">HOW I TAKE IT</div>
            <div className="p-2">COMMENTS</div>
          </div>
          {data.form3.medications?.map((med, index) => (
            <div key={med.id || index} className="grid grid-cols-4 border-t border-border group">
              <Input
                value={med.whatITake}
                onChange={(e) => {
                  const meds = [...data.form3.medications]
                  meds[index] = { ...med, whatITake: e.target.value }
                  updateField('form3.medications', meds)
                }}
                className="h-10 text-sm border-0 rounded-none"
                placeholder="Medication..."
              />
              <Input
                value={med.whyITakeIt}
                onChange={(e) => {
                  const meds = [...data.form3.medications]
                  meds[index] = { ...med, whyITakeIt: e.target.value }
                  updateField('form3.medications', meds)
                }}
                className="h-10 text-sm border-0 border-l rounded-none"
                placeholder="Purpose..."
              />
              <Input
                value={med.howITakeIt}
                onChange={(e) => {
                  const meds = [...data.form3.medications]
                  meds[index] = { ...med, howITakeIt: e.target.value }
                  updateField('form3.medications', meds)
                }}
                className="h-10 text-sm border-0 border-l rounded-none"
                placeholder="Dosage..."
              />
              <div className="flex items-center border-l">
                <Input
                  value={med.comments}
                  onChange={(e) => {
                    const meds = [...data.form3.medications]
                    meds[index] = { ...med, comments: e.target.value }
                    updateField('form3.medications', meds)
                  }}
                  className="h-10 text-sm border-0 rounded-none flex-1"
                  placeholder="Comments..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  onClick={() => {
                    const meds = data.form3.medications.filter((_, i) => i !== index)
                    updateField('form3.medications', meds)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const meds = [...data.form3.medications, createEmptyForm3Medication()]
            updateField('form3.medications', meds)
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Add Medication Row
        </Button>

        <FormField label="Date MedsCheck Report Completed (yyyy/mm/dd)">
          <Input
            type="date"
            value={data.form3.dateCompleted}
            onChange={(e) => updateField('form3.dateCompleted', e.target.value)}
          />
        </FormField>

        <SignaturePad
          value={data.form3.pharmacistSignature}
          onChange={(signature) => updateField('form3.pharmacistSignature', signature)}
          label="Pharmacist's Signature"
        />
      </FormSection>

      {/* FORM 4 SPECIFIC FIELDS */}
      <FormSection title="📊 Form 4: Pharmacist Worksheet" defaultCollapsed>
        <p className="text-xs text-muted-foreground mb-3">
          Form 4 specific fields - Additional patient demographics
        </p>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Health Card Number" required>
            <Input
              value={data.form4.patientHealthCardNumber}
              onChange={(e) => updateField('form4.patientHealthCardNumber', e.target.value)}
              placeholder="Health card #"
              className={getValidationClass(data.form4.patientHealthCardNumber, true)}
            />
          </FormField>
          <FormField label="Date Patient Signed Acknowledgement (yyyy/mm/dd)">
            <Input
              type="date"
              value={data.form4.patientAcknowledgementDate}
              onChange={(e) => updateField('form4.patientAcknowledgementDate', e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="MedsCheck Service Type" required>
          <Select 
            value={data.form4.serviceProvided} 
            onValueChange={(v) => updateField('form4.serviceProvided', v)}
          >
            <SelectTrigger className={getValidationClass(data.form4.serviceProvided, true)}>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">MedsCheck Annual</SelectItem>
              <SelectItem value="followup">MedsCheck Follow-up</SelectItem>
              <SelectItem value="diabetes_annual">MedsCheck for Diabetes Annual</SelectItem>
              <SelectItem value="diabetes_followup">MedsCheck for Diabetes Follow-up</SelectItem>
              <SelectItem value="at_home">MedsCheck at Home</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {/* Interview Location - Complete with address details */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Interview Conducted At</h4>
          
          {/* Pharmacy Option with full address */}
          <div className="border border-border rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <Checkbox
                id="interviewPharmacy"
                checked={data.form4.interviewLocation === 'pharmacy'}
                onCheckedChange={(c) => updateField('form4.interviewLocation', c ? 'pharmacy' : '')}
              />
              <Label htmlFor="interviewPharmacy" className="cursor-pointer font-medium">Pharmacy</Label>
            </div>
            {data.form4.interviewLocation === 'pharmacy' && (
              <div className="space-y-3 ml-6 p-3 bg-muted/50 rounded">
                <FormField label="Pharmacy Name">
                  <Input
                    value={data.form4.pharmacyName}
                    onChange={(e) => updateField('form4.pharmacyName', e.target.value)}
                  />
                </FormField>
                <div className="grid grid-cols-4 gap-3">
                  <FormField label="Unit Number">
                    <Input
                      value={data.form4.pharmacyUnitNumber}
                      onChange={(e) => updateField('form4.pharmacyUnitNumber', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Street Number">
                    <Input
                      value={data.form4.pharmacyStreetNumber}
                      onChange={(e) => updateField('form4.pharmacyStreetNumber', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Street Name">
                    <Input
                      value={data.form4.pharmacyStreetName}
                      onChange={(e) => updateField('form4.pharmacyStreetName', e.target.value)}
                    />
                  </FormField>
                  <FormField label="PO Box">
                    <Input
                      value={data.form4.pharmacyPOBox}
                      onChange={(e) => updateField('form4.pharmacyPOBox', e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="City/Town">
                    <Input
                      value={data.form4.pharmacyCity}
                      onChange={(e) => updateField('form4.pharmacyCity', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Province">
                    <Input
                      value={data.form4.pharmacyProvince}
                      onChange={(e) => updateField('form4.pharmacyProvince', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Postal Code">
                    <Input
                      value={data.form4.pharmacyPostalCode}
                      onChange={(e) => updateField('form4.pharmacyPostalCode', e.target.value)}
                      placeholder="A1A 1A1"
                    />
                  </FormField>
                </div>
              </div>
            )}
          </div>

          {/* Patient's Home Option with full address */}
          <div className="border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-3">
              <Checkbox
                id="interviewHome"
                checked={data.form4.interviewLocation === 'home'}
                onCheckedChange={(c) => updateField('form4.interviewLocation', c ? 'home' : '')}
              />
              <Label htmlFor="interviewHome" className="cursor-pointer font-medium">Patient's Home</Label>
            </div>
            {data.form4.interviewLocation === 'home' && (
              <div className="space-y-3 ml-6 p-3 bg-muted/50 rounded">
                <div className="grid grid-cols-4 gap-3">
                  <FormField label="Unit Number">
                    <Input
                      value={data.form4.homeUnitNumber}
                      onChange={(e) => updateField('form4.homeUnitNumber', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Street Number">
                    <Input
                      value={data.form4.homeStreetNumber}
                      onChange={(e) => updateField('form4.homeStreetNumber', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Street Name">
                    <Input
                      value={data.form4.homeStreetName}
                      onChange={(e) => updateField('form4.homeStreetName', e.target.value)}
                    />
                  </FormField>
                  <FormField label="PO Box">
                    <Input
                      value={data.form4.homePOBox}
                      onChange={(e) => updateField('form4.homePOBox', e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="City/Town">
                    <Input
                      value={data.form4.homeCity}
                      onChange={(e) => updateField('form4.homeCity', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Province">
                    <Input
                      value={data.form4.homeProvince}
                      onChange={(e) => updateField('form4.homeProvince', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Postal Code">
                    <Input
                      value={data.form4.homePostalCode}
                      onChange={(e) => updateField('form4.homePostalCode', e.target.value)}
                      placeholder="A1A 1A1"
                    />
                  </FormField>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Patient Demographics - Form 4 specific fields */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Additional Form 4 Patient Details</h4>
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Patient Last Name">
              <Input
                value={data.form4.patientLastName}
                onChange={(e) => updateField('form4.patientLastName', e.target.value)}
                placeholder="Last name"
              />
            </FormField>
            <FormField label="Patient First Name">
              <Input
                value={data.form4.patientFirstName}
                onChange={(e) => updateField('form4.patientFirstName', e.target.value)}
                placeholder="First name"
              />
            </FormField>
            <FormField label="Patient Gender">
              <Select value={data.form4.patientGender} onValueChange={(v) => updateField('form4.patientGender', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FormField label="Patient DOB (yyyy/mm/dd)">
              <Input
                type="date"
                value={data.form4.patientDOB}
                onChange={(e) => updateField('form4.patientDOB', e.target.value)}
              />
            </FormField>
            <FormField label="Patient Phone">
              <PhoneInput
                value={data.form4.patientPhone}
                onChange={(value) => updateField('form4.patientPhone', value)}
              />
            </FormField>
          </div>
        </div>

        {/* Patient Address - Form 4 specific */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Patient Address Details</h4>
          <div className="grid grid-cols-4 gap-3">
            <FormField label="Unit Number">
              <Input
                value={data.form4.patientUnitNumber}
                onChange={(e) => updateField('form4.patientUnitNumber', e.target.value)}
              />
            </FormField>
            <FormField label="Street Number">
              <Input
                value={data.form4.patientStreetNumber}
                onChange={(e) => updateField('form4.patientStreetNumber', e.target.value)}
              />
            </FormField>
            <FormField label="Street Name">
              <Input
                value={data.form4.patientStreetName}
                onChange={(e) => updateField('form4.patientStreetName', e.target.value)}
              />
            </FormField>
            <FormField label="PO Box">
              <Input
                value={data.form4.patientPOBox}
                onChange={(e) => updateField('form4.patientPOBox', e.target.value)}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            <FormField label="City/Town">
              <Input
                value={data.form4.patientCity}
                onChange={(e) => updateField('form4.patientCity', e.target.value)}
              />
            </FormField>
            <FormField label="Province">
              <Input
                value={data.form4.patientProvince}
                onChange={(e) => updateField('form4.patientProvince', e.target.value)}
              />
            </FormField>
            <FormField label="Postal Code">
              <Input
                value={data.form4.patientPostalCode}
                onChange={(e) => updateField('form4.patientPostalCode', e.target.value)}
                placeholder="A1A 1A1"
              />
            </FormField>
            <FormField label="Email Address">
              <Input
                type="email"
                value={data.form4.patientEmail}
                onChange={(e) => updateField('form4.patientEmail', e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Caregiver Information - Form 4 specific fields */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Caregiver/Patient's Agent Information</h4>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Caregiver Last Name">
              <Input
                value={data.form4.caregiverLastName}
                onChange={(e) => updateField('form4.caregiverLastName', e.target.value)}
              />
            </FormField>
            <FormField label="Caregiver First Name">
              <Input
                value={data.form4.caregiverFirstName}
                onChange={(e) => updateField('form4.caregiverFirstName', e.target.value)}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FormField label="Caregiver Phone">
              <PhoneInput
                value={data.form4.caregiverPhone}
                onChange={(value) => updateField('form4.caregiverPhone', value)}
              />
            </FormField>
            <FormField label="Caregiver Email">
              <Input
                type="email"
                value={data.form4.caregiverEmail}
                onChange={(e) => updateField('form4.caregiverEmail', e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Caregiver Notes">
            <Textarea
              value={data.form4.caregiverNotes}
              onChange={(e) => updateField('form4.caregiverNotes', e.target.value)}
              rows={3}
            />
          </FormField>
        </div>

        {/* Primary Care Provider - Form 4 specific */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Primary Care Provider Information</h4>
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Provider Last Name">
              <Input
                value={data.form4.providerLastName}
                onChange={(e) => updateField('form4.providerLastName', e.target.value)}
              />
            </FormField>
            <FormField label="Provider First Name">
              <Input
                value={data.form4.providerFirstName}
                onChange={(e) => updateField('form4.providerFirstName', e.target.value)}
              />
            </FormField>
            <FormField label="Designation">
              <Input
                value={data.form4.providerDesignation}
                onChange={(e) => updateField('form4.providerDesignation', e.target.value)}
                placeholder="MD, NP, etc."
              />
            </FormField>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <FormField label="Provider Phone">
              <PhoneInput
                value={data.form4.providerPhone}
                onChange={(value) => updateField('form4.providerPhone', value)}
              />
            </FormField>
            <FormField label="Provider Fax">
              <PhoneInput
                value={data.form4.providerFax}
                onChange={(value) => updateField('form4.providerFax', value)}
              />
            </FormField>
            <FormField label="Provider Email">
              <Input
                type="email"
                value={data.form4.providerEmail}
                onChange={(e) => updateField('form4.providerEmail', e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Known Allergies */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Known Allergies and Intolerances</h4>
          <div className="flex items-center gap-2 mb-2">
            <Checkbox
              id="noKnownAllergies"
              checked={data.form4.noKnownAllergies}
              onCheckedChange={(c) => updateField('form4.noKnownAllergies', !!c)}
            />
            <Label htmlFor="noKnownAllergies">Select if there are no known allergies or intolerances</Label>
          </div>
          {!data.form4.noKnownAllergies && (
            <Textarea
              value={data.form4.knownAllergies}
              onChange={(e) => updateField('form4.knownAllergies', e.target.value)}
              placeholder="List known allergies and intolerances..."
              rows={3}
            />
          )}
        </div>

        {/* Part 2: Lifestyle Information - Complete Section */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">Lifestyle Information</h4>

          {/* Tobacco */}
          <div className="border border-border rounded-lg p-3 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="tobacco"
                checked={data.form4.tobacco}
                onCheckedChange={(c) => updateField('form4.tobacco', !!c)}
              />
              <Label htmlFor="tobacco" className="cursor-pointer font-medium">Tobacco</Label>
            </div>
            {data.form4.tobacco && (
              <div className="ml-6 space-y-3 p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="tobaccoYes"
                      checked={data.form4.tobaccoYesNo === 'yes'}
                      onCheckedChange={(c) => updateField('form4.tobaccoYesNo', c ? 'yes' : '')}
                    />
                    <Label htmlFor="tobaccoYes" className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="tobaccoNo"
                      checked={data.form4.tobaccoYesNo === 'no'}
                      onCheckedChange={(c) => updateField('form4.tobaccoYesNo', c ? 'no' : '')}
                    />
                    <Label htmlFor="tobaccoNo" className="text-sm">No</Label>
                  </div>
                </div>
                <FormField label="Cigarettes per day">
                  <Input
                    value={data.form4.tobaccoCigPerDay}
                    onChange={(e) => updateField('form4.tobaccoCigPerDay', e.target.value)}
                    placeholder="Number of cigarettes per day"
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Smoking Cessation */}
          <div className="border border-border rounded-lg p-3 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="smokingCessation"
                checked={data.form4.smokingCessation}
                onCheckedChange={(c) => updateField('form4.smokingCessation', !!c)}
              />
              <Label htmlFor="smokingCessation" className="cursor-pointer font-medium">Smoking Cessation status</Label>
            </div>
            {data.form4.smokingCessation && (
              <div className="ml-6 p-3 bg-muted/50 rounded">
                <FormField label="Smoking Cessation Status">
                  <Textarea
                    value={data.form4.smokingCessationStatus}
                    onChange={(e) => updateField('form4.smokingCessationStatus', e.target.value)}
                    placeholder="Describe smoking cessation status..."
                    rows={2}
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Recreational Drug Use */}
          <div className="border border-border rounded-lg p-3 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="recreationalDrugUse"
                checked={data.form4.recreationalDrugUse}
                onCheckedChange={(c) => updateField('form4.recreationalDrugUse', !!c)}
              />
              <Label htmlFor="recreationalDrugUse" className="cursor-pointer font-medium">Recreational Drug Use</Label>
            </div>
            {data.form4.recreationalDrugUse && (
              <div className="ml-6 space-y-3 p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="recreationalDrugYes"
                      checked={data.form4.recreationalDrugYesNo === 'yes'}
                      onCheckedChange={(c) => updateField('form4.recreationalDrugYesNo', c ? 'yes' : '')}
                    />
                    <Label htmlFor="recreationalDrugYes" className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="recreationalDrugNo"
                      checked={data.form4.recreationalDrugYesNo === 'no'}
                      onCheckedChange={(c) => updateField('form4.recreationalDrugYesNo', c ? 'no' : '')}
                    />
                    <Label htmlFor="recreationalDrugNo" className="text-sm">No</Label>
                  </div>
                </div>
                <FormField label="Frequency">
                  <Input
                    value={data.form4.recreationalDrugFrequency}
                    onChange={(e) => updateField('form4.recreationalDrugFrequency', e.target.value)}
                    placeholder="How often?"
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Alcohol Use */}
          <div className="border border-border rounded-lg p-3 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="alcoholUse"
                checked={data.form4.alcoholUse}
                onCheckedChange={(c) => updateField('form4.alcoholUse', !!c)}
              />
              <Label htmlFor="alcoholUse" className="cursor-pointer font-medium">Alcohol Use</Label>
            </div>
            {data.form4.alcoholUse && (
              <div className="ml-6 space-y-3 p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="alcoholYes"
                      checked={data.form4.alcoholYesNo === 'yes'}
                      onCheckedChange={(c) => updateField('form4.alcoholYesNo', c ? 'yes' : '')}
                    />
                    <Label htmlFor="alcoholYes" className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="alcoholNo"
                      checked={data.form4.alcoholYesNo === 'no'}
                      onCheckedChange={(c) => updateField('form4.alcoholYesNo', c ? 'no' : '')}
                    />
                    <Label htmlFor="alcoholNo" className="text-sm">No</Label>
                  </div>
                </div>
                <FormField label="Frequency">
                  <Input
                    value={data.form4.alcoholFrequency}
                    onChange={(e) => updateField('form4.alcoholFrequency', e.target.value)}
                    placeholder="How often?"
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Exercise Regimen */}
          <div className="border border-border rounded-lg p-3 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="exerciseRegimen"
                checked={data.form4.exerciseRegimen}
                onCheckedChange={(c) => updateField('form4.exerciseRegimen', !!c)}
              />
              <Label htmlFor="exerciseRegimen" className="cursor-pointer font-medium">Exercise Regimen</Label>
            </div>
            {data.form4.exerciseRegimen && (
              <div className="ml-6 p-3 bg-muted/50 rounded">
                <FormField label="Exercise Details">
                  <Textarea
                    value={data.form4.exerciseRegimenDetails}
                    onChange={(e) => updateField('form4.exerciseRegimenDetails', e.target.value)}
                    placeholder="Describe exercise regimen..."
                    rows={2}
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Other Lifestyle */}
          <div className="border border-border rounded-lg p-3 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="lifestyleOther"
                checked={data.form4.lifestyleOther}
                onCheckedChange={(c) => updateField('form4.lifestyleOther', !!c)}
              />
              <Label htmlFor="lifestyleOther" className="cursor-pointer font-medium">Other (Specify)</Label>
            </div>
            {data.form4.lifestyleOther && (
              <div className="ml-6 p-3 bg-muted/50 rounded">
                <FormField label="Other Lifestyle Details">
                  <Textarea
                    value={data.form4.lifestyleOtherDetails}
                    onChange={(e) => updateField('form4.lifestyleOtherDetails', e.target.value)}
                    placeholder="Specify other lifestyle factors..."
                    rows={2}
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Lifestyle Notes */}
          <FormField label="Lifestyle Information (notes)">
            <Textarea
              value={data.form4.lifestyleNotes}
              onChange={(e) => updateField('form4.lifestyleNotes', e.target.value)}
              rows={4}
              placeholder="Document lifestyle factors..."
            />
          </FormField>

          {/* Clinical Need */}
          <FormField label="Clinical Need for Service (notes)" required>
            <Textarea
              value={data.form4.clinicalNeedNotes}
              onChange={(e) => updateField('form4.clinicalNeedNotes', e.target.value)}
              rows={4}
              placeholder="Why are you conducting this MedsCheck service?"
              className={getValidationClass(data.form4.clinicalNeedNotes, true)}
            />
          </FormField>
        </div>

        {/* Patient Characteristics - Complete detailed version */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mt-6">
          <h4 className="text-sm font-semibold mb-3">Patient Characteristics Contributing to the Need for the MedsCheck Service</h4>
          <p className="text-xs text-muted-foreground mb-3">(Select all that apply)</p>
          
          <div className="space-y-3">
            {/* 3 or more chronic medications */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="char3OrMoreMeds"
                  checked={data.form4.char3OrMoreMeds}
                  onCheckedChange={(c) => updateField('form4.char3OrMoreMeds', !!c)}
                />
                <Label htmlFor="char3OrMoreMeds" className="cursor-pointer text-sm font-medium">3 or more chronic medications</Label>
              </div>
              {data.form4.char3OrMoreMeds && (
                <Textarea
                  value={data.form4.char3OrMoreMedsDetails}
                  onChange={(e) => updateField('form4.char3OrMoreMedsDetails', e.target.value)}
                  placeholder="Details about chronic medications..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Multiple conditions */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charMultipleConditions"
                  checked={data.form4.charMultipleConditions}
                  onCheckedChange={(c) => updateField('form4.charMultipleConditions', !!c)}
                />
                <Label htmlFor="charMultipleConditions" className="cursor-pointer text-sm font-medium">Multiple acute conditions and/or one or more chronic diseases</Label>
              </div>
              {data.form4.charMultipleConditions && (
                <Textarea
                  value={data.form4.charMultipleConditionsDetails}
                  onChange={(e) => updateField('form4.charMultipleConditionsDetails', e.target.value)}
                  placeholder="Details about conditions..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Non-prescription medications */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charNonPrescriptionMeds"
                  checked={data.form4.charNonPrescriptionMeds}
                  onCheckedChange={(c) => updateField('form4.charNonPrescriptionMeds', !!c)}
                />
                <Label htmlFor="charNonPrescriptionMeds" className="cursor-pointer text-sm font-medium">Medication regimen that includes one or more non prescription medications</Label>
              </div>
              {data.form4.charNonPrescriptionMeds && (
                <Textarea
                  value={data.form4.charNonPrescriptionMedsDetails}
                  onChange={(e) => updateField('form4.charNonPrescriptionMedsDetails', e.target.value)}
                  placeholder="Details about non-prescription medications..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Natural health products */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charNaturalHealthProducts"
                  checked={data.form4.charNaturalHealthProducts}
                  onCheckedChange={(c) => updateField('form4.charNaturalHealthProducts', !!c)}
                />
                <Label htmlFor="charNaturalHealthProducts" className="cursor-pointer text-sm font-medium">Medication regimen that includes one or more natural health products</Label>
              </div>
              {data.form4.charNaturalHealthProducts && (
                <Textarea
                  value={data.form4.charNaturalHealthProductsDetails}
                  onChange={(e) => updateField('form4.charNaturalHealthProductsDetails', e.target.value)}
                  placeholder="Details about natural health products..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Unaddressed symptoms */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charUnaddressedSymptoms"
                  checked={data.form4.charUnaddressedSymptoms}
                  onCheckedChange={(c) => updateField('form4.charUnaddressedSymptoms', !!c)}
                />
                <Label htmlFor="charUnaddressedSymptoms" className="cursor-pointer text-sm font-medium">Symptoms that seem unaddressed by current pharmacotherapy</Label>
              </div>
              {data.form4.charUnaddressedSymptoms && (
                <Textarea
                  value={data.form4.charUnaddressedSymptomsDetails}
                  onChange={(e) => updateField('form4.charUnaddressedSymptomsDetails', e.target.value)}
                  placeholder="Details about unaddressed symptoms..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Potential drug problem */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charPotentialDrugProblem"
                  checked={data.form4.charPotentialDrugProblem}
                  onCheckedChange={(c) => updateField('form4.charPotentialDrugProblem', !!c)}
                />
                <Label htmlFor="charPotentialDrugProblem" className="cursor-pointer text-sm font-medium">Potential drug therapy problem that may be prevented</Label>
              </div>
              {data.form4.charPotentialDrugProblem && (
                <Textarea
                  value={data.form4.charPotentialDrugProblemDetails}
                  onChange={(e) => updateField('form4.charPotentialDrugProblemDetails', e.target.value)}
                  placeholder="Details about potential drug problems..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Multiple prescribers */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charMultiplePrescribers"
                  checked={data.form4.charMultiplePrescribers}
                  onCheckedChange={(c) => updateField('form4.charMultiplePrescribers', !!c)}
                />
                <Label htmlFor="charMultiplePrescribers" className="cursor-pointer text-sm font-medium">Multiple prescribers</Label>
              </div>
              {data.form4.charMultiplePrescribers && (
                <Textarea
                  value={data.form4.charMultiplePrescribersDetails}
                  onChange={(e) => updateField('form4.charMultiplePrescribersDetails', e.target.value)}
                  placeholder="Details about multiple prescribers..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Early/late refills */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charEarlyLateRefills"
                  checked={data.form4.charEarlyLateRefills}
                  onCheckedChange={(c) => updateField('form4.charEarlyLateRefills', !!c)}
                />
                <Label htmlFor="charEarlyLateRefills" className="cursor-pointer text-sm font-medium">Issues relating to early and/or late refills</Label>
              </div>
              {data.form4.charEarlyLateRefills && (
                <Textarea
                  value={data.form4.charEarlyLateRefillsDetails}
                  onChange={(e) => updateField('form4.charEarlyLateRefillsDetails', e.target.value)}
                  placeholder="Details about refill issues..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Non-adherence */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charNonAdherence"
                  checked={data.form4.charNonAdherence}
                  onCheckedChange={(c) => updateField('form4.charNonAdherence', !!c)}
                />
                <Label htmlFor="charNonAdherence" className="cursor-pointer text-sm font-medium">Non-adherence</Label>
              </div>
              {data.form4.charNonAdherence && (
                <Textarea
                  value={data.form4.charNonAdherenceDetails}
                  onChange={(e) => updateField('form4.charNonAdherenceDetails', e.target.value)}
                  placeholder="Details about non-adherence..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Confused patient */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charConfusedPatient"
                  checked={data.form4.charConfusedPatient}
                  onCheckedChange={(c) => updateField('form4.charConfusedPatient', !!c)}
                />
                <Label htmlFor="charConfusedPatient" className="cursor-pointer text-sm font-medium">Patient seems confused about medication regimen</Label>
              </div>
              {data.form4.charConfusedPatient && (
                <Textarea
                  value={data.form4.charConfusedPatientDetails}
                  onChange={(e) => updateField('form4.charConfusedPatientDetails', e.target.value)}
                  placeholder="Details about patient confusion..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Lab monitoring */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charLabMonitoring"
                  checked={data.form4.charLabMonitoring}
                  onCheckedChange={(c) => updateField('form4.charLabMonitoring', !!c)}
                />
                <Label htmlFor="charLabMonitoring" className="cursor-pointer text-sm font-medium">Medication(s) that require routine laboratory monitoring</Label>
              </div>
              {data.form4.charLabMonitoring && (
                <Textarea
                  value={data.form4.charLabMonitoringDetails}
                  onChange={(e) => updateField('form4.charLabMonitoringDetails', e.target.value)}
                  placeholder="Details about lab monitoring requirements..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Abnormal lab results */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charAbnormalLabResults"
                  checked={data.form4.charAbnormalLabResults}
                  onCheckedChange={(c) => updateField('form4.charAbnormalLabResults', !!c)}
                />
                <Label htmlFor="charAbnormalLabResults" className="cursor-pointer text-sm font-medium">Abnormal lab results (blood work, creatinine clearance, etc)</Label>
              </div>
              {data.form4.charAbnormalLabResults && (
                <Textarea
                  value={data.form4.charAbnormalLabResultsDetails}
                  onChange={(e) => updateField('form4.charAbnormalLabResultsDetails', e.target.value)}
                  placeholder="Details about abnormal results..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Planned admission */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charPlannedAdmission"
                  checked={data.form4.charPlannedAdmission}
                  onCheckedChange={(c) => updateField('form4.charPlannedAdmission', !!c)}
                />
                <Label htmlFor="charPlannedAdmission" className="cursor-pointer text-sm font-medium">Planned admission to a hospital or other health institution</Label>
              </div>
              {data.form4.charPlannedAdmission && (
                <Textarea
                  value={data.form4.charPlannedAdmissionDetails}
                  onChange={(e) => updateField('form4.charPlannedAdmissionDetails', e.target.value)}
                  placeholder="Details about planned admission..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Discharge/transition */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charDischargeTransition"
                  checked={data.form4.charDischargeTransition}
                  onCheckedChange={(c) => updateField('form4.charDischargeTransition', !!c)}
                />
                <Label htmlFor="charDischargeTransition" className="cursor-pointer text-sm font-medium">Discharge/transition from hospital to community or other healthcare institution</Label>
              </div>
              {data.form4.charDischargeTransition && (
                <Textarea
                  value={data.form4.charDischargeTransitionDetails}
                  onChange={(e) => updateField('form4.charDischargeTransitionDetails', e.target.value)}
                  placeholder="Details about discharge/transition..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Compliance packaging */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charCompliancePackaging"
                  checked={data.form4.charCompliancePackaging}
                  onCheckedChange={(c) => updateField('form4.charCompliancePackaging', !!c)}
                />
                <Label htmlFor="charCompliancePackaging" className="cursor-pointer text-sm font-medium">Initiating compliance packaging</Label>
              </div>
              {data.form4.charCompliancePackaging && (
                <Textarea
                  value={data.form4.charCompliancePackagingDetails}
                  onChange={(e) => updateField('form4.charCompliancePackagingDetails', e.target.value)}
                  placeholder="Details about compliance packaging..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Renal function */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charRenalFunction"
                  checked={data.form4.charRenalFunction}
                  onCheckedChange={(c) => updateField('form4.charRenalFunction', !!c)}
                />
                <Label htmlFor="charRenalFunction" className="cursor-pointer text-sm font-medium">Known or suspected poor or unstable renal function</Label>
              </div>
              {data.form4.charRenalFunction && (
                <Textarea
                  value={data.form4.charRenalFunctionDetails}
                  onChange={(e) => updateField('form4.charRenalFunctionDetails', e.target.value)}
                  placeholder="Details about renal function..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Liver function */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charLiverFunction"
                  checked={data.form4.charLiverFunction}
                  onCheckedChange={(c) => updateField('form4.charLiverFunction', !!c)}
                />
                <Label htmlFor="charLiverFunction" className="cursor-pointer text-sm font-medium">Known or suspected poor or unstable liver function</Label>
              </div>
              {data.form4.charLiverFunction && (
                <Textarea
                  value={data.form4.charLiverFunctionDetails}
                  onChange={(e) => updateField('form4.charLiverFunctionDetails', e.target.value)}
                  placeholder="Details about liver function..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Other */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="charOther"
                  checked={data.form4.charOther}
                  onCheckedChange={(c) => updateField('form4.charOther', !!c)}
                />
                <Label htmlFor="charOther" className="cursor-pointer text-sm font-medium">Other (Specify)</Label>
              </div>
              {data.form4.charOther && (
                <Textarea
                  value={data.form4.charOtherDetails}
                  onChange={(e) => updateField('form4.charOtherDetails', e.target.value)}
                  placeholder="Specify other characteristics..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>
          </div>
        </div>

        {/* Sources Consulted Section */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mt-6">
          <h4 className="text-sm font-semibold mb-3">Sources Consulted to conduct this MedsCheck service</h4>
          
          <FormField label="Sources Consulted (notes)">
            <Textarea
              value={data.form4.sourcesConsultedNotes}
              onChange={(e) => updateField('form4.sourcesConsultedNotes', e.target.value)}
              rows={3}
              placeholder="Describe sources consulted..."
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* Pharmacy Profile */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourcePharmacyProfile"
                  checked={data.form4.sourcePharmacyProfile}
                  onCheckedChange={(c) => updateField('form4.sourcePharmacyProfile', !!c)}
                />
                <Label htmlFor="sourcePharmacyProfile" className="cursor-pointer text-sm font-medium">Pharmacy Profile</Label>
              </div>
              {data.form4.sourcePharmacyProfile && (
                <Textarea
                  value={data.form4.sourcePharmacyProfileDetails}
                  onChange={(e) => updateField('form4.sourcePharmacyProfileDetails', e.target.value)}
                  placeholder="Details about pharmacy profile consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Physician */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourcePhysician"
                  checked={data.form4.sourcePhysician}
                  onCheckedChange={(c) => updateField('form4.sourcePhysician', !!c)}
                />
                <Label htmlFor="sourcePhysician" className="cursor-pointer text-sm font-medium">Physician / Nurse Practitioner</Label>
              </div>
              {data.form4.sourcePhysician && (
                <Textarea
                  value={data.form4.sourcePhysicianDetails}
                  onChange={(e) => updateField('form4.sourcePhysicianDetails', e.target.value)}
                  placeholder="Details about physician consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Patient */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourcePatient"
                  checked={data.form4.sourcePatient}
                  onCheckedChange={(c) => updateField('form4.sourcePatient', !!c)}
                />
                <Label htmlFor="sourcePatient" className="cursor-pointer text-sm font-medium">Patient</Label>
              </div>
              {data.form4.sourcePatient && (
                <Textarea
                  value={data.form4.sourcePatientDetails}
                  onChange={(e) => updateField('form4.sourcePatientDetails', e.target.value)}
                  placeholder="Details about patient consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Caregiver */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceCaregiver"
                  checked={data.form4.sourceCaregiver}
                  onCheckedChange={(c) => updateField('form4.sourceCaregiver', !!c)}
                />
                <Label htmlFor="sourceCaregiver" className="cursor-pointer text-sm font-medium">Caregiver / Agent</Label>
              </div>
              {data.form4.sourceCaregiver && (
                <Textarea
                  value={data.form4.sourceCaregiverDetails}
                  onChange={(e) => updateField('form4.sourceCaregiverDetails', e.target.value)}
                  placeholder="Details about caregiver consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Another Pharmacy */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceAnotherPharmacy"
                  checked={data.form4.sourceAnotherPharmacy}
                  onCheckedChange={(c) => updateField('form4.sourceAnotherPharmacy', !!c)}
                />
                <Label htmlFor="sourceAnotherPharmacy" className="cursor-pointer text-sm font-medium">Another Pharmacy</Label>
              </div>
              {data.form4.sourceAnotherPharmacy && (
                <Textarea
                  value={data.form4.sourceAnotherPharmacyDetails}
                  onChange={(e) => updateField('form4.sourceAnotherPharmacyDetails', e.target.value)}
                  placeholder="Details about other pharmacy consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Medication Packages */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceMedPackages"
                  checked={data.form4.sourceMedPackages}
                  onCheckedChange={(c) => updateField('form4.sourceMedPackages', !!c)}
                />
                <Label htmlFor="sourceMedPackages" className="cursor-pointer text-sm font-medium">Medication Packages</Label>
              </div>
              {data.form4.sourceMedPackages && (
                <Textarea
                  value={data.form4.sourceMedPackagesDetails}
                  onChange={(e) => updateField('form4.sourceMedPackagesDetails', e.target.value)}
                  placeholder="Details about medication package review..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Laboratory Values */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceLabValues"
                  checked={data.form4.sourceLabValues}
                  onCheckedChange={(c) => updateField('form4.sourceLabValues', !!c)}
                />
                <Label htmlFor="sourceLabValues" className="cursor-pointer text-sm font-medium">Laboratory / Test Values</Label>
              </div>
              {data.form4.sourceLabValues && (
                <Textarea
                  value={data.form4.sourceLabValuesDetails}
                  onChange={(e) => updateField('form4.sourceLabValuesDetails', e.target.value)}
                  placeholder="Details about lab values reviewed..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Electronic Health Record */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceEHR"
                  checked={data.form4.sourceEHR}
                  onCheckedChange={(c) => updateField('form4.sourceEHR', !!c)}
                />
                <Label htmlFor="sourceEHR" className="cursor-pointer text-sm font-medium">Electronic Health Record</Label>
              </div>
              {data.form4.sourceEHR && (
                <Textarea
                  value={data.form4.sourceEHRDetails}
                  onChange={(e) => updateField('form4.sourceEHRDetails', e.target.value)}
                  placeholder="Details about EHR consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Hospital */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceHospital"
                  checked={data.form4.sourceHospital}
                  onCheckedChange={(c) => updateField('form4.sourceHospital', !!c)}
                />
                <Label htmlFor="sourceHospital" className="cursor-pointer text-sm font-medium">Hospital</Label>
              </div>
              {data.form4.sourceHospital && (
                <Textarea
                  value={data.form4.sourceHospitalDetails}
                  onChange={(e) => updateField('form4.sourceHospitalDetails', e.target.value)}
                  placeholder="Details about hospital consultation..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>

            {/* Other Sources */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="sourceOther"
                  checked={data.form4.sourceOther}
                  onCheckedChange={(c) => updateField('form4.sourceOther', !!c)}
                />
                <Label htmlFor="sourceOther" className="cursor-pointer text-sm font-medium">Other (Specify)</Label>
              </div>
              {data.form4.sourceOther && (
                <Textarea
                  value={data.form4.sourceOtherDetails}
                  onChange={(e) => updateField('form4.sourceOtherDetails', e.target.value)}
                  placeholder="Specify other sources consulted..."
                  rows={2}
                  className="mt-2"
                />
              )}
            </div>
          </div>
        </div>

        {/* Current Medication List */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mt-6">
          <h4 className="text-sm font-semibold mb-3">Current Medication List</h4>
          <p className="text-xs text-muted-foreground mb-3">
            (attach printed records if available. Information to populate MedsCheck Personal Medication Record where appropriate)
          </p>
          
          {data.form4.medications?.map((med, index) => (
            <div key={med.id || index} className="border border-border rounded-lg p-3 space-y-3 mb-3">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-medium">Medication {index + 1}</h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const meds = data.form4.medications.filter((_, i) => i !== index)
                    updateField('form4.medications', meds)
                  }}
                  className="text-destructive hover:text-destructive h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Drug Name">
                  <Input
                    value={med.drugName}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], drugName: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="Drug name"
                  />
                </FormField>
                <FormField label="Strength">
                  <Input
                    value={med.strength}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], strength: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="Strength/dose"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Dosage Form">
                  <Input
                    value={med.dosageForm}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], dosageForm: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="e.g., tablet, capsule"
                  />
                </FormField>
                <FormField label="Directions for Use">
                  <Input
                    value={med.directionsForUse}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], directionsForUse: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="Directions"
                  />
                </FormField>
                <FormField label="Rx/OTC/NHP">
                  <Input
                    value={med.rxOtcNhp}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], rxOtcNhp: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="Rx/OTC/NHP"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Indication/Reason">
                  <Textarea
                    value={med.indication}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], indication: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="What is this medication for?"
                    rows={2}
                  />
                </FormField>
                <FormField label="Pharmacist Notes">
                  <Textarea
                    value={med.pharmacistNotes}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], pharmacistNotes: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="Pharmacist notes..."
                    rows={2}
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Adherence Issue">
                  <Select
                    value={med.adherenceIssue}
                    onValueChange={(v: 'yes' | 'no' | '') => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], adherenceIssue: v }
                      updateField('form4.medications', meds)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Patient Comments">
                  <Input
                    value={med.patientComments}
                    onChange={(e) => {
                      const meds = [...data.form4.medications]
                      meds[index] = { ...meds[index], patientComments: e.target.value }
                      updateField('form4.medications', meds)
                    }}
                    placeholder="Patient feedback..."
                  />
                </FormField>
              </div>
              <FormField label="Comments for Record">
                <Textarea
                  value={med.commentsForRecord}
                  onChange={(e) => {
                    const meds = [...data.form4.medications]
                    meds[index] = { ...meds[index], commentsForRecord: e.target.value }
                    updateField('form4.medications', meds)
                  }}
                  placeholder="Comments for patient record..."
                  rows={2}
                />
              </FormField>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newMed = {
                id: Date.now().toString(),
                drugName: '',
                strength: '',
                dosageForm: '',
                directionsForUse: '',
                indication: '',
                adherenceIssue: '',
                rxOtcNhp: '',
                patientComments: '',
                pharmacistNotes: '',
                commentsForRecord: ''
              }
              updateField('form4.medications', [...(data.form4.medications || []), newMed])
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Medication
          </Button>
        </div>

        {/* Discontinued Medications */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mt-6">
          <h4 className="text-sm font-semibold mb-3">Clinically Relevant Discontinued Medications (if applicable)</h4>
          
          {data.form4.discontinuedMedications?.map((med, index) => (
            <div key={med.id || index} className="border border-border rounded-lg p-3 space-y-3 mb-3">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-medium">Discontinued Medication {index + 1}</h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const meds = data.form4.discontinuedMedications.filter((_, i) => i !== index)
                    updateField('form4.discontinuedMedications', meds)
                  }}
                  className="text-destructive hover:text-destructive h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Name, Strength, Form, Directions">
                  <Textarea
                    value={med.nameStrengthFormDirections}
                    onChange={(e) => {
                      const meds = [...data.form4.discontinuedMedications]
                      meds[index] = { ...meds[index], nameStrengthFormDirections: e.target.value }
                      updateField('form4.discontinuedMedications', meds)
                    }}
                    placeholder="Discontinued medication details"
                    rows={2}
                  />
                </FormField>
                <FormField label="Notes">
                  <Textarea
                    value={med.notes}
                    onChange={(e) => {
                      const meds = [...data.form4.discontinuedMedications]
                      meds[index] = { ...meds[index], notes: e.target.value }
                      updateField('form4.discontinuedMedications', meds)
                    }}
                    placeholder="Notes about discontinuation..."
                    rows={2}
                  />
                </FormField>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newMed = {
                id: Date.now().toString(),
                medicationName: '',
                reasonForDiscontinuation: '',
                notes: ''
              }
              updateField('form4.discontinuedMedications', [...(data.form4.discontinuedMedications || []), newMed])
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Discontinued Medication
          </Button>
        </div>

        {/* Therapeutic Issues */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mt-6">
          <h4 className="text-sm font-semibold mb-3">Therapeutic Issues Identified (if applicable)</h4>
          
          {data.form4.therapeuticIssues?.map((issue, index) => (
            <div key={issue.id || index} className="border border-border rounded-lg p-3 space-y-3 mb-3">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-medium">Therapeutic Issue {index + 1}</h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const issues = data.form4.therapeuticIssues.filter((_, i) => i !== index)
                    updateField('form4.therapeuticIssues', issues)
                  }}
                  className="text-destructive hover:text-destructive h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Issue Description">
                  <Textarea
                    value={issue.issue}
                    onChange={(e) => {
                      const issues = [...data.form4.therapeuticIssues]
                      issues[index] = { ...issues[index], issue: e.target.value }
                      updateField('form4.therapeuticIssues', issues)
                    }}
                    placeholder="Describe the therapeutic issue..."
                    rows={3}
                  />
                </FormField>
                <FormField label="Suggested Therapy">
                  <Textarea
                    value={issue.suggestedTherapy}
                    onChange={(e) => {
                      const issues = [...data.form4.therapeuticIssues]
                      issues[index] = { ...issues[index], suggestedTherapy: e.target.value }
                      updateField('form4.therapeuticIssues', issues)
                    }}
                    placeholder="Suggested therapy..."
                    rows={3}
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Action Taken">
                  <Textarea
                    value={issue.actionTaken}
                    onChange={(e) => {
                      const issues = [...data.form4.therapeuticIssues]
                      issues[index] = { ...issues[index], actionTaken: e.target.value }
                      updateField('form4.therapeuticIssues', issues)
                    }}
                    placeholder="What action was taken?"
                    rows={2}
                  />
                </FormField>
                <FormField label="Notes">
                  <Textarea
                    value={issue.notes}
                    onChange={(e) => {
                      const issues = [...data.form4.therapeuticIssues]
                      issues[index] = { ...issues[index], notes: e.target.value }
                      updateField('form4.therapeuticIssues', issues)
                    }}
                    placeholder="Additional notes..."
                    rows={2}
                  />
                </FormField>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newIssue = {
                id: Date.now().toString(),
                issue: '',
                suggestedTherapy: '',
                actionTaken: '',
                notes: ''
              }
              updateField('form4.therapeuticIssues', [...(data.form4.therapeuticIssues || []), newIssue])
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Therapeutic Issue
          </Button>
        </div>

        {/* Part 3: Summary & Completion */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">Summary & Completion</h4>

          {/* Checklist for Completeness */}
          <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mb-6">
            <h4 className="text-sm font-semibold mb-3">Checklist for Completeness</h4>
            <div className="space-y-3">
              {[
                { id: 'checkAskedRxFromOthers', label: 'Asked if patient gets prescriptions from other pharmacies' },
                { id: 'checkMedsRemovedFromHome', label: 'Asked what medications have been removed from the home' },
                { id: 'checkAskedOTCProducts', label: 'Asked about over-the-counter products' },
                { id: 'checkAskedHerbalProducts', label: 'Asked about herbal/natural health products' },
                { id: 'checkPromptedDosageForms', label: 'Prompted about different dosage forms (ointments, eye/ear drops, inhalers, etc.)' },
                { id: 'checkAskedAntiInfectives', label: 'Asked about anti-infective medications' },
                { id: 'checkReferencedNotes', label: 'Referenced patient notes from previous visits' },
                { id: 'checkDiscussedCircleOfCare', label: 'Discussed with patient about sharing information with circle of care' },
                { id: 'checkDiscussedCompletionDate', label: 'Discussed completion date expectations with patient' },
                { id: 'checkEnsureDocumented', label: 'Ensured all relevant information was documented' },
                { id: 'checklistOther', label: 'Other checklist items' }
              ].map(item => (
                <div key={item.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                      id={item.id}
                      checked={data.form4[item.id as keyof typeof data.form4] as boolean}
                      onCheckedChange={(c) => updateField(`form4.${item.id}`, !!c)}
                    />
                    <Label htmlFor={item.id} className="cursor-pointer text-sm">{item.label}</Label>
                  </div>
                  {data.form4[item.id as keyof typeof data.form4] && (
                    <Textarea
                      value={data.form4[`${item.id}Details` as keyof typeof data.form4] as string}
                      onChange={(e) => updateField(`form4.${item.id}Details`, e.target.value)}
                      placeholder="Details..."
                      rows={2}
                      className="mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Plan for Follow Up */}
          <div className="border border-border/50 rounded-lg p-4 bg-muted/20 mb-6">
            <h4 className="text-sm font-semibold mb-3">Plan for Follow Up</h4>
            
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                id="followUpWithProviders"
                checked={data.form4.followUpWithProviders}
                onCheckedChange={(c) => updateField('form4.followUpWithProviders', !!c)}
              />
              <Label htmlFor="followUpWithProviders" className="cursor-pointer font-medium">Follow up with healthcare providers</Label>
            </div>

            {data.form4.followUpWithProviders && (
              <div className="space-y-3">
                {data.form4.healthcareProviders?.map((provider, index) => (
                  <div key={provider.id || index} className="border border-border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-sm font-medium">Healthcare Provider {index + 1}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const providers = data.form4.healthcareProviders.filter((_, i) => i !== index)
                          updateField('form4.healthcareProviders', providers)
                        }}
                        className="text-destructive hover:text-destructive h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Provider Last Name">
                        <Input
                          value={provider.lastName}
                          onChange={(e) => {
                            const providers = [...data.form4.healthcareProviders]
                            providers[index] = { ...providers[index], lastName: e.target.value }
                            updateField('form4.healthcareProviders', providers)
                          }}
                          placeholder="Last name"
                        />
                      </FormField>
                      <FormField label="Provider First Name">
                        <Input
                          value={provider.firstName}
                          onChange={(e) => {
                            const providers = [...data.form4.healthcareProviders]
                            providers[index] = { ...providers[index], firstName: e.target.value }
                            updateField('form4.healthcareProviders', providers)
                          }}
                          placeholder="First name"
                        />
                      </FormField>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newProvider = {
                      id: Date.now().toString(),
                      lastName: '',
                      firstName: ''
                    }
                    updateField('form4.healthcareProviders', [...(data.form4.healthcareProviders || []), newProvider])
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Healthcare Provider
                </Button>
              </div>
            )}
          </div>

          {/* Summary and Goals */}
          <FormField label="Summary of Discussion" required>
            <Textarea
              value={data.form4.summaryOfDiscussion}
              onChange={(e) => updateField('form4.summaryOfDiscussion', e.target.value)}
              rows={4}
              placeholder="Summarize key points discussed..."
              className={getValidationClass(data.form4.summaryOfDiscussion, true)}
            />
          </FormField>

          <FormField label="Patient Goals" required>
            <Textarea
              value={data.form4.patientGoals}
              onChange={(e) => updateField('form4.patientGoals', e.target.value)}
              rows={4}
              placeholder="Patient's health and medication goals..."
              className={getValidationClass(data.form4.patientGoals, true)}
            />
          </FormField>

          <FormField label="What I Will Do to Get There">
            <Textarea
              value={data.form4.whatIWillDo}
              onChange={(e) => updateField('form4.whatIWillDo', e.target.value)}
              rows={3}
              placeholder="Action steps..."
            />
          </FormField>

          <FormField label="Resources and Contacts Provided">
            <Textarea
              value={data.form4.resourcesAndContacts}
              onChange={(e) => updateField('form4.resourcesAndContacts', e.target.value)}
              rows={3}
              placeholder="Resources, websites, phone numbers..."
            />
          </FormField>

          <FormField label="Other Follow-up Planning">
            <Textarea
              value={data.form4.otherFollowUp}
              onChange={(e) => updateField('form4.otherFollowUp', e.target.value)}
              rows={3}
              placeholder="Additional follow-up plans..."
            />
          </FormField>

          {/* Prepared By */}
          <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
            <h4 className="text-sm font-semibold mb-3">Prepared By</h4>
            
            <FormField label="Pharmacist Full Name (Last, First)" required>
              <Input
                value={data.form4.pharmacistFullName}
                onChange={(e) => updateField('form4.pharmacistFullName', e.target.value)}
                placeholder="Last Name, First Name"
                className={getValidationClass(data.form4.pharmacistFullName, true)}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <FormField label="OCP Number" required>
                <Input
                  value={data.form4.ocpNumber}
                  onChange={(e) => updateField('form4.ocpNumber', e.target.value)}
                  placeholder="123456"
                  className={getValidationClass(data.form4.ocpNumber, true)}
                />
              </FormField>
              <FormField label="MedsCheck Review Date (yyyy/mm/dd)" required>
                <Input
                  type="date"
                  value={data.form4.medsCheckReviewDate}
                  onChange={(e) => updateField('form4.medsCheckReviewDate', e.target.value)}
                  className={getValidationClass(data.form4.medsCheckReviewDate, true)}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <FormField label="Appointment Time">
                <Input
                  type="time"
                  value={data.form4.appointmentTime}
                  onChange={(e) => updateField('form4.appointmentTime', e.target.value)}
                />
              </FormField>
              <FormField label="Documentation Completed Date (yyyy/mm/dd)" required>
                <Input
                  type="date"
                  value={data.form4.documentationCompletedDate}
                  onChange={(e) => updateField('form4.documentationCompletedDate', e.target.value)}
                  className={getValidationClass(data.form4.documentationCompletedDate, true)}
                />
              </FormField>
            </div>
          </div>
        </div>
      </FormSection>

      {/* FORM 5: DIABETES EDUCATION PATIENT TAKE-HOME SUMMARY */}
      <FormSection title="🩺 Form 5: Diabetes Education Patient Take-Home Summary" defaultCollapsed>
        <p className="text-xs text-muted-foreground mb-3">
          Form 4970-47E - Patient Take-Home Summary for Diabetes Education
        </p>

        {/* Summary of Today's Discussion - Dynamic */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Summary of Today's Discussion</h4>
          {data.form5.discussions?.map((discussion, index) => (
            <div key={discussion.id} className="mb-3 last:mb-0">
              <FormField label={`Discussion ${index + 1}`}>
                <Textarea
                  value={discussion.content}
                  onChange={(e) => {
                    const discussions = [...data.form5.discussions]
                    discussions[index] = { ...discussion, content: e.target.value }
                    updateField('form5.discussions', discussions)
                  }}
                  rows={4}
                  placeholder="Summary of discussion..."
                />
              </FormField>
              {data.form5.discussions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const discussions = data.form5.discussions.filter((_, i) => i !== index)
                    updateField('form5.discussions', discussions)
                  }}
                  className="mt-2 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" /> Remove Topic
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const discussions = [...data.form5.discussions, createEmptyForm5Discussion()]
              updateField('form5.discussions', discussions)
            }}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Topic
          </Button>
        </div>

        {/* My Goals - Dynamic */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">My Goals</h4>
          {data.form5.goals?.map((goal, index) => (
            <div key={goal.id} className="mb-3 last:mb-0">
              <FormField label={`Goal ${index + 1}`}>
                <Textarea
                  value={goal.content}
                  onChange={(e) => {
                    const goals = [...data.form5.goals]
                    goals[index] = { ...goal, content: e.target.value }
                    updateField('form5.goals', goals)
                  }}
                  rows={4}
                  placeholder="Goal..."
                />
              </FormField>
              {data.form5.goals.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const goals = data.form5.goals.filter((_, i) => i !== index)
                    updateField('form5.goals', goals)
                  }}
                  className="mt-2 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" /> Remove Goal
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const goals = [...data.form5.goals, createEmptyForm5Goal()]
              updateField('form5.goals', goals)
            }}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Goal
          </Button>
        </div>

        {/* What I Will Do To Get There - Dynamic */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">What I Will Do To Get There</h4>
          {data.form5.actions?.map((action, index) => (
            <div key={action.id} className="mb-3 last:mb-0">
              <FormField label={`Action ${index + 1}`}>
                <Textarea
                  value={action.content}
                  onChange={(e) => {
                    const actions = [...data.form5.actions]
                    actions[index] = { ...action, content: e.target.value }
                    updateField('form5.actions', actions)
                  }}
                  rows={4}
                  placeholder="Action plan..."
                />
              </FormField>
              {data.form5.actions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const actions = data.form5.actions.filter((_, i) => i !== index)
                    updateField('form5.actions', actions)
                  }}
                  className="mt-2 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" /> Remove Goal
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const actions = [...data.form5.actions, createEmptyForm5Action()]
              updateField('form5.actions', actions)
            }}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Goal
          </Button>
        </div>

        {/* List of Resources and Contacts - Dynamic */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">List of Resources and Contacts Provided</h4>
          {data.form5.resources?.map((resource, index) => (
            <div key={resource.id} className="mb-3 last:mb-0">
              <FormField label={`Resource ${index + 1}`}>
                <Textarea
                  value={resource.content}
                  onChange={(e) => {
                    const resources = [...data.form5.resources]
                    resources[index] = { ...resource, content: e.target.value }
                    updateField('form5.resources', resources)
                  }}
                  rows={4}
                  placeholder="Resource or contact..."
                />
              </FormField>
              {data.form5.resources.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const resources = data.form5.resources.filter((_, i) => i !== index)
                    updateField('form5.resources', resources)
                  }}
                  className="mt-2 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" /> Remove Resource
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const resources = [...data.form5.resources, createEmptyForm5Resource()]
              updateField('form5.resources', resources)
            }}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Resource
          </Button>
        </div>

        {/* Referrals Information - Dynamic */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Referrals Information</h4>
          {data.form5.referrals?.map((referral, index) => (
            <div key={referral.id} className="mb-3 last:mb-0">
              <FormField label={`Referral ${index + 1}`}>
                <Textarea
                  value={referral.content}
                  onChange={(e) => {
                    const referrals = [...data.form5.referrals]
                    referrals[index] = { ...referral, content: e.target.value }
                    updateField('form5.referrals', referrals)
                  }}
                  rows={4}
                  placeholder="Referral information..."
                />
              </FormField>
              {data.form5.referrals.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const referrals = data.form5.referrals.filter((_, i) => i !== index)
                    updateField('form5.referrals', referrals)
                  }}
                  className="mt-2 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" /> Remove Referrals
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const referrals = [...data.form5.referrals, createEmptyForm5Referral()]
              updateField('form5.referrals', referrals)
            }}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Referrals
          </Button>
        </div>

        {/* Program Information */}
        <div className="border border-border/50 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30">
          <p className="text-sm text-muted-foreground italic">
            The MedsCheck Diabetes Education Program is a voluntary program sponsored by the Ontario government. 
            I acknowledge that I have received the diabetes education referenced above from a licensed pharmacist 
            in relation to my diabetes care. I understand that a record of this education may be shared with other 
            health care professionals within the health care team.
          </p>
        </div>

        {/* Prepared By Section */}
        <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
          <h4 className="text-sm font-semibold mb-3">Prepared By</h4>
          
          <FormField label="Pharmacist Full Name (Last Name, First Name)" required>
            <Input
              value={data.form5.pharmacistFullName}
              onChange={(e) => updateField('form5.pharmacistFullName', e.target.value)}
              placeholder="Last Name, First Name"
              className={getValidationClass(data.form5.pharmacistFullName, true)}
            />
          </FormField>

          <FormField label="Date of Diabetes Education (yyyy/mm/dd)" required>
            <Input
              type="date"
              value={data.form5.diabetesEducationDate}
              onChange={(e) => updateField('form5.diabetesEducationDate', e.target.value)}
              className={getValidationClass(data.form5.diabetesEducationDate, true)}
            />
          </FormField>

          <SignaturePad
            value={data.form5.patientSignature}
            onChange={(signature) => updateField('form5.patientSignature', signature)}
            label="Patient's Signature"
            required
          />

          <SignaturePad
            value={data.form5.pharmacistSignature}
            onChange={(signature) => updateField('form5.pharmacistSignature', signature)}
            label="Pharmacist's Signature"
            required
          />
        </div>
      </FormSection>

      {/* FORM 6: DIABETES EDUCATION CHECKLIST */}
      <FormSection title="📋 Form 6: Diabetes Education Checklist" defaultCollapsed>
        {(() => {
          const form6 = data.form6
          return (
            <div className="space-y-6">
              {/* Header Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="mb-2 font-semibold">Diabetes Education Checklist</p>
                <p className="mb-2">
                  This document represents a list of the different subjects including insulin education if applicable to be covered during MedsCheck diabetes education sessions, and should be addressed according to the patient's needs, learning capabilities and the pharmacist availability. This education is considered specialty training. Pharmacists providing this service are required to have adequate knowledge of diabetes education through a professional program that is CCCEP approved or a Certified Diabetes Educator designation.
                </p>
                <p className="text-xs italic">Note: * - See glossary for terms</p>
              </div>

              {/* Date Patient Signed Annual Acknowledgement Form (Form 6 specific field) */}
              <div className="space-y-4">
                <FormField label="Date Patient Signed Annual Acknowledgement Form">
                  <Input
                    type="date"
                    value={form6.datePatientSignedAcknowledgement}
                    onChange={(e) => updateField('form6.datePatientSignedAcknowledgement', e.target.value)}
                  />
                </FormField>
              </div>

              {/* Caregiver Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Caregiver/Patient's Agent Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Last Name">
                    <Input
                      value={form6.caregiverLastName}
                      onChange={(e) => updateField('form6.caregiverLastName', e.target.value)}
                    />
                  </FormField>
                  <FormField label="First Name">
                    <Input
                      value={form6.caregiverFirstName}
                      onChange={(e) => updateField('form6.caregiverFirstName', e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Telephone Number">
                    <Input
                      value={form6.caregiverPhone}
                      onChange={(e) => updateField('form6.caregiverPhone', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Email Address">
                    <Input
                      type="email"
                      value={form6.caregiverEmail}
                      onChange={(e) => updateField('form6.caregiverEmail', e.target.value)}
                    />
                  </FormField>
                </div>
              </div>

              {/* General Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">General Information</h3>
                <FormField label="Stage of readiness for change">
                  <Textarea
                    rows={6}
                    value={form6.stageOfReadiness}
                    onChange={(e) => updateField('form6.stageOfReadiness', e.target.value)}
                  />
                </FormField>
                <FormField label="Identify Patient's Goals">
                  <Textarea
                    rows={6}
                    value={form6.identifyPatientsGoals}
                    onChange={(e) => updateField('form6.identifyPatientsGoals', e.target.value)}
                  />
                </FormField>
                <FormField label="My Goals (information placed here - to be added to Patient Take-Home Summary)">
                  <Textarea
                    rows={6}
                    value={form6.myGoals}
                    onChange={(e) => updateField('form6.myGoals', e.target.value)}
                  />
                </FormField>
              </div>

              {/* Medication Assessment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Medication Assessment</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Label>Insulin use:</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="form6-insulinYes"
                          checked={form6.insulinUse === true}
                          onCheckedChange={(checked) => updateField('form6.insulinUse', checked ? true : null)}
                        />
                        <Label htmlFor="form6-insulinYes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="form6-insulinNo"
                          checked={form6.insulinUse === false}
                          onCheckedChange={(checked) => updateField('form6.insulinUse', checked ? false : null)}
                        />
                        <Label htmlFor="form6-insulinNo" className="font-normal">No</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label>Oral Hypoglycemic Medications:</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="form6-oralYes"
                          checked={form6.oralHypoglycemic === true}
                          onCheckedChange={(checked) => updateField('form6.oralHypoglycemic', checked ? true : null)}
                        />
                        <Label htmlFor="form6-oralYes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="form6-oralNo"
                          checked={form6.oralHypoglycemic === false}
                          onCheckedChange={(checked) => updateField('form6.oralHypoglycemic', checked ? false : null)}
                        />
                        <Label htmlFor="form6-oralNo" className="font-normal">No</Label>
                      </div>
                    </div>
                  </div>
                  <FormField label="Pharmacists Comments on Drug Therapy">
                    <Textarea
                      rows={6}
                      value={form6.pharmacistComments}
                      onChange={(e) => updateField('form6.pharmacistComments', e.target.value)}
                    />
                  </FormField>
                </div>
              </div>

              {/* Lab Values */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Lab Values/Measurements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-hba1c"
                      checked={form6.hba1c}
                      onCheckedChange={(checked) => updateField('form6.hba1c', checked)}
                    />
                    <Label htmlFor="form6-hba1c" className="flex-shrink-0">HbA1C*</Label>
                    <Input
                      className="flex-1"
                      value={form6.hba1cValue}
                      onChange={(e) => updateField('form6.hba1cValue', e.target.value)}
                      disabled={!form6.hba1c}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-bp"
                      checked={form6.bp}
                      onCheckedChange={(checked) => updateField('form6.bp', checked)}
                    />
                    <Label htmlFor="form6-bp" className="flex-shrink-0">BP* (today's average)</Label>
                    <Input
                      className="flex-1"
                      value={form6.bpValue}
                      onChange={(e) => updateField('form6.bpValue', e.target.value)}
                      disabled={!form6.bp}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-fpg"
                      checked={form6.fpg}
                      onCheckedChange={(checked) => updateField('form6.fpg', checked)}
                    />
                    <Label htmlFor="form6-fpg" className="flex-shrink-0">FPG*</Label>
                    <Input
                      className="flex-1"
                      value={form6.fpgValue}
                      onChange={(e) => updateField('form6.fpgValue', e.target.value)}
                      disabled={!form6.fpg}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-tc"
                      checked={form6.tc}
                      onCheckedChange={(checked) => updateField('form6.tc', checked)}
                    />
                    <Label htmlFor="form6-tc" className="flex-shrink-0">TC*</Label>
                    <div className="flex-1 grid grid-cols-4 gap-2">
                      <div>
                        <Label className="text-xs">HDL ratio</Label>
                        <Input
                          value={form6.hdlRatio}
                          onChange={(e) => updateField('form6.hdlRatio', e.target.value)}
                          disabled={!form6.tc}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">LDL</Label>
                        <Input
                          value={form6.ldl}
                          onChange={(e) => updateField('form6.ldl', e.target.value)}
                          disabled={!form6.tc}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">HDL</Label>
                        <Input
                          value={form6.hdl}
                          onChange={(e) => updateField('form6.hdl', e.target.value)}
                          disabled={!form6.tc}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">TG</Label>
                        <Input
                          value={form6.tg}
                          onChange={(e) => updateField('form6.tg', e.target.value)}
                          disabled={!form6.tc}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Measurements - PAGE 2 */}
              <div className="space-y-4 border-t-4 border-gray-300 pt-6">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Health Measurements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-physical"
                      checked={form6.physicalActivity}
                      onCheckedChange={(checked) => updateField('form6.physicalActivity', checked)}
                    />
                    <Label htmlFor="form6-physical" className="flex-shrink-0">Physical Activity</Label>
                    <Input
                      className="w-32"
                      placeholder="min/week"
                      value={form6.physicalActivityMinPerWeek}
                      onChange={(e) => updateField('form6.physicalActivityMinPerWeek', e.target.value)}
                      disabled={!form6.physicalActivity}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-weight"
                      checked={form6.weight}
                      onCheckedChange={(checked) => updateField('form6.weight', checked)}
                    />
                    <Label htmlFor="form6-weight" className="flex-shrink-0">Weight</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        className="w-24"
                        placeholder="Weight"
                        value={form6.weightValue}
                        onChange={(e) => updateField('form6.weightValue', e.target.value)}
                        disabled={!form6.weight}
                      />
                      <Label className="text-sm">Height</Label>
                      <Input
                        className="w-24"
                        placeholder="Height"
                        value={form6.height}
                        onChange={(e) => updateField('form6.height', e.target.value)}
                        disabled={!form6.weight}
                      />
                      <Label className="text-sm">Waist circumference</Label>
                      <Input
                        className="w-24"
                        placeholder="Waist"
                        value={form6.waistCircumference}
                        onChange={(e) => updateField('form6.waistCircumference', e.target.value)}
                        disabled={!form6.weight}
                      />
                      <Label className="text-sm">BMI*</Label>
                      <Input
                        className="w-24"
                        placeholder="BMI"
                        value={form6.bmi}
                        onChange={(e) => updateField('form6.bmi', e.target.value)}
                        disabled={!form6.weight}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-cognitive"
                        checked={form6.cognitiveFunction}
                        onCheckedChange={(checked) => updateField('form6.cognitiveFunction', checked)}
                      />
                      <Label htmlFor="form6-cognitive" className="flex-1">Cognitive function/learning impairments</Label>
                    </div>
                    {form6.cognitiveFunction && (
                      <Input
                        className="ml-8"
                        value={form6.cognitiveFunctionNotes}
                        onChange={(e) => updateField('form6.cognitiveFunctionNotes', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-medscheck"
                        checked={form6.medsCheckAnnualAvailable}
                        onCheckedChange={(checked) => updateField('form6.medsCheckAnnualAvailable', checked)}
                      />
                      <Label htmlFor="form6-medscheck" className="flex-1">MedsCheck for Diabetes (Annual) available for review (attached)</Label>
                    </div>
                    {form6.medsCheckAnnualAvailable && (
                      <Input
                        className="ml-8"
                        value={form6.medsCheckAnnualNotes}
                        onChange={(e) => updateField('form6.medsCheckAnnualNotes', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-dtp"
                        checked={form6.dtpIdentified}
                        onCheckedChange={(checked) => updateField('form6.dtpIdentified', checked)}
                      />
                      <Label htmlFor="form6-dtp" className="flex-1">DTP identified and resolved (as per MedsCheck Diabetes (Annual) if applicable,)</Label>
                    </div>
                    {form6.dtpIdentified && (
                      <Input
                        className="ml-8"
                        value={form6.dtpNotes}
                        onChange={(e) => updateField('form6.dtpNotes', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id="form6-tobacco"
                        checked={form6.tobacco}
                        onCheckedChange={(checked) => updateField('form6.tobacco', checked)}
                      />
                      <Label htmlFor="form6-tobacco">Tobacco</Label>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="form6-tobaccoYes"
                            checked={form6.tobaccoYes}
                            onCheckedChange={(checked) => updateField('form6.tobaccoYes', checked)}
                            disabled={!form6.tobacco}
                          />
                          <Label htmlFor="form6-tobaccoYes" className="font-normal">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="form6-tobaccoNo"
                            checked={form6.tobaccoNo}
                            onCheckedChange={(checked) => updateField('form6.tobaccoNo', checked)}
                            disabled={!form6.tobacco}
                          />
                          <Label htmlFor="form6-tobaccoNo" className="font-normal">No</Label>
                        </div>
                      </div>
                      <Input
                        className="w-32"
                        placeholder="cig/day"
                        value={form6.tobaccoCigPerDay}
                        onChange={(e) => updateField('form6.tobaccoCigPerDay', e.target.value)}
                        disabled={!form6.tobacco}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-smoking"
                        checked={form6.smokingCessation}
                        onCheckedChange={(checked) => updateField('form6.smokingCessation', checked)}
                      />
                      <Label htmlFor="form6-smoking" className="flex-1">Smoking cessation offered</Label>
                    </div>
                    {form6.smokingCessation && (
                      <Input
                        className="ml-8"
                        value={form6.smokingCessationNotes}
                        onChange={(e) => updateField('form6.smokingCessationNotes', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id="form6-alcohol"
                        checked={form6.alcoholDrugs}
                        onCheckedChange={(checked) => updateField('form6.alcoholDrugs', checked)}
                      />
                      <Label htmlFor="form6-alcohol" className="flex-shrink-0">Alcohol/recreational drugs</Label>
                      <Input
                        className="w-48"
                        placeholder="Type"
                        value={form6.alcoholDrugsType}
                        onChange={(e) => updateField('form6.alcoholDrugsType', e.target.value)}
                        disabled={!form6.alcoholDrugs}
                      />
                      <Label className="text-sm">Frequency of use</Label>
                      <Input
                        className="w-48"
                        placeholder="Frequency"
                        value={form6.alcoholDrugsFrequency}
                        onChange={(e) => updateField('form6.alcoholDrugsFrequency', e.target.value)}
                        disabled={!form6.alcoholDrugs}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-dietary"
                        checked={form6.dietaryConcerns}
                        onCheckedChange={(checked) => updateField('form6.dietaryConcerns', checked)}
                      />
                      <Label htmlFor="form6-dietary" className="flex-1">Dietary concerns</Label>
                    </div>
                    {form6.dietaryConcerns && (
                      <Input
                        className="ml-8"
                        value={form6.dietaryConcernsNotes}
                        onChange={(e) => updateField('form6.dietaryConcernsNotes', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-otherHealth"
                        checked={form6.otherHealth}
                        onCheckedChange={(checked) => updateField('form6.otherHealth', checked)}
                      />
                      <Label htmlFor="form6-otherHealth" className="flex-1">Other (Specify)</Label>
                    </div>
                    {form6.otherHealth && (
                      <Input
                        className="ml-8"
                        value={form6.otherHealthNotes}
                        onChange={(e) => updateField('form6.otherHealthNotes', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* General Diabetes Education - Lifestyle */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">General Diabetes Education – Lifestyle / Health & Wellness</h3>
                <div className="space-y-3">
                  {[
                    { key: 'managementOfMedications', label: 'Management of Medications (Rx and OTCs / herbals / vitamins)', notesKey: 'managementOfMedicationsNotes' },
                    { key: 'footCareDiscussion', label: 'Foot care discussion', notesKey: 'footCareNotes' },
                    { key: 'screeningForDN', label: 'Screening for DN*', notesKey: 'screeningForDNNotes' },
                    { key: 'footConditionUlcers', label: 'Foot condition/ulcers', notesKey: 'footConditionNotes' },
                    { key: 'properShoeFit', label: 'Proper shoe fit', notesKey: 'properShoeFitNotes' },
                    { key: 'bpMonitoring', label: 'BP monitoring*', notesKey: 'bpMonitoringNotes' },
                    { key: 'cvRiskFactors', label: 'CV and other risk factors*', notesKey: 'cvRiskFactorsNotes' },
                    { key: 'mentalHealthAssessment', label: 'Mental health assessment', notesKey: 'mentalHealthNotes' },
                    { key: 'erectileDysfunction', label: 'Erectile dysfunction/ sexual health', notesKey: 'erectileDysfunctionNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  {/* Lifestyle (with sub-checkboxes) */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-lifestyle"
                        checked={form6.lifestyle}
                        onCheckedChange={(checked) => updateField('form6.lifestyle', checked)}
                      />
                      <Label htmlFor="form6-lifestyle" className="flex-1 font-semibold">Lifestyle:</Label>
                    </div>
                    {form6.lifestyle && (
                      <div className="ml-8 space-y-2 border-l-2 border-gray-300 pl-4">
                        {[
                          { key: 'lifestyleDiet', label: 'Diet', notesKey: 'lifestyleDietNotes' },
                          { key: 'lifestyleStressReduction', label: 'Stress Reduction', notesKey: 'lifestyleStressReductionNotes' },
                          { key: 'lifestyleExercise', label: 'Exercise', notesKey: 'lifestyleExerciseNotes' }
                        ].map(item => (
                          <div key={item.key} className="space-y-2">
                            <div className="flex items-start gap-4">
                              <Checkbox
                                id={`form6-${item.key}`}
                                checked={form6[item.key as keyof typeof form6] as boolean}
                                onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                              />
                              <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                            </div>
                            {form6[item.key as keyof typeof form6] && (
                              <Input
                                className="ml-8"
                                value={form6[item.notesKey as keyof typeof form6] as string}
                                onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {[
                    { key: 'eyeHealth', label: 'Eye health and reminder of yearly eye exam', notesKey: 'eyeHealthNotes' },
                    { key: 'dentalHygiene', label: 'Dental hygiene', notesKey: 'dentalHygieneNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  {/* Immunizations (with sub-checkboxes) */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-immunizations"
                        checked={form6.immunizations}
                        onCheckedChange={(checked) => updateField('form6.immunizations', checked)}
                      />
                      <Label htmlFor="form6-immunizations" className="flex-1 font-semibold">Immunizations:</Label>
                    </div>
                    {form6.immunizations && (
                      <div className="ml-8 space-y-2 border-l-2 border-gray-300 pl-4">
                        {[
                          { key: 'immunizationsInfluenza', label: 'Influenza', notesKey: 'immunizationsInfluenzaNotes' },
                          { key: 'immunizationsPneumococcal', label: 'Pneumococcal vaccine', notesKey: 'immunizationsPneumococcalNotes' },
                          { key: 'immunizationsOther', label: 'Other (Specify)', notesKey: 'immunizationsOtherNotes' }
                        ].map(item => (
                          <div key={item.key} className="space-y-2">
                            <div className="flex items-start gap-4">
                              <Checkbox
                                id={`form6-${item.key}`}
                                checked={form6[item.key as keyof typeof form6] as boolean}
                                onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                              />
                              <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                            </div>
                            {form6[item.key as keyof typeof form6] && (
                              <Input
                                className="ml-8"
                                value={form6[item.notesKey as keyof typeof form6] as string}
                                onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {[
                    { key: 'drivingGuidelines', label: 'Driving guidelines', notesKey: 'drivingGuidelinesNotes' },
                    { key: 'travellingWithDiabetes', label: 'Travelling with diabetes', notesKey: 'travellingWithDiabetesNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Self-Monitoring of Blood Glucose - PAGE 3 */}
              <div className="space-y-4 border-t-4 border-gray-300 pt-6">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Self-Monitoring of Blood Glucose – Blood Sugar Management</h3>
                <div className="space-y-3">
                  {[
                    { key: 'meterTraining', label: 'Meter training', notesKey: 'meterTrainingNotes' },
                    { key: 'testingFrequency', label: 'Testing frequency and Optimal schedule', notesKey: 'testingFrequencyNotes' },
                    { key: 'recordingResults', label: 'Recording of results (logbook given)', notesKey: 'recordingResultsNotes' },
                    { key: 'identificationPatterns', label: 'Identification of patterns', notesKey: 'identificationPatternsNotes' },
                    { key: 'preventionHypoglycemia', label: 'Prevention, Identification and Treatment of hypoglycemia', notesKey: 'preventionHypoglycemiaNotes' },
                    { key: 'properMedicationHandling', label: 'Proper medication/supplies handling', notesKey: 'properMedicationHandlingNotes' },
                    { key: 'trainingDisposal', label: 'Training on use and disposal of diabetes supplies (needles, lancets)', notesKey: 'trainingDisposalNotes' },
                    { key: 'sickDaysManagement', label: 'Sick Days Management and Ketones Testing', notesKey: 'sickDaysManagementNotes' },
                    { key: 'individualizedBGTargets', label: 'Individualized BG targets*', notesKey: 'individualizedBGTargetsNotes' },
                    { key: 'otherBloodGlucose', label: 'Other (Specify)', notesKey: 'otherBloodGlucoseNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialty Training */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Specialty Training</h3>
                <div className="space-y-3">
                  {[
                    { key: 'insulinTypes', label: 'Insulin types/ duration of action', notesKey: 'insulinTypesNotes' },
                    { key: 'penSyringeHandling', label: 'Pen/ syringe handling', notesKey: 'penSyringeHandlingNotes' },
                    { key: 'sitePreparation', label: 'Site preparation and inspection', notesKey: 'sitePreparationNotes' },
                    { key: 'injectionTrainingGLP1', label: 'Injection training for GLP-1*', notesKey: 'injectionTrainingGLP1Notes' },
                    { key: 'properInjectionTechnique', label: 'Proper injection technique / site rotation', notesKey: 'properInjectionTechniqueNotes' },
                    { key: 'patientDemonstratedUse', label: 'Patient demonstrated use', notesKey: 'patientDemonstratedUseNotes' },
                    { key: 'dosageAdjustments', label: 'Dosage adjustments (BG patterns management)*', notesKey: 'dosageAdjustmentsNotes' },
                    { key: 'missedDoses', label: 'Missed or skipped doses/ timing of injections', notesKey: 'missedDosesNotes' },
                    { key: 'reviewCarbohydrate', label: 'Review of carbohydrate counting', notesKey: 'reviewCarbohydrateNotes' },
                    { key: 'emergencySickDay', label: 'Emergency and sick day management', notesKey: 'emergencySickDayNotes' },
                    { key: 'alcoholTobaccoInsulin', label: 'Alcohol/ recreational drugs/ tobacco and insulin', notesKey: 'alcoholTobaccoInsulinNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  {/* Updated Insulin Regimen */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="form6-insulinRegimen"
                        checked={form6.updatedInsulinRegimen}
                        onCheckedChange={(checked) => updateField('form6.updatedInsulinRegimen', checked)}
                      />
                      <Label htmlFor="form6-insulinRegimen" className="flex-1 font-semibold">Updated Insulin Regimen:</Label>
                    </div>
                    {form6.updatedInsulinRegimen && (
                      <div className="ml-8 space-y-3 border-l-2 border-gray-300 pl-4">
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label className="text-xs">Type</Label>
                            <Input
                              value={form6.insulinType1}
                              onChange={(e) => updateField('form6.insulinType1', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">am</Label>
                            <Input
                              value={form6.insulinType1Am}
                              onChange={(e) => updateField('form6.insulinType1Am', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">noon</Label>
                            <Input
                              value={form6.insulinType1Noon}
                              onChange={(e) => updateField('form6.insulinType1Noon', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">supper</Label>
                            <Input
                              value={form6.insulinType1Supper}
                              onChange={(e) => updateField('form6.insulinType1Supper', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs">Type</Label>
                            <Input
                              value={form6.insulinType2}
                              onChange={(e) => updateField('form6.insulinType2', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">HS</Label>
                            <Input
                              value={form6.insulinType2HS}
                              onChange={(e) => updateField('form6.insulinType2HS', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Other</Label>
                            <Input
                              value={form6.insulinType2Other}
                              onChange={(e) => updateField('form6.insulinType2Other', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {[
                    { key: 'otherSpecialty', label: 'Other (Specify)', notesKey: 'otherSpecialtyNotes' },
                    { key: 'otherComplications', label: 'Other complications discussed', notesKey: 'otherComplicationsNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources Provided */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Resources Provided</h3>
                <div className="space-y-3">
                  {[
                    { key: 'diabetesPassport', label: 'Diabetes Passport (record of important lab tests)', notesKey: 'diabetesPassportNotes' },
                    { key: 'sickDaysManagementPlan', label: 'Sick days management plan', notesKey: 'sickDaysManagementPlanNotes' },
                    { key: 'afterHoursSupport', label: 'After hours support/ contact information', notesKey: 'afterHoursSupportNotes' },
                    { key: 'directoryResources', label: 'Directory of local community resources', notesKey: 'directoryResourcesNotes' },
                    { key: 'otherMaterialGiven', label: 'Other material given to the patient', notesKey: 'otherMaterialGivenNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  <FormField label="Resource Information to be added to Patient Take-Home Summary">
                    <Textarea
                      rows={5}
                      value={form6.resourceInformation}
                      onChange={(e) => updateField('form6.resourceInformation', e.target.value)}
                    />
                  </FormField>
                </div>
              </div>

              {/* Referrals and Reason */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Referrals and Reason</h3>
                <div className="space-y-3">
                  {[
                    { key: 'endocrinologist', label: 'Endocrinologist', notesKey: 'endocrinologistNotes' },
                    { key: 'primaryCarePhysician', label: 'Primary care physician', notesKey: 'primaryCarePhysicianNotes' },
                    { key: 'dietitian', label: 'Dietitian', notesKey: 'dietitianNotes' },
                    { key: 'nurse', label: 'Nurse', notesKey: 'nurseNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* PAGE 4 - Follow-up and Summary */}
              <div className="space-y-4 border-t-4 border-gray-300 pt-6">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Referrals (Continued)</h3>
                <div className="space-y-3">
                  {[
                    { key: 'familyPharmacist', label: 'Family pharmacist', notesKey: 'familyPharmacistNotes' },
                    { key: 'otherReferral', label: 'Other', notesKey: 'otherReferralNotes' },
                    { key: 'additionalReferral', label: '', notesKey: 'additionalReferralNotes' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`form6-${item.key}`}
                          checked={form6[item.key as keyof typeof form6] as boolean}
                          onCheckedChange={(checked) => updateField(`form6.${item.key}`, checked)}
                        />
                        <Label htmlFor={`form6-${item.key}`} className="flex-1">{item.label || '(Additional referral)'}</Label>
                      </div>
                      {form6[item.key as keyof typeof form6] && (
                        <Input
                          className="ml-8"
                          value={form6[item.notesKey as keyof typeof form6] as string}
                          onChange={(e) => updateField(`form6.${item.notesKey}`, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Follow-up date (yyyy/mm/dd)">
                      <Input
                        type="date"
                        value={form6.followUpDate}
                        onChange={(e) => updateField('form6.followUpDate', e.target.value)}
                      />
                    </FormField>
                  </div>
                  <FormField label="Purpose">
                    <Textarea
                      rows={6}
                      value={form6.purpose}
                      onChange={(e) => updateField('form6.purpose', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Referral Information to be added to Patient Take-Home Summary">
                    <Textarea
                      rows={5}
                      value={form6.referralInformation}
                      onChange={(e) => updateField('form6.referralInformation', e.target.value)}
                    />
                  </FormField>
                </div>
              </div>

              {/* Summary and Goals */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Summary and Goals</h3>
                <FormField label="Summary of Today's Discussion">
                  <Textarea
                    rows={6}
                    value={form6.summaryDiscussion}
                    onChange={(e) => updateField('form6.summaryDiscussion', e.target.value)}
                  />
                </FormField>
                <FormField label="Summary of Discussion to be added to Patient Take-Home Summary">
                  <Textarea
                    rows={5}
                    value={form6.summaryToAddToTakeHome}
                    onChange={(e) => updateField('form6.summaryToAddToTakeHome', e.target.value)}
                  />
                </FormField>
                <FormField label="Reaching the Goal">
                  <Textarea
                    rows={6}
                    value={form6.reachingTheGoal}
                    onChange={(e) => updateField('form6.reachingTheGoal', e.target.value)}
                  />
                </FormField>
              </div>

              {/* Prepared By */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gray-100 p-2 rounded">Prepared By</h3>
                <FormField label="Pharmacist Full Name (Last Name, First Name)">
                  <Input
                    value={form6.pharmacistFullName}
                    onChange={(e) => updateField('form6.pharmacistFullName', e.target.value)}
                  />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="OCP Number">
                    <Input
                      value={form6.ocpNumber}
                      onChange={(e) => updateField('form6.ocpNumber', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Date of Diabetes Education (yyyy/mm/dd)">
                    <Input
                      type="date"
                      value={form6.dateOfDiabetesEducation}
                      onChange={(e) => updateField('form6.dateOfDiabetesEducation', e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Appointment Time">
                    <Input
                      type="time"
                      value={form6.appointmentTime}
                      onChange={(e) => updateField('form6.appointmentTime', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Date Diabetes Education Documentation Completed (yyyy/mm/dd)">
                    <Input
                      type="date"
                      value={form6.dateDocumentationCompleted}
                      onChange={(e) => updateField('form6.dateDocumentationCompleted', e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id="form6-copyRecord"
                      checked={form6.copyRecordSentTo}
                      onCheckedChange={(checked) => updateField('form6.copyRecordSentTo', checked)}
                    />
                    <Label htmlFor="form6-copyRecord" className="flex-shrink-0">Copy of this record sent to</Label>
                    {form6.copyRecordSentTo && (
                      <Input
                        className="flex-1"
                        value={form6.copyRecordSentToDetails}
                        onChange={(e) => updateField('form6.copyRecordSentToDetails', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Glossary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs space-y-1">
                <h4 className="font-semibold mb-2">Glossary</h4>
                <p>* CV= cardiovascular   DN- diabetic neuropathy   OTC= over-the-counter Rx = prescription   BP= blood pressure   HbA1C= hemoglobin A1C</p>
                <p>BMI= body mass index   BG = blood glucose   FPG= fasting plasma glucose  DOB=date of birth  GLP-1= Glucagon-like peptide-1</p>
                <p>TG=triglyceride   DTP = drug therapy problem  TC= total cholesterol HDL or LDL= high or low density lipoprotein</p>
              </div>
            </div>
          )
        })()}
      </FormSection>

      {/* Completion Message */}
      <div className="border-2 border-primary/30 rounded-lg p-6 bg-primary/5 text-center">
        <h3 className="text-lg font-bold text-primary mb-2">✓ Unified Form Complete</h3>
        <p className="text-sm text-muted-foreground">
          All form fields are now in one place. Use the right panel to preview and generate PDFs.
        </p>
        <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
          Patient, Pharmacy, and Provider info only needs to be entered once!
        </p>
      </div>
    </div>
  )
}
