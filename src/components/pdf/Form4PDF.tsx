import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

interface Form4PDFProps {
  data: MedsCheckFormData
}

// Register Times New Roman font (using built-in Times-Roman as fallback)
// For true Times New Roman, you'd need to register the actual font file

// Styles for Form 4 - Pharmacist Worksheet matching government form
const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 9,
    fontFamily: 'Times-Roman',
    lineHeight: 1.2,
    color: '#000000',
    backgroundColor: '#FFFFFF'
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 6
  },
  logo: {
    height: 30,
    width: 80,
    objectFit: 'contain'
  },
  medsCheckLogoImage: {
    height: 30,
    width: 120,
    objectFit: 'contain'
  },
  title: {
    fontSize: 15,
    fontFamily: 'Times-Bold',
    marginBottom: 4
  },
  serviceRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 8
  },
  serviceLabel: {
    fontSize: 9,
    padding: 3,
    width: 140
  },
  serviceValue: {
    fontSize: 9,
    padding: 3,
    flex: 1,
    backgroundColor: '#E8EEF7',
    borderLeftWidth: 0.5,
    borderLeftColor: '#000'
  },
  // Section Headers - blue background
  sectionHeader: {
    backgroundColor: '#D0D8E8',
    padding: 4,
    fontSize: 10,
    fontFamily: 'Times-Bold',
    marginTop: 6,
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: '#000',
    borderBottomWidth: 0
  },
  // Table structure
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000',
    borderTopWidth: 0
  },
  tableRowFirst: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000'
  },
  tableCell: {
    borderRightWidth: 0.5,
    borderRightColor: '#000'
  },
  tableCellLast: {
    // No right border
  },
  cellLabel: {
    fontSize: 8,
    padding: 2,
    backgroundColor: '#FFFFFF'
  },
  cellValue: {
    fontSize: 9,
    color: '#00008B',
    padding: 3,
    backgroundColor: '#E8EEF7',
    minHeight: 14
  },
  // Two-column fields
  halfCell: {
    flex: 1
  },
  thirdCell: {
    flex: 1
  },
  quarterCell: {
    flex: 1
  },
  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#000',
    borderTopWidth: 0
  },
  checkbox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 4
  },
  checkboxChecked: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    marginRight: 4
  },
  checkboxLabel: {
    fontSize: 8,
    flex: 1
  },
  // Subsection for interview location
  subSection: {
    marginLeft: 0,
    borderWidth: 0.5,
    borderColor: '#000',
    borderTopWidth: 0
  },
  subSectionHeader: {
    fontSize: 9,
    padding: 3,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000'
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontSize: 7,
    borderTopWidth: 0.5,
    borderTopColor: '#999',
    paddingTop: 4
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  footerRight: {
    textAlign: 'right'
  },
  opaLogo: {
    fontSize: 8,
    color: '#0066CC'
  }
})

// Helper function for checkbox display
function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={checked ? styles.checkboxChecked : styles.checkbox}>
      {checked && <Text style={{ color: '#FFF', fontSize: 7, textAlign: 'center' }}>✓</Text>}
    </View>
  )
}

// Helper to format service type label
function getServiceLabel(type: string): string {
  const labels: Record<string, string> = {
    annual: 'MedsCheck Annual',
    followup: 'MedsCheck Follow-up',
    diabetes_annual: 'MedsCheck for Diabetes Annual',
    diabetes_followup: 'MedsCheck for Diabetes Follow-up',
    at_home: 'MedsCheck at Home'
  }
  return labels[type] || ''
}

interface Form4PDFProps {
  data: MedsCheckFormData
}

