import { Input } from '@/components/ui/input'
import { FormSection, FormRow, FormField } from './FormSection'
import { useFormData } from '@/context/FormDataContext'

export function PharmacyInfoSection() {
  const { data, updateField } = useFormData()
  const pharmacy = data.pharmacy

  return (
    <FormSection title="Pharmacy Information">
      <FormField label="Pharmacy Name" required>
        <Input
          value={pharmacy.name}
          onChange={(e) => updateField('pharmacy.name', e.target.value)}
          placeholder="Pharmacy name"
        />
      </FormField>

      <FormField label="Address">
        <Input
          value={pharmacy.address}
          onChange={(e) => updateField('pharmacy.address', e.target.value)}
          placeholder="Street address"
        />
      </FormField>

      <FormRow>
        <FormField label="City">
          <Input
            value={pharmacy.city}
            onChange={(e) => updateField('pharmacy.city', e.target.value)}
            placeholder="City"
          />
        </FormField>
        <FormField label="Postal Code">
          <Input
            value={pharmacy.postalCode}
            onChange={(e) => updateField('pharmacy.postalCode', e.target.value.toUpperCase())}
            placeholder="A1A 1A1"
            maxLength={7}
          />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Phone">
          <Input
            type="tel"
            value={pharmacy.phone}
            onChange={(e) => updateField('pharmacy.phone', e.target.value)}
            placeholder="(XXX) XXX-XXXX"
          />
        </FormField>
        <FormField label="Fax">
          <Input
            type="tel"
            value={pharmacy.fax}
            onChange={(e) => updateField('pharmacy.fax', e.target.value)}
            placeholder="(XXX) XXX-XXXX"
          />
        </FormField>
      </FormRow>

      <FormField label="Accreditation Number">
        <Input
          value={pharmacy.accreditationNumber}
          onChange={(e) => updateField('pharmacy.accreditationNumber', e.target.value)}
          placeholder="OCP Accreditation #"
        />
      </FormField>

      <FormRow>
        <FormField label="Pharmacist Name" required>
          <Input
            value={pharmacy.pharmacistName}
            onChange={(e) => updateField('pharmacy.pharmacistName', e.target.value)}
            placeholder="Pharmacist name"
          />
        </FormField>
        <FormField label="License Number">
          <Input
            value={pharmacy.pharmacistLicenseNumber}
            onChange={(e) => updateField('pharmacy.pharmacistLicenseNumber', e.target.value)}
            placeholder="OCP License #"
          />
        </FormField>
      </FormRow>

      <FormField label="Signature Date">
        <Input
          type="date"
          value={pharmacy.pharmacistSignatureDate}
          onChange={(e) => updateField('pharmacy.pharmacistSignatureDate', e.target.value)}
        />
      </FormField>
    </FormSection>
  )
}
