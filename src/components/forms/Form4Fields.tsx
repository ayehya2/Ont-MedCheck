import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { useFormData } from '@/context/FormDataContext'
import { 
  createEmptyForm4Medication, 
  createEmptyForm4DiscontinuedMed, 
  createEmptyForm4TherapeuticIssue,
  createEmptyForm4HealthcareProvider
} from '@/types/forms'

// Form Field Component - matches government form styling
interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  )
}

// Form Section Component - blue header matching government form
interface FormSectionProps {
  title: string
  children: React.ReactNode
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 -mx-6 px-6 py-2 border-y border-blue-200 dark:border-blue-800">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

// Page Section Divider - visual separator between form pages
function PageDivider({ pageNum, title }: { pageNum: number; title: string }) {
  return (
    <div className="relative py-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-primary/30"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-4 py-2 text-sm font-bold text-primary border-2 border-primary/30 rounded-full">
          Page {pageNum} of 4 — {title}
        </span>
      </div>
    </div>
  )
}

export function Form4Fields() {
  const { data, updateField } = useFormData()
  const form4 = data.form4

  const updateForm4 = (field: string, value: unknown) => {
    updateField(`form4.${field}`, value)
  }

  // Helper to get validation class for required fields
  const getValidationClass = (value: string, required: boolean) => {
    if (required && !value?.trim()) {
      return 'border-destructive focus-visible:ring-destructive'
    }
    return ''
  }

  return (
    <div className="p-4 space-y-4 custom-scrollbar">
      {/* Form Title */}
      <div className="bg-primary/10 rounded-lg p-3">
        <h2 className="text-base font-bold text-primary">Form 4: Pharmacists Worksheet</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          4-page comprehensive worksheet (Form 4967-47E) — Scroll down to complete all sections
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PAGE 1 - Demographics and Interview Location */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <PageDivider pageNum={1} title="Patient Demographics & Interview Location" />
      
      <div className="space-y-6">
        {/* MedsCheck Service Provided */}
          <FormSection title="MedsCheck Service Provided">
            <FormField label="Service Type" required>
              <Select value={form4.serviceProvided} onValueChange={(v) => updateForm4('serviceProvided', v)}>
                <SelectTrigger className={getValidationClass(form4.serviceProvided, true)}>
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
          </FormSection>

          {/* Patient Information */}
          <FormSection title="Patient Information">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Last Name" required>
                <Input 
                  value={form4.patientLastName} 
                  onChange={(e) => updateForm4('patientLastName', e.target.value)} 
                  className={getValidationClass(form4.patientLastName, true)}
                />
              </FormField>
              <FormField label="First Name" required>
                <Input 
                  value={form4.patientFirstName} 
                  onChange={(e) => updateForm4('patientFirstName', e.target.value)} 
                  className={getValidationClass(form4.patientFirstName, true)}
                />
              </FormField>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <FormField label="Gender">
                <Select value={form4.patientGender} onValueChange={(v) => updateForm4('patientGender', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Date of Birth (yyyy/mm/dd)" required>
                <Input 
                  type="date" 
                  value={form4.patientDOB} 
                  onChange={(e) => updateForm4('patientDOB', e.target.value)} 
                  className={getValidationClass(form4.patientDOB, true)}
                />
              </FormField>
              <FormField label="Health Card Number" required>
                <Input 
                  value={form4.patientHealthCardNumber} 
                  onChange={(e) => updateForm4('patientHealthCardNumber', e.target.value)}
                  className={getValidationClass(form4.patientHealthCardNumber, true)}
                />
              </FormField>
              <FormField label="Telephone Number">
                <PhoneInput value={form4.patientPhone} onChange={(v) => updateForm4('patientPhone', v)} />
              </FormField>
            </div>
          </FormSection>

          {/* Patient Address */}
          <FormSection title="Patient Address">
            <div className="grid grid-cols-4 gap-3">
              <FormField label="Unit Number">
                <Input value={form4.patientUnitNumber} onChange={(e) => updateForm4('patientUnitNumber', e.target.value)} />
              </FormField>
              <FormField label="Street Number">
                <Input value={form4.patientStreetNumber} onChange={(e) => updateForm4('patientStreetNumber', e.target.value)} />
              </FormField>
              <FormField label="Street Name">
                <Input value={form4.patientStreetName} onChange={(e) => updateForm4('patientStreetName', e.target.value)} />
              </FormField>
              <FormField label="PO Box">
                <Input value={form4.patientPOBox} onChange={(e) => updateForm4('patientPOBox', e.target.value)} />
              </FormField>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <FormField label="City/Town">
                <Input value={form4.patientCity} onChange={(e) => updateForm4('patientCity', e.target.value)} />
              </FormField>
              <FormField label="Province">
                <Input value={form4.patientProvince} onChange={(e) => updateForm4('patientProvince', e.target.value)} />
              </FormField>
              <FormField label="Postal Code">
                <Input value={form4.patientPostalCode} onChange={(e) => updateForm4('patientPostalCode', e.target.value)} placeholder="A1A 1A1" />
              </FormField>
            </div>
            <FormField label="Email Address">
              <Input type="email" value={form4.patientEmail} onChange={(e) => updateForm4('patientEmail', e.target.value)} />
            </FormField>
            <FormField label="Date Patient Signed Annual Acknowledgement Form (yyyy/mm/dd)">
              <Input type="date" value={form4.patientAcknowledgementDate} onChange={(e) => updateForm4('patientAcknowledgementDate', e.target.value)} />
            </FormField>
          </FormSection>

          {/* Caregiver/Patient's Agent Information */}
          <FormSection title="Caregiver/Patient's Agent Information">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Last Name">
                <Input value={form4.caregiverLastName} onChange={(e) => updateForm4('caregiverLastName', e.target.value)} />
              </FormField>
              <FormField label="First Name">
                <Input value={form4.caregiverFirstName} onChange={(e) => updateForm4('caregiverFirstName', e.target.value)} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Telephone Number">
                <PhoneInput value={form4.caregiverPhone} onChange={(v) => updateForm4('caregiverPhone', v)} />
              </FormField>
              <FormField label="Email Address">
                <Input type="email" value={form4.caregiverEmail} onChange={(e) => updateForm4('caregiverEmail', e.target.value)} />
              </FormField>
            </div>
            <FormField label="Notes">
              <Textarea value={form4.caregiverNotes} onChange={(e) => updateForm4('caregiverNotes', e.target.value)} rows={3} />
            </FormField>
          </FormSection>

          {/* Primary Care Provider */}
          <FormSection title="Primary Care Provider">
            <div className="grid grid-cols-3 gap-3">
              <FormField label="Last Name">
                <Input value={form4.providerLastName} onChange={(e) => updateForm4('providerLastName', e.target.value)} />
              </FormField>
              <FormField label="First Name">
                <Input value={form4.providerFirstName} onChange={(e) => updateForm4('providerFirstName', e.target.value)} />
              </FormField>
              <FormField label="Designation">
                <Input value={form4.providerDesignation} onChange={(e) => updateForm4('providerDesignation', e.target.value)} placeholder="MD, NP, etc." />
              </FormField>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <FormField label="Telephone Number">
                <PhoneInput value={form4.providerPhone} onChange={(v) => updateForm4('providerPhone', v)} />
              </FormField>
              <FormField label="Fax Number">
                <PhoneInput value={form4.providerFax} onChange={(v) => updateForm4('providerFax', v)} />
              </FormField>
              <FormField label="Email Address">
                <Input type="email" value={form4.providerEmail} onChange={(e) => updateForm4('providerEmail', e.target.value)} />
              </FormField>
            </div>
          </FormSection>

          {/* Known Allergies and Intolerances */}
          <FormSection title="Known Allergies and Intolerances">
            <div className="flex items-center gap-2 mb-2">
              <Checkbox 
                id="noKnownAllergies" 
                checked={form4.noKnownAllergies} 
                onCheckedChange={(c) => updateForm4('noKnownAllergies', !!c)} 
              />
              <Label htmlFor="noKnownAllergies">Select if there are no known allergies or intolerances</Label>
            </div>
            {!form4.noKnownAllergies && (
              <Textarea 
                value={form4.knownAllergies} 
                onChange={(e) => updateForm4('knownAllergies', e.target.value)} 
                placeholder="List known allergies and intolerances..." 
                rows={3} 
              />
            )}
          </FormSection>

          {/* Interview Conducted At */}
          <FormSection title="Interview Conducted At">
            {/* Pharmacy Option */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <Checkbox 
                  id="interviewPharmacy" 
                  checked={form4.interviewLocation === 'pharmacy'} 
                  onCheckedChange={(c) => updateForm4('interviewLocation', c ? 'pharmacy' : '')} 
                />
                <Label htmlFor="interviewPharmacy" className="font-medium cursor-pointer">Pharmacy</Label>
              </div>
              {form4.interviewLocation === 'pharmacy' && (
                <div className="ml-6 space-y-4 mt-3 pt-3 border-t border-border/50">
                  <FormField label="Pharmacy Name">
                    <Input value={form4.pharmacyName} onChange={(e) => updateForm4('pharmacyName', e.target.value)} />
                  </FormField>
                  <div className="grid grid-cols-4 gap-3">
                    <FormField label="Unit Number">
                      <Input value={form4.pharmacyUnitNumber} onChange={(e) => updateForm4('pharmacyUnitNumber', e.target.value)} />
                    </FormField>
                    <FormField label="Street Number">
                      <Input value={form4.pharmacyStreetNumber} onChange={(e) => updateForm4('pharmacyStreetNumber', e.target.value)} />
                    </FormField>
                    <FormField label="Street Name">
                      <Input value={form4.pharmacyStreetName} onChange={(e) => updateForm4('pharmacyStreetName', e.target.value)} />
                    </FormField>
                    <FormField label="PO Box">
                      <Input value={form4.pharmacyPOBox} onChange={(e) => updateForm4('pharmacyPOBox', e.target.value)} />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <FormField label="City/Town">
                      <Input value={form4.pharmacyCity} onChange={(e) => updateForm4('pharmacyCity', e.target.value)} />
                    </FormField>
                    <FormField label="Province">
                      <Input value={form4.pharmacyProvince} onChange={(e) => updateForm4('pharmacyProvince', e.target.value)} />
                    </FormField>
                    <FormField label="Postal Code">
                      <Input value={form4.pharmacyPostalCode} onChange={(e) => updateForm4('pharmacyPostalCode', e.target.value)} />
                    </FormField>
                  </div>
                </div>
              )}
            </div>

            {/* Patient's Home Option */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <Checkbox 
                  id="interviewHome" 
                  checked={form4.interviewLocation === 'home'} 
                  onCheckedChange={(c) => updateForm4('interviewLocation', c ? 'home' : '')} 
                />
                <Label htmlFor="interviewHome" className="font-medium cursor-pointer">Patient's Home</Label>
              </div>
              {form4.interviewLocation === 'home' && (
                <div className="ml-6 space-y-4 mt-3 pt-3 border-t border-border/50">
                  <div className="grid grid-cols-4 gap-3">
                    <FormField label="Unit Number">
                      <Input value={form4.homeUnitNumber} onChange={(e) => updateForm4('homeUnitNumber', e.target.value)} />
                    </FormField>
                    <FormField label="Street Number">
                      <Input value={form4.homeStreetNumber} onChange={(e) => updateForm4('homeStreetNumber', e.target.value)} />
                    </FormField>
                    <FormField label="Street Name">
                      <Input value={form4.homeStreetName} onChange={(e) => updateForm4('homeStreetName', e.target.value)} />
                    </FormField>
                    <FormField label="PO Box">
                      <Input value={form4.homePOBox} onChange={(e) => updateForm4('homePOBox', e.target.value)} />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <FormField label="City/Town">
                      <Input value={form4.homeCity} onChange={(e) => updateForm4('homeCity', e.target.value)} />
                    </FormField>
                    <FormField label="Province">
                      <Input value={form4.homeProvince} onChange={(e) => updateForm4('homeProvince', e.target.value)} />
                    </FormField>
                    <FormField label="Postal Code">
                      <Input value={form4.homePostalCode} onChange={(e) => updateForm4('homePostalCode', e.target.value)} />
                    </FormField>
                  </div>
                </div>
              )}
            </div>
          </FormSection>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PAGE 2 - Lifestyle & Clinical Assessment */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <PageDivider pageNum={2} title="Lifestyle & Clinical Assessment" />
      
      <div className="space-y-6">
        {/* Lifestyle Information */}
          <FormSection title="Lifestyle Information">
            {/* Tobacco */}
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="tobacco" 
                  checked={form4.tobacco} 
                  onCheckedChange={(c) => updateForm4('tobacco', !!c)} 
                />
                <Label htmlFor="tobacco" className="cursor-pointer">Tobacco</Label>
              </div>
              {form4.tobacco && (
                <div className="ml-6 flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="tobaccoYes" 
                      checked={form4.tobaccoYesNo === 'yes'} 
                      onCheckedChange={(c) => updateForm4('tobaccoYesNo', c ? 'yes' : '')} 
                    />
                    <Label htmlFor="tobaccoYes" className="cursor-pointer text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="tobaccoNo" 
                      checked={form4.tobaccoYesNo === 'no'} 
                      onCheckedChange={(c) => updateForm4('tobaccoYesNo', c ? 'no' : '')} 
                    />
                    <Label htmlFor="tobaccoNo" className="cursor-pointer text-sm">No</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={form4.tobaccoCigPerDay} 
                      onChange={(e) => updateForm4('tobaccoCigPerDay', e.target.value)} 
                      className="w-20" 
                      placeholder="0" 
                    />
                    <span className="text-sm text-muted-foreground">cig/day</span>
                  </div>
                </div>
              )}
            </div>

            {/* Smoking Cessation */}
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="smokingCessation" 
                  checked={form4.smokingCessation} 
                  onCheckedChange={(c) => updateForm4('smokingCessation', !!c)} 
                />
                <Label htmlFor="smokingCessation" className="cursor-pointer">Smoking Cessation status</Label>
              </div>
              {form4.smokingCessation && (
                <div className="ml-6">
                  <Input 
                    value={form4.smokingCessationStatus} 
                    onChange={(e) => updateForm4('smokingCessationStatus', e.target.value)} 
                    placeholder="Cessation status details..." 
                  />
                </div>
              )}
            </div>

            {/* Recreational Drug Use */}
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="recreationalDrugUse" 
                  checked={form4.recreationalDrugUse} 
                  onCheckedChange={(c) => updateForm4('recreationalDrugUse', !!c)} 
                />
                <Label htmlFor="recreationalDrugUse" className="cursor-pointer">Recreational Drug Use</Label>
              </div>
              {form4.recreationalDrugUse && (
                <div className="ml-6 flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="recreationalYes" 
                      checked={form4.recreationalDrugYesNo === 'yes'} 
                      onCheckedChange={(c) => updateForm4('recreationalDrugYesNo', c ? 'yes' : '')} 
                    />
                    <Label htmlFor="recreationalYes" className="cursor-pointer text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="recreationalNo" 
                      checked={form4.recreationalDrugYesNo === 'no'} 
                      onCheckedChange={(c) => updateForm4('recreationalDrugYesNo', c ? 'no' : '')} 
                    />
                    <Label htmlFor="recreationalNo" className="cursor-pointer text-sm">No</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Frequency:</span>
                    <Input 
                      value={form4.recreationalDrugFrequency} 
                      onChange={(e) => updateForm4('recreationalDrugFrequency', e.target.value)} 
                      className="w-40" 
                      placeholder="e.g., daily, weekly" 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Alcohol Use */}
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="alcoholUse" 
                  checked={form4.alcoholUse} 
                  onCheckedChange={(c) => updateForm4('alcoholUse', !!c)} 
                />
                <Label htmlFor="alcoholUse" className="cursor-pointer">Alcohol Use</Label>
              </div>
              {form4.alcoholUse && (
                <div className="ml-6 flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="alcoholYes" 
                      checked={form4.alcoholYesNo === 'yes'} 
                      onCheckedChange={(c) => updateForm4('alcoholYesNo', c ? 'yes' : '')} 
                    />
                    <Label htmlFor="alcoholYes" className="cursor-pointer text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="alcoholNo" 
                      checked={form4.alcoholYesNo === 'no'} 
                      onCheckedChange={(c) => updateForm4('alcoholYesNo', c ? 'no' : '')} 
                    />
                    <Label htmlFor="alcoholNo" className="cursor-pointer text-sm">No</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Frequency:</span>
                    <Input 
                      value={form4.alcoholFrequency} 
                      onChange={(e) => updateForm4('alcoholFrequency', e.target.value)} 
                      className="w-40" 
                      placeholder="e.g., 2 drinks/week" 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Exercise Regimen */}
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="exerciseRegimen" 
                  checked={form4.exerciseRegimen} 
                  onCheckedChange={(c) => updateForm4('exerciseRegimen', !!c)} 
                />
                <Label htmlFor="exerciseRegimen" className="cursor-pointer">Exercise Regimen</Label>
              </div>
              {form4.exerciseRegimen && (
                <div className="ml-6">
                  <Input 
                    value={form4.exerciseRegimenDetails} 
                    onChange={(e) => updateForm4('exerciseRegimenDetails', e.target.value)} 
                    placeholder="Exercise details..." 
                  />
                </div>
              )}
            </div>

            {/* Other */}
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="lifestyleOther" 
                  checked={form4.lifestyleOther} 
                  onCheckedChange={(c) => updateForm4('lifestyleOther', !!c)} 
                />
                <Label htmlFor="lifestyleOther" className="cursor-pointer">Other (Specify)</Label>
              </div>
              {form4.lifestyleOther && (
                <div className="ml-6">
                  <Input 
                    value={form4.lifestyleOtherDetails} 
                    onChange={(e) => updateForm4('lifestyleOtherDetails', e.target.value)} 
                    placeholder="Other lifestyle details..." 
                  />
                </div>
              )}
            </div>
          </FormSection>

          {/* Lifestyle Information (notes) */}
          <FormSection title="Lifestyle Information (notes)">
            <Textarea 
              value={form4.lifestyleNotes} 
              onChange={(e) => updateForm4('lifestyleNotes', e.target.value)} 
              rows={6} 
              placeholder="Additional lifestyle notes..." 
            />
          </FormSection>

          {/* Clinical Need for Service */}
          <FormSection title="Clinical Need for Service (notes)">
            <p className="text-sm text-muted-foreground mb-2">
              Why are you [the pharmacist] conducting this MedsCheck service?
            </p>
            <Textarea 
              value={form4.clinicalNeedNotes} 
              onChange={(e) => updateForm4('clinicalNeedNotes', e.target.value)} 
              rows={6} 
              placeholder="Explain the clinical rationale for conducting this MedsCheck service..." 
              className={getValidationClass(form4.clinicalNeedNotes, true)}
            />
          </FormSection>

          {/* Patient Characteristics */}
          <FormSection title="Patient Characteristics Contributing to the Need for the MedsCheck Service">
            <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
            
            <div className="space-y-2">
              {/* 1. 3 or more chronic medications */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="char3OrMoreMeds" 
                    checked={form4.char3OrMoreMeds} 
                    onCheckedChange={(c) => updateForm4('char3OrMoreMeds', !!c)} 
                  />
                  <Label htmlFor="char3OrMoreMeds" className="cursor-pointer text-sm">3 or more chronic medications</Label>
                </div>
                {form4.char3OrMoreMeds && (
                  <Input 
                    value={form4.char3OrMoreMedsDetails} 
                    onChange={(e) => updateForm4('char3OrMoreMedsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 2. Multiple acute conditions */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charMultipleConditions" 
                    checked={form4.charMultipleConditions} 
                    onCheckedChange={(c) => updateForm4('charMultipleConditions', !!c)} 
                  />
                  <Label htmlFor="charMultipleConditions" className="cursor-pointer text-sm">Multiple acute conditions and/or one or more chronic diseases</Label>
                </div>
                {form4.charMultipleConditions && (
                  <Input 
                    value={form4.charMultipleConditionsDetails} 
                    onChange={(e) => updateForm4('charMultipleConditionsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 3. Non prescription medications */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charNonPrescriptionMeds" 
                    checked={form4.charNonPrescriptionMeds} 
                    onCheckedChange={(c) => updateForm4('charNonPrescriptionMeds', !!c)} 
                  />
                  <Label htmlFor="charNonPrescriptionMeds" className="cursor-pointer text-sm">Medication regimen that includes one or more non prescription medications</Label>
                </div>
                {form4.charNonPrescriptionMeds && (
                  <Input 
                    value={form4.charNonPrescriptionMedsDetails} 
                    onChange={(e) => updateForm4('charNonPrescriptionMedsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 4. Natural health products */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charNaturalHealthProducts" 
                    checked={form4.charNaturalHealthProducts} 
                    onCheckedChange={(c) => updateForm4('charNaturalHealthProducts', !!c)} 
                  />
                  <Label htmlFor="charNaturalHealthProducts" className="cursor-pointer text-sm">Medication regimen that includes one or more natural health products</Label>
                </div>
                {form4.charNaturalHealthProducts && (
                  <Input 
                    value={form4.charNaturalHealthProductsDetails} 
                    onChange={(e) => updateForm4('charNaturalHealthProductsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 5. Unaddressed symptoms */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charUnaddressedSymptoms" 
                    checked={form4.charUnaddressedSymptoms} 
                    onCheckedChange={(c) => updateForm4('charUnaddressedSymptoms', !!c)} 
                  />
                  <Label htmlFor="charUnaddressedSymptoms" className="cursor-pointer text-sm">Symptoms that seem unaddressed by current pharmacotherapy</Label>
                </div>
                {form4.charUnaddressedSymptoms && (
                  <Input 
                    value={form4.charUnaddressedSymptomsDetails} 
                    onChange={(e) => updateForm4('charUnaddressedSymptomsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 6. Potential drug therapy problem */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charPotentialDrugProblem" 
                    checked={form4.charPotentialDrugProblem} 
                    onCheckedChange={(c) => updateForm4('charPotentialDrugProblem', !!c)} 
                  />
                  <Label htmlFor="charPotentialDrugProblem" className="cursor-pointer text-sm">Potential drug therapy problem that may be prevented</Label>
                </div>
                {form4.charPotentialDrugProblem && (
                  <Input 
                    value={form4.charPotentialDrugProblemDetails} 
                    onChange={(e) => updateForm4('charPotentialDrugProblemDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 7. Multiple prescribers */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charMultiplePrescribers" 
                    checked={form4.charMultiplePrescribers} 
                    onCheckedChange={(c) => updateForm4('charMultiplePrescribers', !!c)} 
                  />
                  <Label htmlFor="charMultiplePrescribers" className="cursor-pointer text-sm">Multiple prescribers</Label>
                </div>
                {form4.charMultiplePrescribers && (
                  <Input 
                    value={form4.charMultiplePrescribersDetails} 
                    onChange={(e) => updateForm4('charMultiplePrescribersDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 8. Early/late refills */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charEarlyLateRefills" 
                    checked={form4.charEarlyLateRefills} 
                    onCheckedChange={(c) => updateForm4('charEarlyLateRefills', !!c)} 
                  />
                  <Label htmlFor="charEarlyLateRefills" className="cursor-pointer text-sm">Issues relating to early +/or late refills</Label>
                </div>
                {form4.charEarlyLateRefills && (
                  <Input 
                    value={form4.charEarlyLateRefillsDetails} 
                    onChange={(e) => updateForm4('charEarlyLateRefillsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 9. Non-adherence */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charNonAdherence" 
                    checked={form4.charNonAdherence} 
                    onCheckedChange={(c) => updateForm4('charNonAdherence', !!c)} 
                  />
                  <Label htmlFor="charNonAdherence" className="cursor-pointer text-sm">Non-adherence</Label>
                </div>
                {form4.charNonAdherence && (
                  <Input 
                    value={form4.charNonAdherenceDetails} 
                    onChange={(e) => updateForm4('charNonAdherenceDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 10. Confused patient */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charConfusedPatient" 
                    checked={form4.charConfusedPatient} 
                    onCheckedChange={(c) => updateForm4('charConfusedPatient', !!c)} 
                  />
                  <Label htmlFor="charConfusedPatient" className="cursor-pointer text-sm">Patient seems confused about medication regimen</Label>
                </div>
                {form4.charConfusedPatient && (
                  <Input 
                    value={form4.charConfusedPatientDetails} 
                    onChange={(e) => updateForm4('charConfusedPatientDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 11. Lab monitoring */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charLabMonitoring" 
                    checked={form4.charLabMonitoring} 
                    onCheckedChange={(c) => updateForm4('charLabMonitoring', !!c)} 
                  />
                  <Label htmlFor="charLabMonitoring" className="cursor-pointer text-sm">Medication(s) that require routine laboratory monitoring</Label>
                </div>
                {form4.charLabMonitoring && (
                  <Input 
                    value={form4.charLabMonitoringDetails} 
                    onChange={(e) => updateForm4('charLabMonitoringDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 12. Abnormal lab results */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charAbnormalLabResults" 
                    checked={form4.charAbnormalLabResults} 
                    onCheckedChange={(c) => updateForm4('charAbnormalLabResults', !!c)} 
                  />
                  <Label htmlFor="charAbnormalLabResults" className="cursor-pointer text-sm">Abnormal lab results (blood work, creatinine clearance, etc)</Label>
                </div>
                {form4.charAbnormalLabResults && (
                  <Input 
                    value={form4.charAbnormalLabResultsDetails} 
                    onChange={(e) => updateForm4('charAbnormalLabResultsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 13. Planned admission */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charPlannedAdmission" 
                    checked={form4.charPlannedAdmission} 
                    onCheckedChange={(c) => updateForm4('charPlannedAdmission', !!c)} 
                  />
                  <Label htmlFor="charPlannedAdmission" className="cursor-pointer text-sm">Planned admission to a hospital or other health institution (i.e. – long-term care facility)</Label>
                </div>
                {form4.charPlannedAdmission && (
                  <Input 
                    value={form4.charPlannedAdmissionDetails} 
                    onChange={(e) => updateForm4('charPlannedAdmissionDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 14. Discharge/transition */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charDischargeTransition" 
                    checked={form4.charDischargeTransition} 
                    onCheckedChange={(c) => updateForm4('charDischargeTransition', !!c)} 
                  />
                  <Label htmlFor="charDischargeTransition" className="cursor-pointer text-sm">Discharge/transition from hospital to community or other healthcare institution (i.e. – long-term care facility)</Label>
                </div>
                {form4.charDischargeTransition && (
                  <Input 
                    value={form4.charDischargeTransitionDetails} 
                    onChange={(e) => updateForm4('charDischargeTransitionDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 15. Compliance packaging */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charCompliancePackaging" 
                    checked={form4.charCompliancePackaging} 
                    onCheckedChange={(c) => updateForm4('charCompliancePackaging', !!c)} 
                  />
                  <Label htmlFor="charCompliancePackaging" className="cursor-pointer text-sm">Initiating compliance packaging</Label>
                </div>
                {form4.charCompliancePackaging && (
                  <Input 
                    value={form4.charCompliancePackagingDetails} 
                    onChange={(e) => updateForm4('charCompliancePackagingDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 16. Renal function */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charRenalFunction" 
                    checked={form4.charRenalFunction} 
                    onCheckedChange={(c) => updateForm4('charRenalFunction', !!c)} 
                  />
                  <Label htmlFor="charRenalFunction" className="cursor-pointer text-sm">Known or suspected poor or unstable renal function</Label>
                </div>
                {form4.charRenalFunction && (
                  <Input 
                    value={form4.charRenalFunctionDetails} 
                    onChange={(e) => updateForm4('charRenalFunctionDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 17. Liver function */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charLiverFunction" 
                    checked={form4.charLiverFunction} 
                    onCheckedChange={(c) => updateForm4('charLiverFunction', !!c)} 
                  />
                  <Label htmlFor="charLiverFunction" className="cursor-pointer text-sm">Known or suspected poor or unstable liver function</Label>
                </div>
                {form4.charLiverFunction && (
                  <Input 
                    value={form4.charLiverFunctionDetails} 
                    onChange={(e) => updateForm4('charLiverFunctionDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 18. Other */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="charOther" 
                    checked={form4.charOther} 
                    onCheckedChange={(c) => updateForm4('charOther', !!c)} 
                  />
                  <Label htmlFor="charOther" className="cursor-pointer text-sm">Other (Specify)</Label>
                </div>
                {form4.charOther && (
                  <Input 
                    value={form4.charOtherDetails} 
                    onChange={(e) => updateForm4('charOtherDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>
            </div>
          </FormSection>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PAGE 3 - Medications and Therapeutic Issues */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <PageDivider pageNum={3} title="Medications & Therapeutic Issues" />
      
      <div className="space-y-6">
        {/* Sources Consulted */}
          <FormSection title="Sources Consulted to conduct this MedsCheck service">
            <Textarea 
              value={form4.sourcesConsultedNotes} 
              onChange={(e) => updateForm4('sourcesConsultedNotes', e.target.value)} 
              rows={3} 
              placeholder="Describe sources consulted..." 
            />
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Pharmacy Profile */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourcePharmacyProfile" 
                  checked={form4.sourcePharmacyProfile} 
                  onCheckedChange={(c) => updateForm4('sourcePharmacyProfile', !!c)} 
                />
                <Label htmlFor="sourcePharmacyProfile" className="cursor-pointer text-sm flex-1">Pharmacy Profile</Label>
                {form4.sourcePharmacyProfile && (
                  <Input 
                    value={form4.sourcePharmacyProfileDetails} 
                    onChange={(e) => updateForm4('sourcePharmacyProfileDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Physician / Nurse Practitioner */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourcePhysician" 
                  checked={form4.sourcePhysician} 
                  onCheckedChange={(c) => updateForm4('sourcePhysician', !!c)} 
                />
                <Label htmlFor="sourcePhysician" className="cursor-pointer text-sm flex-1">Physician / Nurse Practitioner</Label>
                {form4.sourcePhysician && (
                  <Input 
                    value={form4.sourcePhysicianDetails} 
                    onChange={(e) => updateForm4('sourcePhysicianDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Patient */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourcePatient" 
                  checked={form4.sourcePatient} 
                  onCheckedChange={(c) => updateForm4('sourcePatient', !!c)} 
                />
                <Label htmlFor="sourcePatient" className="cursor-pointer text-sm flex-1">Patient</Label>
                {form4.sourcePatient && (
                  <Input 
                    value={form4.sourcePatientDetails} 
                    onChange={(e) => updateForm4('sourcePatientDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Caregiver / Agent */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceCaregiver" 
                  checked={form4.sourceCaregiver} 
                  onCheckedChange={(c) => updateForm4('sourceCaregiver', !!c)} 
                />
                <Label htmlFor="sourceCaregiver" className="cursor-pointer text-sm flex-1">Caregiver / Agent</Label>
                {form4.sourceCaregiver && (
                  <Input 
                    value={form4.sourceCaregiverDetails} 
                    onChange={(e) => updateForm4('sourceCaregiverDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Another Pharmacy */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceAnotherPharmacy" 
                  checked={form4.sourceAnotherPharmacy} 
                  onCheckedChange={(c) => updateForm4('sourceAnotherPharmacy', !!c)} 
                />
                <Label htmlFor="sourceAnotherPharmacy" className="cursor-pointer text-sm flex-1">Another Pharmacy</Label>
                {form4.sourceAnotherPharmacy && (
                  <Input 
                    value={form4.sourceAnotherPharmacyDetails} 
                    onChange={(e) => updateForm4('sourceAnotherPharmacyDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Medication Packages */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceMedPackages" 
                  checked={form4.sourceMedPackages} 
                  onCheckedChange={(c) => updateForm4('sourceMedPackages', !!c)} 
                />
                <Label htmlFor="sourceMedPackages" className="cursor-pointer text-sm flex-1">Medication Packages</Label>
                {form4.sourceMedPackages && (
                  <Input 
                    value={form4.sourceMedPackagesDetails} 
                    onChange={(e) => updateForm4('sourceMedPackagesDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Laboratory / Test Values */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceLabValues" 
                  checked={form4.sourceLabValues} 
                  onCheckedChange={(c) => updateForm4('sourceLabValues', !!c)} 
                />
                <Label htmlFor="sourceLabValues" className="cursor-pointer text-sm flex-1">Laboratory / Test Values</Label>
                {form4.sourceLabValues && (
                  <Input 
                    value={form4.sourceLabValuesDetails} 
                    onChange={(e) => updateForm4('sourceLabValuesDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Electronic Health Record */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceEHR" 
                  checked={form4.sourceEHR} 
                  onCheckedChange={(c) => updateForm4('sourceEHR', !!c)} 
                />
                <Label htmlFor="sourceEHR" className="cursor-pointer text-sm flex-1">Electronic Health Record</Label>
                {form4.sourceEHR && (
                  <Input 
                    value={form4.sourceEHRDetails} 
                    onChange={(e) => updateForm4('sourceEHRDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Hospital / Other Facility */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceHospital" 
                  checked={form4.sourceHospital} 
                  onCheckedChange={(c) => updateForm4('sourceHospital', !!c)} 
                />
                <Label htmlFor="sourceHospital" className="cursor-pointer text-sm flex-1">Hospital / Other Facility</Label>
                {form4.sourceHospital && (
                  <Input 
                    value={form4.sourceHospitalDetails} 
                    onChange={(e) => updateForm4('sourceHospitalDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>

              {/* Other (Specify) */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-2">
                <Checkbox 
                  id="sourceOther" 
                  checked={form4.sourceOther} 
                  onCheckedChange={(c) => updateForm4('sourceOther', !!c)} 
                />
                <Label htmlFor="sourceOther" className="cursor-pointer text-sm flex-1">Other (Specify)</Label>
                {form4.sourceOther && (
                  <Input 
                    value={form4.sourceOtherDetails} 
                    onChange={(e) => updateForm4('sourceOtherDetails', e.target.value)} 
                    className="w-32 h-7 text-xs" 
                    placeholder="Details..." 
                  />
                )}
              </div>
            </div>
          </FormSection>

          {/* Current Medication List */}
          <FormSection title="Current Medication List">
            <p className="text-xs text-muted-foreground mb-3">
              (attach printed records if available. Information to populate MedsCheck Personal Medication Record where appropriate)
            </p>
            
            {form4.medications?.map((med, index) => (
              <div key={med.id} className="border border-border rounded-lg p-3 space-y-3 mb-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Medication {index + 1}</h4>
                  {(form4.medications?.length || 0) > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const newMeds = form4.medications?.filter(m => m.id !== med.id) || []
                        updateForm4('medications', newMeds)
                      }}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>

                <FormField label="Name of Drug/Product (generic/brand)" required>
                  <Input 
                    value={med.drugName} 
                    onChange={(e) => {
                      const newMeds = [...(form4.medications || [])]
                      newMeds[index] = { ...med, drugName: e.target.value }
                      updateForm4('medications', newMeds)
                    }}
                    className={!med.drugName.trim() ? 'border-destructive' : ''}
                  />
                </FormField>

                <FormField label="Strength of Drug/Product" required>
                  <Input 
                    value={med.strength} 
                    onChange={(e) => {
                      const newMeds = [...(form4.medications || [])]
                      newMeds[index] = { ...med, strength: e.target.value }
                      updateForm4('medications', newMeds)
                    }}
                  />
                </FormField>

                <FormField label="Dosage Form">
                  <Input 
                    value={med.dosageForm} 
                    onChange={(e) => {
                      const newMeds = [...(form4.medications || [])]
                      newMeds[index] = { ...med, dosageForm: e.target.value }
                      updateForm4('medications', newMeds)
                    }}
                    placeholder="tablet, capsule, etc."
                  />
                </FormField>

                <div className="grid grid-cols-4 gap-3">
                  <FormField label="Directions for Use">
                    <Input 
                      value={med.directionsForUse} 
                      onChange={(e) => {
                        const newMeds = [...(form4.medications || [])]
                        newMeds[index] = { ...med, directionsForUse: e.target.value }
                        updateForm4('medications', newMeds)
                      }}
                    />
                  </FormField>
                  <FormField label="Indication">
                    <Input 
                      value={med.indication} 
                      onChange={(e) => {
                        const newMeds = [...(form4.medications || [])]
                        newMeds[index] = { ...med, indication: e.target.value }
                        updateForm4('medications', newMeds)
                      }}
                    />
                  </FormField>
                  <FormField label="Adherence Issue">
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1">
                        <Checkbox 
                          checked={med.adherenceIssue === 'yes'} 
                          onCheckedChange={(c) => {
                            const newMeds = [...(form4.medications || [])]
                            newMeds[index] = { ...med, adherenceIssue: c ? 'yes' : '' }
                            updateForm4('medications', newMeds)
                          }}
                        />
                        <span className="text-xs">Yes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Checkbox 
                          checked={med.adherenceIssue === 'no'} 
                          onCheckedChange={(c) => {
                            const newMeds = [...(form4.medications || [])]
                            newMeds[index] = { ...med, adherenceIssue: c ? 'no' : '' }
                            updateForm4('medications', newMeds)
                          }}
                        />
                        <span className="text-xs">No</span>
                      </div>
                    </div>
                  </FormField>
                  <FormField label="Rx? OTC? NHP?">
                    <Input 
                      value={med.rxOtcNhp} 
                      onChange={(e) => {
                        const newMeds = [...(form4.medications || [])]
                        newMeds[index] = { ...med, rxOtcNhp: e.target.value }
                        updateForm4('medications', newMeds)
                      }}
                      placeholder="Rx / OTC / NHP"
                    />
                  </FormField>
                </div>

                <FormField label="Patient Comments (ie/ how they actually take it, side effects, etc.)">
                  <Textarea 
                    value={med.patientComments} 
                    onChange={(e) => {
                      const newMeds = [...(form4.medications || [])]
                      newMeds[index] = { ...med, patientComments: e.target.value }
                      updateForm4('medications', newMeds)
                    }}
                    rows={2}
                  />
                </FormField>

                <FormField label="Pharmacist Notes (ie/ disposition of drug therapy problem, recommendations, etc.)">
                  <Textarea 
                    value={med.pharmacistNotes} 
                    onChange={(e) => {
                      const newMeds = [...(form4.medications || [])]
                      newMeds[index] = { ...med, pharmacistNotes: e.target.value }
                      updateForm4('medications', newMeds)
                    }}
                    rows={2}
                  />
                </FormField>

                <FormField label="Comments for MedsCheck Record">
                  <Textarea 
                    value={med.commentsForRecord} 
                    onChange={(e) => {
                      const newMeds = [...(form4.medications || [])]
                      newMeds[index] = { ...med, commentsForRecord: e.target.value }
                      updateForm4('medications', newMeds)
                    }}
                    rows={2}
                  />
                </FormField>
              </div>
            ))}

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newMeds = [...(form4.medications || []), createEmptyForm4Medication()]
                  updateForm4('medications', newMeds)
                }}
                className="gap-1"
              >
                <Plus className="h-4 w-4" /> Add Medication
              </Button>
            </div>
          </FormSection>

          {/* Clinically Relevant Discontinued Medications */}
          <FormSection title="Clinically Relevant Discontinued Medications (if applicable)">
            {form4.discontinuedMedications?.map((med, index) => (
              <div key={med.id} className="border border-border rounded-lg p-3 space-y-3 mb-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Medication {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      const newMeds = form4.discontinuedMedications?.filter(m => m.id !== med.id) || []
                      updateForm4('discontinuedMedications', newMeds)
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>

                <FormField label="Name of Drug/Product, Strength, Dosage Form, Directions for use on Previous Record">
                  <Textarea 
                    value={med.nameStrengthFormDirections} 
                    onChange={(e) => {
                      const newMeds = [...(form4.discontinuedMedications || [])]
                      newMeds[index] = { ...med, nameStrengthFormDirections: e.target.value }
                      updateForm4('discontinuedMedications', newMeds)
                    }}
                    rows={2}
                  />
                </FormField>

                <FormField label="Notes (if applicable)">
                  <Textarea 
                    value={med.notes} 
                    onChange={(e) => {
                      const newMeds = [...(form4.discontinuedMedications || [])]
                      newMeds[index] = { ...med, notes: e.target.value }
                      updateForm4('discontinuedMedications', newMeds)
                    }}
                    rows={2}
                  />
                </FormField>
              </div>
            ))}

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newMeds = [...(form4.discontinuedMedications || []), createEmptyForm4DiscontinuedMed()]
                  updateForm4('discontinuedMedications', newMeds)
                }}
                className="gap-1"
              >
                <Plus className="h-4 w-4" /> Add Discontinued Medication
              </Button>
            </div>
          </FormSection>

          {/* Therapeutic Issues Identified */}
          <FormSection title="Therapeutic Issues Identified (if applicable)">
            {form4.therapeuticIssues?.map((issue, index) => (
              <div key={issue.id} className="border border-border rounded-lg p-3 space-y-3 mb-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Therapeutic Issue {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      const newIssues = form4.therapeuticIssues?.filter(i => i.id !== issue.id) || []
                      updateForm4('therapeuticIssues', newIssues)
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>

                <FormField label="Therapeutic Issue">
                  <Input 
                    value={issue.issue} 
                    onChange={(e) => {
                      const newIssues = [...(form4.therapeuticIssues || [])]
                      newIssues[index] = { ...issue, issue: e.target.value }
                      updateForm4('therapeuticIssues', newIssues)
                    }}
                    placeholder="Describe the therapeutic issue..."
                  />
                </FormField>

                <FormField label="Suggested Therapy">
                  <Textarea 
                    value={issue.suggestedTherapy} 
                    onChange={(e) => {
                      const newIssues = [...(form4.therapeuticIssues || [])]
                      newIssues[index] = { ...issue, suggestedTherapy: e.target.value }
                      updateForm4('therapeuticIssues', newIssues)
                    }}
                    rows={3}
                  />
                </FormField>

                <FormField label="Action Taken">
                  <Textarea 
                    value={issue.actionTaken} 
                    onChange={(e) => {
                      const newIssues = [...(form4.therapeuticIssues || [])]
                      newIssues[index] = { ...issue, actionTaken: e.target.value }
                      updateForm4('therapeuticIssues', newIssues)
                    }}
                    rows={3}
                  />
                </FormField>

                <FormField label="Notes">
                  <Textarea 
                    value={issue.notes} 
                    onChange={(e) => {
                      const newIssues = [...(form4.therapeuticIssues || [])]
                      newIssues[index] = { ...issue, notes: e.target.value }
                      updateForm4('therapeuticIssues', newIssues)
                    }}
                    rows={2}
                  />
                </FormField>
              </div>
            ))}

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newIssues = [...(form4.therapeuticIssues || []), createEmptyForm4TherapeuticIssue()]
                  updateForm4('therapeuticIssues', newIssues)
                }}
                className="gap-1"
              >
                <Plus className="h-4 w-4" /> Add Issue
              </Button>
            </div>
          </FormSection>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PAGE 4 - Follow-up and Completion */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <PageDivider pageNum={4} title="Follow-up & Completion" />
      
      <div className="space-y-6">
        {/* Checklist for Completeness */}
          <FormSection title="Checklist for Completeness">
            <div className="space-y-2">
              {/* 1. Asked about Rx medications */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkAskedRxFromOthers" 
                    checked={form4.checkAskedRxFromOthers} 
                    onCheckedChange={(c) => updateForm4('checkAskedRxFromOthers', !!c)} 
                  />
                  <Label htmlFor="checkAskedRxFromOthers" className="cursor-pointer text-sm">
                    Asked about Rx medications from other individuals, MD samples, pharmacies and care providers
                  </Label>
                </div>
                {form4.checkAskedRxFromOthers && (
                  <Input 
                    value={form4.checkAskedRxFromOthersDetails} 
                    onChange={(e) => updateForm4('checkAskedRxFromOthersDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 2. List of meds removed */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkMedsRemovedFromHome" 
                    checked={form4.checkMedsRemovedFromHome} 
                    onCheckedChange={(c) => updateForm4('checkMedsRemovedFromHome', !!c)} 
                  />
                  <Label htmlFor="checkMedsRemovedFromHome" className="cursor-pointer text-sm">
                    List of meds removed from home if applicable
                  </Label>
                </div>
                {form4.checkMedsRemovedFromHome && (
                  <Input 
                    value={form4.checkMedsRemovedFromHomeDetails} 
                    onChange={(e) => updateForm4('checkMedsRemovedFromHomeDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 3. Asked about OTC products */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkAskedOTCProducts" 
                    checked={form4.checkAskedOTCProducts} 
                    onCheckedChange={(c) => updateForm4('checkAskedOTCProducts', !!c)} 
                  />
                  <Label htmlFor="checkAskedOTCProducts" className="cursor-pointer text-sm">
                    Asked about OTC products purchased or obtained from another individual (including specifically ASA)
                  </Label>
                </div>
                {form4.checkAskedOTCProducts && (
                  <Input 
                    value={form4.checkAskedOTCProductsDetails} 
                    onChange={(e) => updateForm4('checkAskedOTCProductsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 4. Asked about herbal */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkAskedHerbalProducts" 
                    checked={form4.checkAskedHerbalProducts} 
                    onCheckedChange={(c) => updateForm4('checkAskedHerbalProducts', !!c)} 
                  />
                  <Label htmlFor="checkAskedHerbalProducts" className="cursor-pointer text-sm">
                    Asked about herbal or natural health products purchased or obtained from another individual
                  </Label>
                </div>
                {form4.checkAskedHerbalProducts && (
                  <Input 
                    value={form4.checkAskedHerbalProductsDetails} 
                    onChange={(e) => updateForm4('checkAskedHerbalProductsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 5. Prompted for dosage forms */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkPromptedDosageForms" 
                    checked={form4.checkPromptedDosageForms} 
                    onCheckedChange={(c) => updateForm4('checkPromptedDosageForms', !!c)} 
                  />
                  <Label htmlFor="checkPromptedDosageForms" className="cursor-pointer text-sm">
                    Prompted for specific dosage forms which are often forgotten (ie/ inhalers, topicals, eye drops, nasal sprays, patches, injectables, etc.)
                  </Label>
                </div>
                {form4.checkPromptedDosageForms && (
                  <Input 
                    value={form4.checkPromptedDosageFormsDetails} 
                    onChange={(e) => updateForm4('checkPromptedDosageFormsDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 6. Asked about anti-infectives */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkAskedAntiInfectives" 
                    checked={form4.checkAskedAntiInfectives} 
                    onCheckedChange={(c) => updateForm4('checkAskedAntiInfectives', !!c)} 
                  />
                  <Label htmlFor="checkAskedAntiInfectives" className="cursor-pointer text-sm">
                    Asked about anti-infectives used in the last 3 months
                  </Label>
                </div>
                {form4.checkAskedAntiInfectives && (
                  <Input 
                    value={form4.checkAskedAntiInfectivesDetails} 
                    onChange={(e) => updateForm4('checkAskedAntiInfectivesDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 7. Referenced attached notes */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkReferencedNotes" 
                    checked={form4.checkReferencedNotes} 
                    onCheckedChange={(c) => updateForm4('checkReferencedNotes', !!c)} 
                  />
                  <Label htmlFor="checkReferencedNotes" className="cursor-pointer text-sm">
                    Referenced attached notes, results, references as appropriate
                  </Label>
                </div>
                {form4.checkReferencedNotes && (
                  <Input 
                    value={form4.checkReferencedNotesDetails} 
                    onChange={(e) => updateForm4('checkReferencedNotesDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 8. Discussed circle of care */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkDiscussedCircleOfCare" 
                    checked={form4.checkDiscussedCircleOfCare} 
                    onCheckedChange={(c) => updateForm4('checkDiscussedCircleOfCare', !!c)} 
                  />
                  <Label htmlFor="checkDiscussedCircleOfCare" className="cursor-pointer text-sm">
                    Discussed circle of care, sharing information with other providers and the patient's responsibility for providing accurate information
                  </Label>
                </div>
                {form4.checkDiscussedCircleOfCare && (
                  <Input 
                    value={form4.checkDiscussedCircleOfCareDetails} 
                    onChange={(e) => updateForm4('checkDiscussedCircleOfCareDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 9. Discussed completion date */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkDiscussedCompletionDate" 
                    checked={form4.checkDiscussedCompletionDate} 
                    onCheckedChange={(c) => updateForm4('checkDiscussedCompletionDate', !!c)} 
                  />
                  <Label htmlFor="checkDiscussedCompletionDate" className="cursor-pointer text-sm">
                    Discussed anticipated date of completion of patient's MedsCheck Personal Medication Record (if not available at the time of the MedsCheck)
                  </Label>
                </div>
                {form4.checkDiscussedCompletionDate && (
                  <Input 
                    value={form4.checkDiscussedCompletionDateDetails} 
                    onChange={(e) => updateForm4('checkDiscussedCompletionDateDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 10. Ensure documented */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checkEnsureDocumented" 
                    checked={form4.checkEnsureDocumented} 
                    onCheckedChange={(c) => updateForm4('checkEnsureDocumented', !!c)} 
                  />
                  <Label htmlFor="checkEnsureDocumented" className="cursor-pointer text-sm">
                    Ensure clinically relevant information is documented and readily retrievable for continuity of care and for audit purposes
                  </Label>
                </div>
                {form4.checkEnsureDocumented && (
                  <Input 
                    value={form4.checkEnsureDocumentedDetails} 
                    onChange={(e) => updateForm4('checkEnsureDocumentedDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>

              {/* 11. Other */}
              <div className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="checklistOther" 
                    checked={form4.checklistOther} 
                    onCheckedChange={(c) => updateForm4('checklistOther', !!c)} 
                  />
                  <Label htmlFor="checklistOther" className="cursor-pointer text-sm">Other (Specify)</Label>
                </div>
                {form4.checklistOther && (
                  <Input 
                    value={form4.checklistOtherDetails} 
                    onChange={(e) => updateForm4('checklistOtherDetails', e.target.value)} 
                    placeholder="Details..." 
                    className="ml-6" 
                  />
                )}
              </div>
            </div>
          </FormSection>

          {/* Plan for Follow Up */}
          <FormSection title="Plan for Follow Up">
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="followUpWithProviders" 
                  checked={form4.followUpWithProviders} 
                  onCheckedChange={(c) => updateForm4('followUpWithProviders', !!c)} 
                />
                <Label htmlFor="followUpWithProviders" className="cursor-pointer text-sm font-medium">
                  Healthcare providers with whom to communicate
                </Label>
              </div>

              {form4.followUpWithProviders && (
                <div className="ml-6 space-y-4">
                  {form4.healthcareProviders?.map((provider, index) => (
                    <div key={provider.id} className="border border-border/50 rounded-lg p-3 space-y-3 bg-muted/20">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Health Care Provider {index + 1}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            const newProviders = form4.healthcareProviders?.filter(p => p.id !== provider.id) || []
                            updateForm4('healthcareProviders', newProviders)
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Last Name">
                          <Input 
                            value={provider.lastName} 
                            onChange={(e) => {
                              const newProviders = [...form4.healthcareProviders]
                              newProviders[index] = { ...provider, lastName: e.target.value }
                              updateForm4('healthcareProviders', newProviders)
                            }}
                          />
                        </FormField>
                        <FormField label="First Name">
                          <Input 
                            value={provider.firstName} 
                            onChange={(e) => {
                              const newProviders = [...form4.healthcareProviders]
                              newProviders[index] = { ...provider, firstName: e.target.value }
                              updateForm4('healthcareProviders', newProviders)
                            }}
                          />
                        </FormField>
                      </div>

                      <FormField label="Health Related Specialty">
                        <Input 
                          value={provider.specialty} 
                          onChange={(e) => {
                            const newProviders = [...form4.healthcareProviders]
                            newProviders[index] = { ...provider, specialty: e.target.value }
                            updateForm4('healthcareProviders', newProviders)
                          }}
                          placeholder="e.g., Family Medicine, Cardiology, etc."
                        />
                      </FormField>
                    </div>
                  ))}

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const newProviders = [...form4.healthcareProviders, createEmptyForm4HealthcareProvider()]
                      updateForm4('healthcareProviders', newProviders)
                    }}
                    className="gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add Health Care Provider
                  </Button>
                </div>
              )}
            </div>
          </FormSection>

          {/* Summary and Goals */}
          <FormSection title="Summary and Goals">
            <p className="text-xs text-muted-foreground mb-3">
              (information to be added to the MedsCheck Patient Take-Home Summary)
            </p>

            <FormField label="Summary of today's discussion" required>
              <Textarea 
                value={form4.summaryOfDiscussion} 
                onChange={(e) => updateForm4('summaryOfDiscussion', e.target.value)} 
                rows={4} 
                placeholder="Summarize the key points discussed during the MedsCheck..."
                className={getValidationClass(form4.summaryOfDiscussion, true)}
              />
            </FormField>

            <FormField label="Patient Goals" required>
              <Textarea 
                value={form4.patientGoals} 
                onChange={(e) => updateForm4('patientGoals', e.target.value)} 
                rows={4} 
                placeholder="What are the patient's health and medication goals?"
                className={getValidationClass(form4.patientGoals, true)}
              />
            </FormField>

            <FormField label="What I will Do to Get There">
              <Textarea 
                value={form4.whatIWillDo} 
                onChange={(e) => updateForm4('whatIWillDo', e.target.value)} 
                rows={4} 
                placeholder="Action steps the patient will take to achieve their goals..."
              />
            </FormField>

            <FormField label="List of resources and contacts provided">
              <Textarea 
                value={form4.resourcesAndContacts} 
                onChange={(e) => updateForm4('resourcesAndContacts', e.target.value)} 
                rows={3} 
                placeholder="Resources, websites, phone numbers, etc."
              />
            </FormField>

            <FormField label="Other Follow-up Planning and referrals">
              <Textarea 
                value={form4.otherFollowUp} 
                onChange={(e) => updateForm4('otherFollowUp', e.target.value)} 
                rows={3} 
                placeholder="Any additional follow-up plans or referrals..."
              />
            </FormField>
          </FormSection>

          {/* Prepared By */}
          <FormSection title="Prepared By">
            <FormField label="Pharmacist Full Name (Last Name, First Name)" required>
              <Input 
                value={form4.pharmacistFullName} 
                onChange={(e) => updateForm4('pharmacistFullName', e.target.value)} 
                placeholder="Last Name, First Name"
                className={getValidationClass(form4.pharmacistFullName, true)}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="OCP Number" required>
                <Input 
                  value={form4.ocpNumber} 
                  onChange={(e) => updateForm4('ocpNumber', e.target.value)} 
                  placeholder="e.g., 123456"
                  className={getValidationClass(form4.ocpNumber, true)}
                />
              </FormField>
              <FormField label="Date of MedsCheck Review (yyyy/mm/dd)" required>
                <Input 
                  type="date" 
                  value={form4.medsCheckReviewDate} 
                  onChange={(e) => updateForm4('medsCheckReviewDate', e.target.value)}
                  className={getValidationClass(form4.medsCheckReviewDate, true)}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Appointment Time of MedsCheck Review">
                <Input 
                  type="time" 
                  value={form4.appointmentTime} 
                  onChange={(e) => updateForm4('appointmentTime', e.target.value)}
                />
              </FormField>
              <FormField label="Date MedsCheck Documentation Completed (yyyy/mm/dd)" required>
                <Input 
                  type="date" 
                  value={form4.documentationCompletedDate} 
                  onChange={(e) => updateForm4('documentationCompletedDate', e.target.value)}
                  className={getValidationClass(form4.documentationCompletedDate, true)}
                />
              </FormField>
            </div>
          </FormSection>
      </div>

      {/* End of Form Indicator */}
      <div className="text-center py-8 border-t-2 border-primary/30 mt-8">
        <p className="text-sm text-muted-foreground">
          ✓ End of Form 4 — Use the right panel to preview and download the completed PDF
        </p>
      </div>
    </div>
  )
}