// Export just the page content for consolidated PDF
export function Form4Page({ data }: Form4PDFProps) {
  const form4 = data.form4

  return (
    <>
      {/* PAGE 1 - Demographics and Interview Location */}
      <Page size="LETTER" style={styles.page}>
        {/* Header with logos */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={styles.logo} />
          <Image src='/medscheck-logo.png' style={styles.medsCheckLogoImage} />
        </View>

        {/* Title */}
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.title}>Pharmacists Worksheet</Text>
        </View>

        {/* MedsCheck Service Provided */}
        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>MedsCheck Service Provided</Text>
          <Text style={styles.serviceValue}>{getServiceLabel(form4.serviceProvided)}</Text>
        </View>

        {/* Patient Information */}
        <Text style={styles.sectionHeader}>Patient Information</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCell, styles.halfCell]}>
            <Text style={styles.cellLabel}>Last Name</Text>
            <Text style={styles.cellValue}>{form4.patientLastName}</Text>
          </View>
          <View style={[styles.tableCellLast, styles.halfCell]}>
            <Text style={styles.cellLabel}>First Name</Text>
            <Text style={styles.cellValue}>{form4.patientFirstName}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.quarterCell]}>
            <Text style={styles.cellLabel}>Gender</Text>
            <Text style={styles.cellValue}>{form4.patientGender}</Text>
          </View>
          <View style={[styles.tableCell, styles.quarterCell]}>
            <Text style={styles.cellLabel}>Date of Birth (yyyy/mm/dd)</Text>
            <Text style={styles.cellValue}>{form4.patientDOB}</Text>
          </View>
          <View style={[styles.tableCell, styles.quarterCell]}>
            <Text style={styles.cellLabel}>Health Card Number</Text>
            <Text style={styles.cellValue}>{form4.patientHealthCardNumber}</Text>
          </View>
          <View style={[styles.tableCellLast, styles.quarterCell]}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form4.patientPhone}</Text>
          </View>
        </View>

        {/* Patient Address */}
        <Text style={styles.sectionHeader}>Patient Address</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCell, { width: 60 }]}>
            <Text style={styles.cellLabel}>Unit Number</Text>
            <Text style={styles.cellValue}>{form4.patientUnitNumber}</Text>
          </View>
          <View style={[styles.tableCell, { width: 70 }]}>
            <Text style={styles.cellLabel}>Street Number</Text>
            <Text style={styles.cellValue}>{form4.patientStreetNumber}</Text>
          </View>
          <View style={[styles.tableCell, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Street Name</Text>
            <Text style={styles.cellValue}>{form4.patientStreetName}</Text>
          </View>
          <View style={[styles.tableCellLast, { width: 60 }]}>
            <Text style={styles.cellLabel}>PO Box</Text>
            <Text style={styles.cellValue}>{form4.patientPOBox}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 1 }]}>
            <Text style={styles.cellLabel}>City/Town</Text>
            <Text style={styles.cellValue}>{form4.patientCity}</Text>
          </View>
          <View style={[styles.tableCell, { width: 100 }]}>
            <Text style={styles.cellLabel}>Province</Text>
            <Text style={styles.cellValue}>{form4.patientProvince}</Text>
          </View>
          <View style={[styles.tableCellLast, { width: 80 }]}>
            <Text style={styles.cellLabel}>Postal Code</Text>
            <Text style={styles.cellValue}>{form4.patientPostalCode}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Email Address</Text>
            <Text style={styles.cellValue}>{form4.patientEmail}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Date Patient Signed Annual Acknowledgement Form (yyyy/mm/dd)</Text>
            <Text style={styles.cellValue}>{form4.patientAcknowledgementDate}</Text>
          </View>
        </View>

        {/* Caregiver/Patient's Agent Information */}
        <Text style={styles.sectionHeader}>Caregiver/Patient's Agent Information</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCell, styles.halfCell]}>
            <Text style={styles.cellLabel}>Last Name</Text>
            <Text style={styles.cellValue}>{form4.caregiverLastName}</Text>
          </View>
          <View style={[styles.tableCellLast, styles.halfCell]}>
            <Text style={styles.cellLabel}>First Name</Text>
            <Text style={styles.cellValue}>{form4.caregiverFirstName}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.halfCell]}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form4.caregiverPhone}</Text>
          </View>
          <View style={[styles.tableCellLast, styles.halfCell]}>
            <Text style={styles.cellLabel}>Email Address</Text>
            <Text style={styles.cellValue}>{form4.caregiverEmail}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Notes</Text>
            <Text style={[styles.cellValue, { minHeight: 20 }]}>{form4.caregiverNotes}</Text>
          </View>
        </View>

        {/* Primary Care Provider */}
        <Text style={styles.sectionHeader}>Primary Care Provider</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCell, styles.thirdCell]}>
            <Text style={styles.cellLabel}>Last Name</Text>
            <Text style={styles.cellValue}>{form4.providerLastName}</Text>
          </View>
          <View style={[styles.tableCell, styles.thirdCell]}>
            <Text style={styles.cellLabel}>First Name</Text>
            <Text style={styles.cellValue}>{form4.providerFirstName}</Text>
          </View>
          <View style={[styles.tableCellLast, styles.thirdCell]}>
            <Text style={styles.cellLabel}>Designation</Text>
            <Text style={styles.cellValue}>{form4.providerDesignation}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.thirdCell]}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form4.providerPhone}</Text>
          </View>
          <View style={[styles.tableCell, styles.thirdCell]}>
            <Text style={styles.cellLabel}>Fax Number</Text>
            <Text style={styles.cellValue}>{form4.providerFax}</Text>
          </View>
          <View style={[styles.tableCellLast, styles.thirdCell]}>
            <Text style={styles.cellLabel}>Email Address</Text>
            <Text style={styles.cellValue}>{form4.providerEmail}</Text>
          </View>
        </View>

        {/* Known Allergies and Intolerances */}
        <Text style={styles.sectionHeader}>Known Allergies and Intolerances</Text>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.noKnownAllergies} />
          <Text style={styles.checkboxLabel}>Select if there are no known allergies or intolerances</Text>
        </View>
        {!form4.noKnownAllergies && (
          <View style={styles.tableRow}>
            <View style={[styles.tableCellLast, { flex: 1 }]}>
              <Text style={[styles.cellValue, { minHeight: 24 }]}>{form4.knownAllergies}</Text>
            </View>
          </View>
        )}

        {/* Interview Conducted At */}
        <Text style={styles.sectionHeader}>Interview Conducted At</Text>
        
        {/* Pharmacy Option */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.interviewLocation === 'pharmacy'} />
          <Text style={styles.checkboxLabel}>Pharmacy</Text>
        </View>
        {form4.interviewLocation === 'pharmacy' && (
          <View style={styles.subSection}>
            <View style={styles.tableRowFirst}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Pharmacy Name</Text>
                <Text style={styles.cellValue}>{form4.pharmacyName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { width: 60 }]}>
                <Text style={styles.cellLabel}>Unit Number</Text>
                <Text style={styles.cellValue}>{form4.pharmacyUnitNumber}</Text>
              </View>
              <View style={[styles.tableCell, { width: 70 }]}>
                <Text style={styles.cellLabel}>Street Number</Text>
                <Text style={styles.cellValue}>{form4.pharmacyStreetNumber}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Street Name</Text>
                <Text style={styles.cellValue}>{form4.pharmacyStreetName}</Text>
              </View>
              <View style={[styles.tableCellLast, { width: 60 }]}>
                <Text style={styles.cellLabel}>PO Box</Text>
                <Text style={styles.cellValue}>{form4.pharmacyPOBox}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.cellLabel}>City/Town</Text>
                <Text style={styles.cellValue}>{form4.pharmacyCity}</Text>
              </View>
              <View style={[styles.tableCell, { width: 100 }]}>
                <Text style={styles.cellLabel}>Province</Text>
                <Text style={styles.cellValue}>{form4.pharmacyProvince}</Text>
              </View>
              <View style={[styles.tableCellLast, { width: 80 }]}>
                <Text style={styles.cellLabel}>Postal Code</Text>
                <Text style={styles.cellValue}>{form4.pharmacyPostalCode}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Patient's Home Option */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.interviewLocation === 'home'} />
          <Text style={styles.checkboxLabel}>Patient's Home</Text>
        </View>
        {form4.interviewLocation === 'home' && (
          <View style={styles.subSection}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { width: 60 }]}>
                <Text style={styles.cellLabel}>Unit Number</Text>
                <Text style={styles.cellValue}>{form4.homeUnitNumber}</Text>
              </View>
              <View style={[styles.tableCell, { width: 70 }]}>
                <Text style={styles.cellLabel}>Street Number</Text>
                <Text style={styles.cellValue}>{form4.homeStreetNumber}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Street Name</Text>
                <Text style={styles.cellValue}>{form4.homeStreetName}</Text>
              </View>
              <View style={[styles.tableCellLast, { width: 60 }]}>
                <Text style={styles.cellLabel}>PO Box</Text>
                <Text style={styles.cellValue}>{form4.homePOBox}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.cellLabel}>City/Town</Text>
                <Text style={styles.cellValue}>{form4.homeCity}</Text>
              </View>
              <View style={[styles.tableCell, { width: 100 }]}>
                <Text style={styles.cellLabel}>Province</Text>
                <Text style={styles.cellValue}>{form4.homeProvince}</Text>
              </View>
              <View style={[styles.tableCellLast, { width: 80 }]}>
                <Text style={styles.cellLabel}>Postal Code</Text>
                <Text style={styles.cellValue}>{form4.homePostalCode}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>4967-47E (2022/11)</Text>
            <Text>© King's Printer for Ontario, 2022</Text>
            <Text style={styles.opaLogo}>ONTARIO PHARMACISTS ASSOCIATION</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>Disponible en français</Text>
            <Text>Page 1 of 4</Text>
          </View>
        </View>
      </Page>

      {/* PAGE 2 - Lifestyle and Clinical Assessment */}
      <Page size="LETTER" style={styles.page}>
        {/* Lifestyle Information */}
        <Text style={styles.sectionHeader}>Lifestyle Information</Text>
        
        {/* Tobacco Row */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.tobacco} />
          <Text style={styles.checkboxLabel}>Tobacco</Text>
          {form4.tobacco && (
            <>
              <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox checked={form4.tobaccoYesNo === 'yes'} />
                <Text style={{ fontSize: 8, marginRight: 8 }}>Yes</Text>
                <Checkbox checked={form4.tobaccoYesNo === 'no'} />
                <Text style={{ fontSize: 8, marginRight: 8 }}>No</Text>
              </View>
              <Text style={{ fontSize: 8 }}>{form4.tobaccoCigPerDay} cig/day</Text>
            </>
          )}
        </View>

        {/* Smoking Cessation Row */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.smokingCessation} />
          <Text style={styles.checkboxLabel}>Smoking Cessation status</Text>
          {form4.smokingCessation && form4.smokingCessationStatus && (
            <Text style={{ fontSize: 8, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.smokingCessationStatus}</Text>
          )}
        </View>

        {/* Recreational Drug Use Row */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.recreationalDrugUse} />
          <Text style={styles.checkboxLabel}>Recreational Drug Use</Text>
          {form4.recreationalDrugUse && (
            <>
              <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox checked={form4.recreationalDrugYesNo === 'yes'} />
                <Text style={{ fontSize: 8, marginRight: 8 }}>Yes</Text>
                <Checkbox checked={form4.recreationalDrugYesNo === 'no'} />
                <Text style={{ fontSize: 8, marginRight: 8 }}>No</Text>
              </View>
              <Text style={{ fontSize: 8 }}>Frequency: {form4.recreationalDrugFrequency}</Text>
            </>
          )}
        </View>

        {/* Alcohol Use Row */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.alcoholUse} />
          <Text style={styles.checkboxLabel}>Alcohol Use</Text>
          {form4.alcoholUse && (
            <>
              <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox checked={form4.alcoholYesNo === 'yes'} />
                <Text style={{ fontSize: 8, marginRight: 8 }}>Yes</Text>
                <Checkbox checked={form4.alcoholYesNo === 'no'} />
                <Text style={{ fontSize: 8, marginRight: 8 }}>No</Text>
              </View>
              <Text style={{ fontSize: 8 }}>Frequency: {form4.alcoholFrequency}</Text>
            </>
          )}
        </View>

        {/* Exercise Regimen Row */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.exerciseRegimen} />
          <Text style={styles.checkboxLabel}>Exercise Regimen</Text>
          {form4.exerciseRegimen && form4.exerciseRegimenDetails && (
            <Text style={{ fontSize: 8, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.exerciseRegimenDetails}</Text>
          )}
        </View>

        {/* Other Row */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.lifestyleOther} />
          <Text style={styles.checkboxLabel}>Other (Specify)</Text>
          {form4.lifestyleOther && form4.lifestyleOtherDetails && (
            <Text style={{ fontSize: 8, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.lifestyleOtherDetails}</Text>
          )}
        </View>

        {/* Lifestyle Information (notes) */}
        <Text style={styles.sectionHeader}>Lifestyle Information (notes)</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={[styles.cellValue, { minHeight: 40 }]}>{form4.lifestyleNotes}</Text>
          </View>
        </View>

        {/* Clinical Need for Service */}
        <Text style={styles.sectionHeader}>Clinical Need for Service (notes)</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Why are you [the pharmacist] conducting this MedsCheck service?</Text>
            <Text style={[styles.cellValue, { minHeight: 40 }]}>{form4.clinicalNeedNotes}</Text>
          </View>
        </View>

        {/* Patient Characteristics */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Patient Characteristics Contributing to the Need for the MedsCheck Service</Text>
        <View style={{ padding: 2, borderWidth: 0.5, borderColor: '#000', borderTopWidth: 0 }}>
          <Text style={{ fontSize: 8, marginBottom: 4 }}>(Select all that apply)</Text>
        </View>

        {/* Characteristic checkboxes - First group */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.char3OrMoreMeds} />
          <Text style={styles.checkboxLabel}>3 or more chronic medications</Text>
          {form4.char3OrMoreMeds && form4.char3OrMoreMedsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.char3OrMoreMedsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charMultipleConditions} />
          <Text style={styles.checkboxLabel}>Multiple acute conditions and/or one or more chronic diseases</Text>
          {form4.charMultipleConditions && form4.charMultipleConditionsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charMultipleConditionsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charNonPrescriptionMeds} />
          <Text style={styles.checkboxLabel}>Medication regimen that includes one or more non prescription medications</Text>
          {form4.charNonPrescriptionMeds && form4.charNonPrescriptionMedsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charNonPrescriptionMedsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charNaturalHealthProducts} />
          <Text style={styles.checkboxLabel}>Medication regimen that includes one or more natural health products</Text>
          {form4.charNaturalHealthProducts && form4.charNaturalHealthProductsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charNaturalHealthProductsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charUnaddressedSymptoms} />
          <Text style={styles.checkboxLabel}>Symptoms that seem unaddressed by current pharmacotherapy</Text>
          {form4.charUnaddressedSymptoms && form4.charUnaddressedSymptomsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charUnaddressedSymptomsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charPotentialDrugProblem} />
          <Text style={styles.checkboxLabel}>Potential drug therapy problem that may be prevented</Text>
          {form4.charPotentialDrugProblem && form4.charPotentialDrugProblemDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charPotentialDrugProblemDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charMultiplePrescribers} />
          <Text style={styles.checkboxLabel}>Multiple prescribers</Text>
          {form4.charMultiplePrescribers && form4.charMultiplePrescribersDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charMultiplePrescribersDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charEarlyLateRefills} />
          <Text style={styles.checkboxLabel}>Issues relating to early +/or late refills</Text>
          {form4.charEarlyLateRefills && form4.charEarlyLateRefillsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charEarlyLateRefillsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charNonAdherence} />
          <Text style={styles.checkboxLabel}>Non-adherence</Text>
          {form4.charNonAdherence && form4.charNonAdherenceDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charNonAdherenceDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charConfusedPatient} />
          <Text style={styles.checkboxLabel}>Patient seems confused about medication regimen</Text>
          {form4.charConfusedPatient && form4.charConfusedPatientDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charConfusedPatientDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charLabMonitoring} />
          <Text style={styles.checkboxLabel}>Medication(s) that require routine laboratory monitoring</Text>
          {form4.charLabMonitoring && form4.charLabMonitoringDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charLabMonitoringDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charAbnormalLabResults} />
          <Text style={styles.checkboxLabel}>Abnormal lab results (blood work, creatinine clearance, etc)</Text>
          {form4.charAbnormalLabResults && form4.charAbnormalLabResultsDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charAbnormalLabResultsDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charPlannedAdmission} />
          <Text style={styles.checkboxLabel}>Planned admission to a hospital or other health institution (i.e. – long-term care facility)</Text>
          {form4.charPlannedAdmission && form4.charPlannedAdmissionDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charPlannedAdmissionDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charDischargeTransition} />
          <Text style={styles.checkboxLabel}>Discharge/transition from hospital to community or other healthcare institution (i.e. – long-term care facility)</Text>
        </View>
        {form4.charDischargeTransition && form4.charDischargeTransitionDetails && (
          <View style={[styles.tableRow, { marginTop: 0 }]}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charDischargeTransitionDetails}</Text>
          </View>
        )}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charCompliancePackaging} />
          <Text style={styles.checkboxLabel}>Initiating compliance packaging</Text>
          {form4.charCompliancePackaging && form4.charCompliancePackagingDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charCompliancePackagingDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charRenalFunction} />
          <Text style={styles.checkboxLabel}>Known or suspected poor or unstable renal function</Text>
          {form4.charRenalFunction && form4.charRenalFunctionDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charRenalFunctionDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charLiverFunction} />
          <Text style={styles.checkboxLabel}>Known or suspected poor or unstable liver function</Text>
          {form4.charLiverFunction && form4.charLiverFunctionDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charLiverFunctionDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.charOther} />
          <Text style={styles.checkboxLabel}>Other (Specify)</Text>
          {form4.charOther && form4.charOtherDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.charOtherDetails}</Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>4967-47E (2022/11)</Text>
            <Text style={styles.opaLogo}>ONTARIO PHARMACISTS ASSOCIATION</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>Page 2 of 4</Text>
          </View>
        </View>
      </Page>

      {/* PAGE 3 - Medications and Therapeutic Issues */}
      <Page size="LETTER" style={styles.page}>
        {/* Sources Consulted */}
        <Text style={styles.sectionHeader}>Sources Consulted to conduct this MedsCheck service</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={[styles.cellValue, { minHeight: 30 }]}>{form4.sourcesConsultedNotes}</Text>
          </View>
        </View>

        {/* Source Checkboxes */}
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourcePharmacyProfile} />
          <Text style={styles.checkboxLabel}>Pharmacy Profile</Text>
          {form4.sourcePharmacyProfile && form4.sourcePharmacyProfileDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourcePharmacyProfileDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourcePhysician} />
          <Text style={styles.checkboxLabel}>Physician / Nurse Practitioner</Text>
          {form4.sourcePhysician && form4.sourcePhysicianDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourcePhysicianDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourcePatient} />
          <Text style={styles.checkboxLabel}>Patient</Text>
          {form4.sourcePatient && form4.sourcePatientDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourcePatientDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceCaregiver} />
          <Text style={styles.checkboxLabel}>Caregiver / Agent</Text>
          {form4.sourceCaregiver && form4.sourceCaregiverDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceCaregiverDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceAnotherPharmacy} />
          <Text style={styles.checkboxLabel}>Another Pharmacy</Text>
          {form4.sourceAnotherPharmacy && form4.sourceAnotherPharmacyDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceAnotherPharmacyDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceMedPackages} />
          <Text style={styles.checkboxLabel}>Medication Packages</Text>
          {form4.sourceMedPackages && form4.sourceMedPackagesDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceMedPackagesDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceLabValues} />
          <Text style={styles.checkboxLabel}>Laboratory / Test Values</Text>
          {form4.sourceLabValues && form4.sourceLabValuesDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceLabValuesDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceEHR} />
          <Text style={styles.checkboxLabel}>Electronic Health Record</Text>
          {form4.sourceEHR && form4.sourceEHRDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceEHRDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceHospital} />
          <Text style={styles.checkboxLabel}>Hospital / Other Facility</Text>
          {form4.sourceHospital && form4.sourceHospitalDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceHospitalDetails}</Text>
          )}
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.sourceOther} />
          <Text style={styles.checkboxLabel}>Other (Specify)</Text>
          {form4.sourceOther && form4.sourceOtherDetails && (
            <Text style={{ fontSize: 7, marginLeft: 8, flex: 1, backgroundColor: '#E8EEF7', padding: 2 }}>{form4.sourceOtherDetails}</Text>
          )}
        </View>

        {/* Current Medication List */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Current Medication List</Text>
        <View style={{ padding: 2, borderWidth: 0.5, borderColor: '#000', borderTopWidth: 0 }}>
          <Text style={{ fontSize: 6, fontStyle: 'italic' }}>(attach printed records if available. Information to populate MedsCheck Personal Medication Record where appropriate)</Text>
        </View>

        {form4.medications?.map((med, index) => (
          <View key={med.id} wrap={false}>
            <View style={{ backgroundColor: '#D0D8E8', padding: 3, borderWidth: 0.5, borderColor: '#000', borderTopWidth: index === 0 ? 0 : 0.5, marginTop: index === 0 ? 0 : 4 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Times-Bold' }}>Medication {index + 1}</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Name of Drug/Product (generic/brand)</Text>
                <Text style={styles.cellValue}>{med.drugName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Strength of Drug/Product</Text>
                <Text style={styles.cellValue}>{med.strength}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Dosage Form</Text>
                <Text style={styles.cellValue}>{med.dosageForm}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text style={styles.cellLabel}>Directions for Use</Text>
                <Text style={styles.cellValue}>{med.directionsForUse}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Indication</Text>
                <Text style={styles.cellValue}>{med.indication}</Text>
              </View>
              <View style={[styles.tableCell, { width: 70 }]}>
                <Text style={styles.cellLabel}>Adherence Issue</Text>
                <View style={[styles.cellValue, { flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                  <Checkbox checked={med.adherenceIssue === 'yes'} />
                  <Text style={{ fontSize: 7 }}>Yes</Text>
                  <Checkbox checked={med.adherenceIssue === 'no'} />
                  <Text style={{ fontSize: 7 }}>No</Text>
                </View>
              </View>
              <View style={[styles.tableCellLast, { width: 60 }]}>
                <Text style={styles.cellLabel}>Rx? OTC? NHP?</Text>
                <Text style={styles.cellValue}>{med.rxOtcNhp}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Patient Comments (ie/ how they actually take it, side effects, etc.)</Text>
                <Text style={styles.cellValue}>{med.patientComments}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Pharmacist Notes (ie/ disposition of drug therapy problem, recommendations, etc.)</Text>
                <Text style={styles.cellValue}>{med.pharmacistNotes}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellLast, { flex: 1 }]}>
                <Text style={styles.cellLabel}>Comments for MedsCheck Record</Text>
                <Text style={styles.cellValue}>{med.commentsForRecord}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Clinically Relevant Discontinued Medications */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Clinically Relevant Discontinued Medications (if applicable)</Text>
        
        {(form4.discontinuedMedications?.length || 0) === 0 ? (
          <View style={styles.tableRowFirst}>
            <View style={[styles.tableCellLast, { flex: 1 }]}>
              <Text style={[styles.cellValue, { minHeight: 20, fontStyle: 'italic', color: '#666' }]}>No discontinued medications documented</Text>
            </View>
          </View>
        ) : (
          form4.discontinuedMedications?.map((med, index) => (
            <View key={med.id} wrap={false}>
              <View style={{ backgroundColor: '#D0D8E8', padding: 3, borderWidth: 0.5, borderColor: '#000', borderTopWidth: index === 0 ? 0 : 0.5, marginTop: index === 0 ? 0 : 4 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Times-Bold' }}>Medication {index + 1}</Text>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Name of Drug/Product, Strength, Dosage Form, Directions for use on Previous Record</Text>
                  <Text style={styles.cellValue}>{med.nameStrengthFormDirections}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Notes (if applicable)</Text>
                  <Text style={styles.cellValue}>{med.notes}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Therapeutic Issues Identified */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Therapeutic Issues Identified (if applicable)</Text>
        
        {(form4.therapeuticIssues?.length || 0) === 0 ? (
          <View style={styles.tableRowFirst}>
            <View style={[styles.tableCellLast, { flex: 1 }]}>
              <Text style={[styles.cellValue, { minHeight: 20, fontStyle: 'italic', color: '#666' }]}>No therapeutic issues documented</Text>
            </View>
          </View>
        ) : (
          form4.therapeuticIssues?.map((issue, index) => (
            <View key={issue.id} wrap={false}>
              <View style={{ backgroundColor: '#D0D8E8', padding: 3, borderWidth: 0.5, borderColor: '#000', borderTopWidth: index === 0 ? 0 : 0.5, marginTop: index === 0 ? 0 : 4 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Times-Bold' }}>Therapeutic Issue {index + 1}</Text>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Issue</Text>
                  <Text style={styles.cellValue}>{issue.issue}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Suggested Therapy</Text>
                  <Text style={styles.cellValue}>{issue.suggestedTherapy}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Action Taken</Text>
                  <Text style={styles.cellValue}>{issue.actionTaken}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Notes</Text>
                  <Text style={styles.cellValue}>{issue.notes}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>4967-47E (2022/11)</Text>
            <Text style={styles.opaLogo}>ONTARIO PHARMACISTS ASSOCIATION</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>Page 3 of 4</Text>
          </View>
        </View>
      </Page>

      {/* PAGE 4 - Follow-up and Completion */}
      <Page size="LETTER" style={styles.page}>
        {/* Checklist for Completeness */}
        <Text style={styles.sectionHeader}>Checklist for Completeness</Text>
        
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkAskedRxFromOthers} />
          <Text style={styles.checkboxLabel}>Asked about Rx medications from other individuals, MD samples, pharmacies and care providers</Text>
        </View>
        {form4.checkAskedRxFromOthers && form4.checkAskedRxFromOthersDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkAskedRxFromOthersDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkMedsRemovedFromHome} />
          <Text style={styles.checkboxLabel}>List of meds removed from home if applicable</Text>
        </View>
        {form4.checkMedsRemovedFromHome && form4.checkMedsRemovedFromHomeDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkMedsRemovedFromHomeDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkAskedOTCProducts} />
          <Text style={styles.checkboxLabel}>Asked about OTC products purchased or obtained from another individual (including specifically ASA)</Text>
        </View>
        {form4.checkAskedOTCProducts && form4.checkAskedOTCProductsDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkAskedOTCProductsDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkAskedHerbalProducts} />
          <Text style={styles.checkboxLabel}>Asked about herbal or natural health products purchased or obtained from another individual</Text>
        </View>
        {form4.checkAskedHerbalProducts && form4.checkAskedHerbalProductsDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkAskedHerbalProductsDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkPromptedDosageForms} />
          <Text style={styles.checkboxLabel}>Prompted for specific dosage forms which are often forgotten (ie/ inhalers, topicals, eye drops, nasal sprays, patches, injectables, etc.)</Text>
        </View>
        {form4.checkPromptedDosageForms && form4.checkPromptedDosageFormsDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkPromptedDosageFormsDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkAskedAntiInfectives} />
          <Text style={styles.checkboxLabel}>Asked about anti-infectives used in the last 3 months</Text>
        </View>
        {form4.checkAskedAntiInfectives && form4.checkAskedAntiInfectivesDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkAskedAntiInfectivesDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkReferencedNotes} />
          <Text style={styles.checkboxLabel}>Referenced attached notes, results, references as appropriate</Text>
        </View>
        {form4.checkReferencedNotes && form4.checkReferencedNotesDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkReferencedNotesDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkDiscussedCircleOfCare} />
          <Text style={styles.checkboxLabel}>Discussed circle of care, sharing information with other providers and the patient's responsibility for providing accurate information</Text>
        </View>
        {form4.checkDiscussedCircleOfCare && form4.checkDiscussedCircleOfCareDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkDiscussedCircleOfCareDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkDiscussedCompletionDate} />
          <Text style={styles.checkboxLabel}>Discussed anticipated date of completion of patient's MedsCheck Personal Medication Record (if not available at the time of the MedsCheck)</Text>
        </View>
        {form4.checkDiscussedCompletionDate && form4.checkDiscussedCompletionDateDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkDiscussedCompletionDateDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checkEnsureDocumented} />
          <Text style={styles.checkboxLabel}>Ensure clinically relevant information is documented and readily retrievable for continuity of care and for audit purposes</Text>
        </View>
        {form4.checkEnsureDocumented && form4.checkEnsureDocumentedDetails && (
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 12 }}>{form4.checkEnsureDocumentedDetails}</Text>
          </View>
        )}

        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.checklistOther} />
          <Text style={styles.checkboxLabel}>Other (Specify)</Text>
          {form4.checklistOther && form4.checklistOtherDetails && (
            <Text style={{ fontSize: 7, flex: 1, backgroundColor: '#E8EEF7', padding: 2, marginLeft: 8 }}>{form4.checklistOtherDetails}</Text>
          )}
        </View>

        {/* Plan for Follow Up */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Plan for Follow Up</Text>
        <View style={styles.checkboxRow}>
          <Checkbox checked={form4.followUpWithProviders} />
          <Text style={styles.checkboxLabel}>Healthcare providers with whom to communicate</Text>
        </View>

        {form4.followUpWithProviders && (form4.healthcareProviders?.length || 0) > 0 && (
          form4.healthcareProviders?.map((provider, index) => (
            <View key={provider.id} wrap={false}>
              <View style={{ backgroundColor: '#D0D8E8', padding: 3, borderWidth: 0.5, borderColor: '#000', borderTopWidth: 0 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Times-Bold' }}>Health Care Provider {index + 1}</Text>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Last Name</Text>
                  <Text style={styles.cellValue}>{provider.lastName}</Text>
                </View>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>First Name</Text>
                  <Text style={styles.cellValue}>{provider.firstName}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCellLast, { flex: 1 }]}>
                  <Text style={styles.cellLabel}>Health Related Specialty</Text>
                  <Text style={styles.cellValue}>{provider.specialty}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Summary and Goals */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Summary and Goals</Text>
        <View style={{ padding: 2, borderWidth: 0.5, borderColor: '#000', borderTopWidth: 0 }}>
          <Text style={{ fontSize: 6, fontStyle: 'italic' }}>(information to be added to the MedsCheck Patient Take-Home Summary)</Text>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Summary of today's discussion</Text>
            <Text style={[styles.cellValue, { minHeight: 30 }]}>{form4.summaryOfDiscussion}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Patient Goals</Text>
            <Text style={[styles.cellValue, { minHeight: 30 }]}>{form4.patientGoals}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>What I will Do to Get There</Text>
            <Text style={[styles.cellValue, { minHeight: 30 }]}>{form4.whatIWillDo}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>List of resources and contacts provided</Text>
            <Text style={[styles.cellValue, { minHeight: 20 }]}>{form4.resourcesAndContacts}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Other Follow-up Planning and referrals</Text>
            <Text style={[styles.cellValue, { minHeight: 20 }]}>{form4.otherFollowUp}</Text>
          </View>
        </View>

        {/* Prepared By */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Prepared By</Text>
        <View style={styles.tableRowFirst}>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Pharmacist Full Name (Last Name, First Name)</Text>
            <Text style={styles.cellValue}>{form4.pharmacistFullName}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: 120 }]}>
            <Text style={styles.cellLabel}>OCP Number</Text>
            <Text style={styles.cellValue}>{form4.ocpNumber}</Text>
          </View>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Date of MedsCheck Review (MedsCheck is billed on the day of the consultation) (yyyy/mm/dd)</Text>
            <Text style={styles.cellValue}>{form4.medsCheckReviewDate}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Appointment Time of MedsCheck Review</Text>
            <Text style={styles.cellValue}>{form4.appointmentTime}</Text>
          </View>
          <View style={[styles.tableCellLast, { flex: 1 }]}>
            <Text style={styles.cellLabel}>Date MedsCheck Documentation Completed (yyyy/mm/dd)</Text>
            <Text style={styles.cellValue}>{form4.documentationCompletedDate}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>4967-47E (2022/11)</Text>
            <Text style={styles.opaLogo}>ONTARIO PHARMACISTS ASSOCIATION</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>Page 4 of 4</Text>
          </View>
        </View>
      </Page>
    </>
  )
}

// Export full document for individual download
export function Form4PDF({ data }: Form4PDFProps) {
  return (
    <Document>
      <Form4Page data={data} />
    </Document>
  )
}
