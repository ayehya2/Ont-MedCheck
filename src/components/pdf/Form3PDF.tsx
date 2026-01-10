import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

interface Form3PDFProps {
  data: MedsCheckFormData
}

// Styles for Form 3 - Personal Medication Record
const styles = StyleSheet.create({
  page: {
    padding: 14,
    fontSize: 8,
    fontFamily: 'Times-Roman',
    lineHeight: 1.2,
    color: '#000000',
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2
  },
  logo: {
    height: 25,
    width: 70,
    objectFit: 'contain'
  },
  medsCheckLogoImage: {
    height: 25,
    width: 100,
    objectFit: 'contain'
  },
  title: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3
  },
  serviceRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999',
    marginBottom: 3
  },
  serviceCell: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  serviceCellLast: {
    flex: 1
  },
  sectionHeader: {
    backgroundColor: '#D0D8E8',
    padding: 3,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
    marginBottom: 1
  },
  fieldRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999',
    borderTopWidth: 0
  },
  fieldRowFirst: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999'
  },
  fieldCell: {
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  fieldCellLast: {
    // No right border
  },
  cellLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#F0F0F0',
    padding: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999'
  },
  cellValue: {
    fontSize: 9,
    padding: 2,
    backgroundColor: '#E8EEF7',
    minHeight: 12
  },
  allergiesSection: {
    borderWidth: 0.5,
    borderColor: '#999',
    marginTop: 2
  },
  allergiesLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#F0F0F0',
    padding: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999'
  },
  allergiesValue: {
    fontSize: 8,
    padding: 2,
    minHeight: 14,
    backgroundColor: '#E8EEF7'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderWidth: 0.5,
    borderColor: '#999',
    borderTopWidth: 0
  },
  checkbox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxChecked: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmark: {
    color: '#FFF',
    fontSize: 7
  },
  // Medication Table
  medicationTable: {
    marginTop: 2,
    borderWidth: 0.5,
    borderColor: '#999'
  },
  medicationHeader: {
    flexDirection: 'row',
    backgroundColor: '#D0D8E8'
  },
  medicationHeaderCell: {
    flex: 1,
    padding: 2,
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  medicationHeaderCellLast: {
    flex: 1,
    padding: 2
  },
  medicationHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center'
  },
  medicationHeaderSubtext: {
    fontSize: 6,
    textAlign: 'center',
    marginTop: 1
  },
  medicationRow: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#999',
    minHeight: 14
  },
  medicationCell: {
    flex: 1,
    padding: 2,
    borderRightWidth: 0.5,
    borderRightColor: '#999',
    fontSize: 8
  },
  medicationCellLast: {
    flex: 1,
    padding: 2,
    fontSize: 8
  },
  // Bottom section
  attentionBox: {
    marginTop: 2,
    padding: 3,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#999'
  },
  attentionText: {
    fontSize: 7,
    lineHeight: 1.3
  },
  pharmacySection: {
    marginTop: 2,
    borderWidth: 0.5,
    borderColor: '#999'
  },
  pharmacyRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999'
  },
  pharmacyRowLast: {
    flexDirection: 'row'
  },
  pharmacyCell: {
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  pharmacyCellLast: {
    // No right border
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    borderTopWidth: 0.5,
    borderTopColor: '#999',
    paddingTop: 4
  }
})

// Helper to format date
function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return dateStr.replace(/-/g, '/')
}

// Service type labels
const serviceLabels: Record<string, string> = {
  'annual': 'MedsCheck Annual',
  'followup': 'MedsCheck Follow-up',
  'diabetes_annual': 'MedsCheck for Diabetes Annual',
  'diabetes_followup': 'Diabetes Education Follow-up',
  'at_home': 'MedsCheck at Home'
}

interface Form3PDFProps {
  data: MedsCheckFormData
}

