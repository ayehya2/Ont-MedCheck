import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

interface Form2PDFProps {
  data: MedsCheckFormData
}

// Styles specific to Form 2 - matching government form layout (PORTRAIT)
const styles = StyleSheet.create({
  page: {
    padding: 12,
    fontSize: 9,
    fontFamily: 'Times-Roman',
    lineHeight: 1.1,
    color: '#000000',
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
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
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
    marginBottom: 2,
    color: '#000000'
  },
  subtitle: {
    fontSize: 9,
    textAlign: 'left',
    marginBottom: 2,
    lineHeight: 1.1
  },
  sectionHeader: {
    backgroundColor: '#D0D8E8',
    padding: 2,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginTop: 0,
    marginBottom: 0
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0
  },
  fieldGroup: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999'
  },
  fieldLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#F0F0F0',
    padding: 2,
    width: 80,
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  fieldValue: {
    fontSize: 10,
    padding: 2,
    flex: 1,
    backgroundColor: '#E8EEF7',
    minHeight: 14
  },
  fieldValueSmall: {
    fontSize: 10,
    padding: 2,
    backgroundColor: '#E8EEF7',
    minHeight: 14
  },
  multiFieldRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 0
  },
  multiFieldCell: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  multiFieldCellLast: {
    flex: 1
  },
  cellLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#F0F0F0',
    padding: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999'
  },
  cellValue: {
    fontSize: 10,
    padding: 2,
    backgroundColor: '#E8EEF7',
    minHeight: 12
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 0,
    lineHeight: 1.1,
    textAlign: 'justify'
  },
  serviceCheckboxContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 0,
    marginTop: 0
  },
  serviceCheckboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    marginBottom: 0,
    paddingRight: 4
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginLeft: 4
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
    fontSize: 8
  },
  checkboxLabel: {
    fontSize: 10,
    flex: 1
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 0,
    marginLeft: 8,
    lineHeight: 1.1
  },
  signatureSection: {
    marginTop: 0,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999'
  },
  signatureField: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: '#999'
  },
  signatureFieldLast: {
    width: 100
  },
  commentsSection: {
    marginTop: 2,
    borderWidth: 0.5,
    borderColor: '#999'
  },
  commentsLabel: {
    fontSize: 9,
    backgroundColor: '#F0F0F0',
    padding: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999'
  },
  commentsValue: {
    fontSize: 10,
    padding: 2,
    minHeight: 25,
    backgroundColor: '#FFF'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
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

interface Form2PDFProps {
  data: MedsCheckFormData
}

export function Form2PDF({ data }: Form2PDFProps) {
  const form2 = data.form2

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={styles.logo} />
          <Image src='/medscheck-logo.png' style={styles.medsCheckLogoImage} />
        </View>

        {/* Title */}
        <Text style={styles.title}>MedsCheck Patient Acknowledgement of Professional Pharmacy Service</Text>
        <Text style={styles.subtitle}>
          To be completed annually for MedsCheck Professional Pharmacy Services (excluding MedsCheck for Long-Term Care Home residents). To be filed at the pharmacy for documentation and auditing purposes. Please cross-reference with accompanying MedsCheck reviews. Please provide a copy to the patient +/or patient's agent
        </Text>

        {/* Patient Information Section */}
        <Text style={styles.sectionHeader}>Patient Information</Text>
        
        {/* Name row */}
        <View style={styles.multiFieldRow}>
          <View style={styles.multiFieldCell}>
            <Text style={styles.cellLabel}>Last Name</Text>
            <Text style={styles.cellValue}>{form2.patientLastName}</Text>
          </View>
          <View style={styles.multiFieldCellLast}>
            <Text style={styles.cellLabel}>First Name</Text>
            <Text style={styles.cellValue}>{form2.patientFirstName}</Text>
          </View>
        </View>

        {/* Address row */}
        <View style={styles.multiFieldRow}>
          <View style={{ ...styles.multiFieldCell, flex: 0.7 }}>
            <Text style={styles.cellLabel}>Unit Number</Text>
            <Text style={styles.cellValue}>{form2.patientUnitNumber}</Text>
          </View>
          <View style={{ ...styles.multiFieldCell, flex: 0.8 }}>
            <Text style={styles.cellLabel}>Street Number</Text>
            <Text style={styles.cellValue}>{form2.patientStreetNumber}</Text>
          </View>
          <View style={{ ...styles.multiFieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Street Name</Text>
            <Text style={styles.cellValue}>{form2.patientStreetName}</Text>
          </View>
          <View style={{ ...styles.multiFieldCellLast, flex: 0.7 }}>
            <Text style={styles.cellLabel}>PO Box</Text>
            <Text style={styles.cellValue}>{form2.patientPOBox}</Text>
          </View>
        </View>

        {/* City/Province row */}
        <View style={styles.multiFieldRow}>
          <View style={{ ...styles.multiFieldCell, flex: 1.2 }}>
            <Text style={styles.cellLabel}>City/Town</Text>
            <Text style={styles.cellValue}>{form2.patientCity}</Text>
          </View>
          <View style={{ ...styles.multiFieldCell, flex: 1 }}>
            <Text style={styles.cellLabel}>Province</Text>
            <Text style={styles.cellValue}>{form2.patientProvince}</Text>
          </View>
          <View style={{ ...styles.multiFieldCellLast, flex: 0.8 }}>
            <Text style={styles.cellLabel}>Postal Code</Text>
            <Text style={styles.cellValue}>{form2.patientPostalCode}</Text>
          </View>
        </View>

        {/* Phone/Email row */}
        <View style={styles.multiFieldRow}>
          <View style={styles.multiFieldCell}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form2.patientPhone}</Text>
          </View>
          <View style={styles.multiFieldCellLast}>
            <Text style={styles.cellLabel}>Email Address (if available)</Text>
            <Text style={styles.cellValue}>{form2.patientEmail}</Text>
          </View>
        </View>

        {/* Pharmacy Information Section */}
        <Text style={styles.sectionHeader}>Pharmacy Information</Text>
        
        {/* Pharmacy Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Pharmacy Name</Text>
          <Text style={styles.fieldValue}>{form2.pharmacyName}</Text>
        </View>

        {/* Pharmacy Address row */}
        <View style={styles.multiFieldRow}>
          <View style={{ ...styles.multiFieldCell, flex: 0.7 }}>
            <Text style={styles.cellLabel}>Unit Number</Text>
            <Text style={styles.cellValue}>{form2.pharmacyUnitNumber}</Text>
          </View>
          <View style={{ ...styles.multiFieldCell, flex: 0.8 }}>
            <Text style={styles.cellLabel}>Street Number</Text>
            <Text style={styles.cellValue}>{form2.pharmacyStreetNumber}</Text>
          </View>
          <View style={{ ...styles.multiFieldCell, flex: 1.5 }}>
            <Text style={styles.cellLabel}>Street Name</Text>
            <Text style={styles.cellValue}>{form2.pharmacyStreetName}</Text>
          </View>
          <View style={{ ...styles.multiFieldCellLast, flex: 0.7 }}>
            <Text style={styles.cellLabel}>PO Box</Text>
            <Text style={styles.cellValue}>{form2.pharmacyPOBox}</Text>
          </View>
        </View>

        {/* Pharmacy City/Province row */}
        <View style={styles.multiFieldRow}>
          <View style={{ ...styles.multiFieldCell, flex: 1.2 }}>
            <Text style={styles.cellLabel}>City/Town</Text>
            <Text style={styles.cellValue}>{form2.pharmacyCity}</Text>
          </View>
          <View style={{ ...styles.multiFieldCell, flex: 1 }}>
            <Text style={styles.cellLabel}>Province</Text>
            <Text style={styles.cellValue}>{form2.pharmacyProvince}</Text>
          </View>
          <View style={{ ...styles.multiFieldCellLast, flex: 0.8 }}>
            <Text style={styles.cellLabel}>Postal Code</Text>
            <Text style={styles.cellValue}>{form2.pharmacyPostalCode}</Text>
          </View>
        </View>

        {/* Pharmacy Phone/Fax/Email row */}
        <View style={styles.multiFieldRow}>
          <View style={styles.multiFieldCell}>
            <Text style={styles.cellLabel}>Telephone Number</Text>
            <Text style={styles.cellValue}>{form2.pharmacyPhone}</Text>
          </View>
          <View style={styles.multiFieldCell}>
            <Text style={styles.cellLabel}>Fax Number</Text>
            <Text style={styles.cellValue}>{form2.pharmacyFax}</Text>
          </View>
          <View style={styles.multiFieldCellLast}>
            <Text style={styles.cellLabel}>Email Address (if available)</Text>
            <Text style={styles.cellValue}>{form2.pharmacyEmail}</Text>
          </View>
        </View>

        {/* Service Information */}
        <Text style={styles.paragraph}>
          MedsCheck reviews typically occur at the pharmacy where there is a sufficient level of privacy that ensures patient confidentiality. A pharmacy team member will explain which program is best suited to your needs; this form is completed annually at any pharmacy that provides the program. Professional Pharmacy Services may include:
        </Text>

        {/* Service Type Checkboxes - Grid Layout */}
        <View style={styles.serviceCheckboxContainer}>
          <View style={styles.serviceCheckboxItem}>
            <View style={form2.serviceType === 'annual' ? styles.checkboxChecked : styles.checkbox}>
              {form2.serviceType === 'annual' && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>MedsCheck Annual</Text>
          </View>
          <View style={styles.serviceCheckboxItem}>
            <View style={form2.serviceType === 'diabetes' ? styles.checkboxChecked : styles.checkbox}>
              {form2.serviceType === 'diabetes' && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>MedsCheck for Diabetes Annual</Text>
          </View>
          <View style={styles.serviceCheckboxItem}>
            <View style={form2.serviceType === 'followup' ? styles.checkboxChecked : styles.checkbox}>
              {form2.serviceType === 'followup' && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>MedsCheck Follow-up</Text>
          </View>
          <View style={styles.serviceCheckboxItem}>
            <View style={form2.serviceType === 'diabetes_followup' ? styles.checkboxChecked : styles.checkbox}>
              {form2.serviceType === 'diabetes_followup' && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Diabetes Education Follow-up</Text>
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <View style={form2.serviceType === 'at_home' ? styles.checkboxChecked : styles.checkbox}>
            {form2.serviceType === 'at_home' && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            MedsCheck at Home (also includes a medication cabinet clean-up and pharmacist disposal of unused medication from the patient's home with the patient's understanding)
          </Text>
        </View>

        {/* Bullet points */}
        <Text style={styles.bulletPoint}>• MedsCheck is a service that patients participate in voluntarily and is sponsored by the Ontario government.</Text>
        <Text style={styles.bulletPoint}>• Information about the MedsCheck program is available on the Ontario government and Ontario Pharmacists Association websites and/or on the Government patient brochure.</Text>
        <Text style={styles.bulletPoint}>• MedsCheck includes a completed MedsCheck Personal Medication Record that is signed and dated by the pharmacist. The completed MedsCheck form aims to resolve real or potential drug therapy related problems identified by you, the pharmacist or your primary care provider.</Text>
        <Text style={styles.bulletPoint}>• The accuracy of the information on the final MedsCheck document depends on the accuracy and completeness of the information provided by the patient at the time the MedsCheck was performed.</Text>
        <Text style={styles.bulletPoint}>• The completed MedsCheck document and this patient acknowledgement demonstrate that both parties have an understanding of the MedsCheck program and the process.</Text>
        <Text style={styles.bulletPoint}>• As a member of your health-care team, your pharmacist may confidentially share the completed MedsCheck with other health care professionals to ensure that the relevant members of your health care team are up to date on your current medication profile. Exchange of the MedsCheck Personal Medication Review will be done so in a manner to ensure secure transfer of patient health information.</Text>

        {/* Patient Acknowledgement */}
        <Text style={{ ...styles.sectionHeader, marginTop: 4 }}>Patient Acknowledgement</Text>
        <Text style={styles.paragraph}>
          By signing this form, you are acknowledging participation in an in-person MedsCheck medication review with a pharmacist associated with the pharmacy noted above. It may be necessary for the pharmacist to discuss and share your health information with other health care professionals (e.g., physicians, nurses, etc.) in accordance with generally accepted medication therapy management principles. Your signature below will indicate that you acknowledge the secure exchange of information and your agreement to the MedsCheck service.
        </Text>

        {/* Signature section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureField}>
            <Text style={styles.cellLabel}>Patient/ Agent Signature</Text>
            {form2.patientSignature && form2.patientSignature.startsWith('data:image') ? (
              <Image 
                src={form2.patientSignature} 
                style={{ height: 25, width: '100%', objectFit: 'contain', padding: 2 }}
              />
            ) : (
              <Text style={{ ...styles.cellValue, fontStyle: 'italic', minHeight: 25 }}>{form2.patientSignature}</Text>
            )}
          </View>
          <View style={styles.signatureFieldLast}>
            <Text style={styles.cellLabel}>Date (yyyy/mm/dd)</Text>
            <Text style={{ ...styles.cellValue, minHeight: 25 }}>{formatDate(form2.signatureDate)}</Text>
          </View>
        </View>

        {/* Comments */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsLabel}>Comments</Text>
          <Text style={styles.commentsValue}>{form2.comments}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>4975-47E (2022/11)   © King's Printer for Ontario, 2022</Text>
          <Text>Disponible en français                    Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  )
}
