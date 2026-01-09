import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormSection, FormRow, FormField } from './FormSection'
import { useFormData } from '@/context/FormDataContext'

export function PatientInfoSection() {
  const { data, updateField } = useFormData()
  const patient = data.patient

  return (
    <FormSection title="Patient Information">
      <FormRow>
        <FormField label="First Name" required>
          <Input
            value={patient.firstName}
            onChange={(e) => updateField('patient.firstName', e.target.value)}
            placeholder="First name"
          />
        </FormField>
        <FormField label="Last Name" required>
          <Input
            value={patient.lastName}
            onChange={(e) => updateField('patient.lastName', e.target.value)}
            placeholder="Last name"
          />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Date of Birth" required>
          <Input
            type="date"
            value={patient.dateOfBirth}
            onChange={(e) => updateField('patient.dateOfBirth', e.target.value)}
          />
        </FormField>
        <FormField label="Health Card Number">
          <Input
            value={patient.healthCardNumber}
            onChange={(e) => updateField('patient.healthCardNumber', e.target.value)}
            placeholder="XXXX-XXX-XXX-XX"
          />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Gender">
          <Select
            value={patient.gender}
            onValueChange={(value) => updateField('patient.gender', value)}
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
        <FormField label="Preferred Language">
          <Select
            value={patient.preferredLanguage}
            onValueChange={(value) => updateField('patient.preferredLanguage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>

      <FormField label="Address">
        <Input
          value={patient.address}
          onChange={(e) => updateField('patient.address', e.target.value)}
          placeholder="Street address"
        />
      </FormField>

      <FormRow>
        <FormField label="City">
          <Input
            value={patient.city}
            onChange={(e) => updateField('patient.city', e.target.value)}
            placeholder="City"
          />
        </FormField>
        <FormField label="Province">
          <Select
            value={patient.province}
            onValueChange={(value) => updateField('patient.province', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ontario">Ontario</SelectItem>
              <SelectItem value="Quebec">Quebec</SelectItem>
              <SelectItem value="British Columbia">British Columbia</SelectItem>
              <SelectItem value="Alberta">Alberta</SelectItem>
              <SelectItem value="Manitoba">Manitoba</SelectItem>
              <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
              <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
              <SelectItem value="New Brunswick">New Brunswick</SelectItem>
              <SelectItem value="Newfoundland and Labrador">Newfoundland and Labrador</SelectItem>
              <SelectItem value="Prince Edward Island">Prince Edward Island</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Postal Code">
          <Input
            value={patient.postalCode}
            onChange={(e) => updateField('patient.postalCode', e.target.value.toUpperCase())}
            placeholder="A1A 1A1"
            maxLength={7}
          />
        </FormField>
        <FormField label="Phone">
          <Input
            type="tel"
            value={patient.phone}
            onChange={(e) => updateField('patient.phone', e.target.value)}
            placeholder="(XXX) XXX-XXXX"
          />
        </FormField>
      </FormRow>

      <FormField label="Email">
        <Input
          type="email"
          value={patient.email}
          onChange={(e) => updateField('patient.email', e.target.value)}
          placeholder="email@example.com"
        />
      </FormField>
    </FormSection>
  )
}