export function Form3PDF({ data }: Form3PDFProps) {
  const form3 = data.form3

  return (
    <Document>
      <Page size="LETTER" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={styles.logo} />
          <Image src='/medscheck-logo.png' style={styles.medsCheckLogoImage} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Personal Medication Record</Text>

        {/* Service Row */}
        <View style={styles.serviceRow}>
          <View style={styles.serviceCell}>
            <Text style={styles.cellLabel}>MedsCheck Service Provided</Text>
            <Text style={styles.cellValue}>{serviceLabels[form3.serviceProvided] || ''}</Text>
          </View>
          <View style={styles.serviceCellLast}>
            <Text style={styles.cellLabel}>Location (Pharmacy / Patient's Home)</Text>
            <Text style={styles.cellValue}>{form3.location}</Text>
          </View>
        </View>

        {/* Patient Information Section */}
        <Text style={styles.sectionHeader}>Patient Information</Text>
        
        {/* Name and DOB row */}
        <View style={styles.fieldRowFirst}>
          <View style={{ ...styles.fieldCell, flex: 2 }}>
            <Text style={styles.cellLabel}>Patient Last Name</Text>
            <Text style={styles.cellValue}>{form3.patientLastName}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 2 }}>
            <Text style={styles.cellLabel}>Patient First Name</Text>
            <Text style={styles.cellValue}>{form3.patientFirstName}</Text>
          </View>
          <View style={{ ...styles.fieldCellLast, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Date of Birth (yyyy/mm/dd)</Text>
            <Text style={styles.cellValue}>{formatDate(form3.patientDOB)}</Text>
          </View>
        </View>

        {/* Address row */}
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldCell, flex: 0.7 }}>
            <Text style={styles.cellLabel}>Unit Number</Text>
            <Text style={styles.cellValue}>{form3.patientUnitNumber}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 0.8 }}>
            <Text style={styles.cellLabel}>Street Number</Text>
            <Text style={styles.cellValue}>{form3.patientStreetNumber}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Street Name</Text>
            <Text style={styles.cellValue}>{form3.patientStreetName}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 0.7 }}>
            <Text style={styles.cellLabel}>PO Box</Text>
            <Text style={styles.cellValue}>{form3.patientPOBox}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 1 }}>
            <Text style={styles.cellLabel}>City/Town</Text>
            <Text style={styles.cellValue}>{form3.patientCity}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 0.7 }}>
            <Text style={styles.cellLabel}>Province</Text>
            <Text style={styles.cellValue}>{form3.patientProvince}</Text>
          </View>
          <View style={{ ...styles.fieldCellLast, flex: 0.8 }}>
            <Text style={styles.cellLabel}>Postal Code</Text>
            <Text style={styles.cellValue}>{form3.patientPostalCode}</Text>
          </View>
        </View>

        {/* Phone/Interview/Email row */}
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldCell, flex: 1 }}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form3.patientPhone}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 1 }}>
            <Text style={styles.cellLabel}>Date of Interview (yyyy/mm/dd)</Text>
            <Text style={styles.cellValue}>{formatDate(form3.interviewDate)}</Text>
          </View>
          <View style={{ ...styles.fieldCellLast, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Email Address</Text>
            <Text style={styles.cellValue}>{form3.patientEmail}</Text>
          </View>
        </View>

        {/* Caregiver Section */}
        <Text style={styles.sectionHeader}>Sources Caregiver and/or Contact Name</Text>
        <View style={styles.fieldRowFirst}>
          <View style={{ ...styles.fieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Last Name</Text>
            <Text style={styles.cellValue}>{form3.caregiverLastName}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>First Name</Text>
            <Text style={styles.cellValue}>{form3.caregiverFirstName}</Text>
          </View>
          <View style={{ ...styles.fieldCellLast, flex: 1 }}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form3.caregiverPhone}</Text>
          </View>
        </View>

        {/* Primary Care Provider Section */}
        <Text style={styles.sectionHeader}>Primary Care Provider</Text>
        <View style={styles.fieldRowFirst}>
          <View style={{ ...styles.fieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Last Name</Text>
            <Text style={styles.cellValue}>{form3.providerLastName}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>First Name</Text>
            <Text style={styles.cellValue}>{form3.providerFirstName}</Text>
          </View>
          <View style={{ ...styles.fieldCell, flex: 1 }}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form3.providerPhone}</Text>
          </View>
          <View style={{ ...styles.fieldCellLast, flex: 1 }}>
            <Text style={styles.cellLabel}>Fax Number</Text>
            <Text style={styles.cellValue}>{form3.providerFax}</Text>
          </View>
        </View>

        {/* Medication List Header */}
        <Text style={styles.sectionHeader}>
          Current Medication List - Prescription, Non-Prescription, Natural Health Products
        </Text>

        {/* Allergies */}
        <View style={styles.allergiesSection}>
          <Text style={styles.allergiesLabel}>Known Allergies and/or Intolerances</Text>
          <Text style={styles.allergiesValue}>{form3.allergies}</Text>
        </View>

        {/* No non-prescription checkbox */}
        <View style={styles.checkboxRow}>
          <View style={form3.noNonPrescriptionProducts ? styles.checkboxChecked : styles.checkbox}>
            {form3.noNonPrescriptionProducts && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={{ fontSize: 7 }}>
            Select <Text style={{ fontFamily: 'Helvetica-Bold' }}>only</Text> if patient is <Text style={{ fontFamily: 'Helvetica-Bold' }}>not</Text> taking any non-prescription products (ie/ vitamins, natural health products, over-the-counter)
          </Text>
        </View>

        {/* Medication Table */}
        <View style={styles.medicationTable}>
          {/* Table Header */}
          <View style={styles.medicationHeader}>
            <View style={styles.medicationHeaderCell}>
              <Text style={styles.medicationHeaderText}>WHAT I TAKE</Text>
              <Text style={styles.medicationHeaderSubtext}>
                Name, strength & form of medication as noted on the prescription or medication package label
              </Text>
            </View>
            <View style={styles.medicationHeaderCell}>
              <Text style={styles.medicationHeaderText}>WHY I TAKE IT</Text>
              <Text style={styles.medicationHeaderSubtext}>
                Disease, condition or symptoms it addresses
              </Text>
            </View>
            <View style={styles.medicationHeaderCell}>
              <Text style={styles.medicationHeaderText}>HOW I TAKE IT</Text>
              <Text style={styles.medicationHeaderSubtext}>
                Qty, route, times per day or certain time of day
              </Text>
            </View>
            <View style={styles.medicationHeaderCellLast}>
              <Text style={styles.medicationHeaderText}>COMMENTS</Text>
              <Text style={styles.medicationHeaderSubtext}>
                eg. Special instructions; drug-related issues identified; prescriber (if different); etc.
              </Text>
            </View>
          </View>

          {/* Medication Rows - Show all medications that user has added */}
          {form3.medications?.map((med, index) => (
            <View key={med.id || index} style={styles.medicationRow}>
              <Text style={styles.medicationCell}>{med.whatITake}</Text>
              <Text style={styles.medicationCell}>{med.whyITakeIt}</Text>
              <Text style={styles.medicationCell}>{med.howITakeIt}</Text>
              <Text style={styles.medicationCellLast}>{med.comments}</Text>
            </View>
          ))}

          {/* Add empty rows only if there are no medications at all (minimum 3 empty rows) */}
          {form3.medications.length === 0 && 
            Array(3).fill(null).map((_, index) => (
              <View key={`empty-${index}`} style={styles.medicationRow}>
                <Text style={styles.medicationCell}></Text>
                <Text style={styles.medicationCell}></Text>
                <Text style={styles.medicationCell}></Text>
                <Text style={styles.medicationCellLast}></Text>
              </View>
            ))
          }
        </View>

        {/* Attention Box */}
        <View style={styles.attentionBox}>
          <Text style={styles.attentionText}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>Attention Health Care Professionals:</Text> A more detailed version of this MedsCheck Review that includes professional notes is available from the pharmacy named. Sources of information in this document include (but are not limited to) local pharmacy data and the patient. The patient has been informed of the intent of the MedsCheck Review and on what to expect. The patient is responsible for the accuracy and completeness of the data they provided when this document was prepared and for advising the pharmacist of any change to these medications. The pharmacist is responsible for information in this document that changed as a result of providing a medication review service to the patient.
          </Text>
        </View>

        {/* Pharmacy Section */}
        <View style={styles.pharmacySection}>
          <View style={styles.pharmacyRow}>
            <View style={{ ...styles.pharmacyCell, flex: 2 }}>
              <Text style={styles.cellLabel}>Pharmacy Name (and/or Logo/Label) and Address</Text>
              <Text style={{ ...styles.cellValue, minHeight: 24 }}>{form3.pharmacyNameAddress}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cellLabel}>Pharmacy Telephone Number</Text>
              <Text style={styles.cellValue}>{form3.pharmacyPhone}</Text>
            </View>
          </View>
          <View style={styles.pharmacyRowLast}>
            <View style={{ ...styles.pharmacyCell, flex: 1 }}>
              <Text style={styles.cellLabel}>MedsCheck Pharmacist Name</Text>
              <Text style={styles.cellValue}>{form3.pharmacistName}</Text>
            </View>
            <View style={{ ...styles.pharmacyCell, flex: 1 }}>
              <Text style={styles.cellLabel}>Pharmacist's Signature</Text>
              {form3.pharmacistSignature && form3.pharmacistSignature.startsWith('data:image') ? (
                <Image 
                  src={form3.pharmacistSignature} 
                  style={{ height: 25, objectFit: 'contain', marginTop: 2 }}
                />
              ) : (
                <Text style={{ ...styles.cellValue, fontStyle: 'italic' }}>{form3.pharmacistSignature}</Text>
              )}
            </View>
            <View style={{ ...styles.pharmacyCell, flex: 1 }}>
              <Text style={styles.cellLabel}>Date MedsCheck Report Completed (yyyy/mm/dd)</Text>
              <Text style={styles.cellValue}>{formatDate(form3.dateCompleted)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cellLabel}>Pharmacy Fax Number</Text>
              <Text style={styles.cellValue}>{form3.pharmacyFax}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>4968E (2022/11)   © King's Printer for Ontario, 2022</Text>
          <Text>Disponible en français</Text>
          <Text>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  )
}
