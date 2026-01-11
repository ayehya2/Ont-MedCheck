import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

interface Form5PDFProps {
  data: MedsCheckFormData
  settings?: any
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: 'Helvetica',
    lineHeight: 1.2,
    color: '#000000',
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 4
  },
  title: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 4
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#E0E0E0',
    padding: 4,
    marginTop: 6,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#000'
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 0
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 20
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 20
  },
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    justifyContent: 'center'
  },
  tableColLast: {
    padding: 3,
    justifyContent: 'center'
  },
  tableCellLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold'
  },
  tableCellValue: {
    fontSize: 8,
    color: '#00008B',
    minHeight: 16,
    backgroundColor: '#E8F0FE'
  },
  dynamicSection: {
    marginTop: 6,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#000'
  },
  dynamicSectionHeader: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#E0E0E0',
    padding: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  dynamicSectionContent: {
    fontSize: 8,
    color: '#00008B',
    padding: 3,
    minHeight: 40,
    backgroundColor: '#E8F0FE'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
    marginBottom: 6
  },
  button: {
    backgroundColor: '#00BCD4',
    color: '#FFF',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    padding: 4,
    textAlign: 'center',
    borderRadius: 2
  },
  programText: {
    fontSize: 7.5,
    padding: 6,
    marginTop: 6,
    marginBottom: 6,
    lineHeight: 1.3
  },
  signatureRow: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000'
  },
  signatureCol: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    minHeight: 60
  },
  signatureColLast: {
    width: '50%',
    padding: 3,
    minHeight: 60
  },
  signatureLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2
  }
})

export function Form5PDF({ data }: Form5PDFProps) {
  const form5 = data.form5

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header with logos */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={{ height: 28, width: 80, objectFit: 'contain' }} />
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Ministry of Health{'\n'}and Long-Term Care</Text>
          <Image src='/medscheck-logo.png' style={{ height: 28, width: 120, objectFit: 'contain' }} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Patient Take-Home Summary</Text>

        {/* Patient Information */}
        <Text style={styles.sectionHeader}>Patient Information</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Last Name</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>First Name</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form5.patientLastName || data.patient.lastName}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form5.patientFirstName || data.patient.firstName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Date of Birth (yyyy/mm/dd)</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Telephone Number</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form5.patientDOB || data.patient.dateOfBirth}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form5.patientPhone || data.patient.phone}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Pharmacy Name</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form5.pharmacyName || data.pharmacy.name}</Text>
            </View>
          </View>
        </View>

        {/* Pharmacy Address */}
        <Text style={styles.sectionHeader}>Pharmacy Address</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '15%' }]}>
              <Text style={styles.tableCellLabel}>Unit Number</Text>
            </View>
            <View style={[styles.tableCol, { width: '20%' }]}>
              <Text style={styles.tableCellLabel}>Street Number</Text>
            </View>
            <View style={[styles.tableCol, { width: '45%' }]}>
              <Text style={styles.tableCellLabel}>Street Name</Text>
            </View>
            <View style={[styles.tableColLast, { width: '20%' }]}>
              <Text style={styles.tableCellLabel}>PO Box</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '15%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyUnitNumber}</Text>
            </View>
            <View style={[styles.tableCol, { width: '20%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyStreetNumber}</Text>
            </View>
            <View style={[styles.tableCol, { width: '45%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyStreetName}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '20%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyPOBox}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '40%' }]}>
              <Text style={styles.tableCellLabel}>City/Town</Text>
            </View>
            <View style={[styles.tableCol, { width: '30%' }]}>
              <Text style={styles.tableCellLabel}>Province</Text>
            </View>
            <View style={[styles.tableColLast, { width: '30%' }]}>
              <Text style={styles.tableCellLabel}>Postal Code</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '40%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyCity}</Text>
            </View>
            <View style={[styles.tableCol, { width: '30%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyProvince}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '30%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyPostalCode}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '33.33%' }]}>
              <Text style={styles.tableCellLabel}>Telephone Number</Text>
            </View>
            <View style={[styles.tableCol, { width: '33.33%' }]}>
              <Text style={styles.tableCellLabel}>Fax Number</Text>
            </View>
            <View style={[styles.tableColLast, { width: '33.34%' }]}>
              <Text style={styles.tableCellLabel}>Email Address (if available)</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableCol, { width: '33.33%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyPhone}</Text>
            </View>
            <View style={[styles.tableCol, { width: '33.33%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyFax}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '33.34%' }]}>
              <Text style={styles.tableCellValue}>{form5.pharmacyEmail}</Text>
            </View>
          </View>
        </View>

        {/* Summary of Today's Discussion */}
        <Text style={styles.sectionHeader}>Summary of Today's Discussion</Text>
        {form5.discussions?.map((discussion, index) => (
          <View key={discussion.id} style={styles.dynamicSection}>
            <Text style={styles.dynamicSectionHeader}>Summary of Today's Discussion {index + 1}</Text>
            <Text style={styles.dynamicSectionContent}>{discussion.content}</Text>
          </View>
        ))}

        {/* My Goals */}
        <Text style={styles.sectionHeader}>My Goals</Text>
        {form5.goals?.map((goal, index) => (
          <View key={goal.id} style={styles.dynamicSection}>
            <Text style={styles.dynamicSectionHeader}>Goal {index + 1}</Text>
            <Text style={styles.dynamicSectionContent}>{goal.content}</Text>
          </View>
        ))}

        {/* What I Will Do To Get There */}
        <Text style={styles.sectionHeader}>What I Will Do To Get There</Text>
        {form5.actions?.map((action, index) => (
          <View key={action.id} style={styles.dynamicSection}>
            <Text style={styles.dynamicSectionHeader}>What I Will Do To Get There {index + 1}</Text>
            <Text style={styles.dynamicSectionContent}>{action.content}</Text>
          </View>
        ))}

        {/* List of Resources */}
        <Text style={styles.sectionHeader}>List of Resources and Contacts Provided</Text>
        {form5.resources?.map((resource, index) => (
          <View key={resource.id} style={styles.dynamicSection}>
            <Text style={styles.dynamicSectionHeader}>List of Resources and Contacts Provided {index + 1}</Text>
            <Text style={styles.dynamicSectionContent}>{resource.content}</Text>
          </View>
        ))}

        {/* Referrals Information */}
        <Text style={styles.sectionHeader}>Referrals Information</Text>
        {form5.referrals?.map((referral, index) => (
          <View key={referral.id} style={styles.dynamicSection}>
            <Text style={styles.dynamicSectionHeader}>Referral {index + 1}</Text>
            <Text style={styles.dynamicSectionContent}>{referral.content}</Text>
          </View>
        ))}

        {/* Program Information */}
        <Text style={styles.programText}>
          The MedsCheck Diabetes Education Program is a voluntary program sponsored by the Ontario government. 
          I acknowledge that I have received the diabetes education referenced above from a licensed pharmacist 
          in relation to my diabetes care. I understand that a record of this education may be shared with other 
          health care professionals within the health care team.
        </Text>

        {/* Prepared By */}
        <Text style={styles.sectionHeader}>Prepared By</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Pharmacist Full Name (Last Name, First Name)</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form5.pharmacistFullName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Date of Diabetes Education (yyyy/mm/dd)</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form5.diabetesEducationDate}</Text>
            </View>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureCol}>
            <Text style={styles.signatureLabel}>Patient's Signature</Text>
            {form5.patientSignature && (
              <Image src={form5.patientSignature} style={{ height: 35, marginTop: 4 }} />
            )}
          </View>
          <View style={styles.signatureColLast}>
            <Text style={styles.signatureLabel}>Pharmacist's Signature</Text>
            {form5.pharmacistSignature && (
              <Image src={form5.pharmacistSignature} style={{ height: 35, marginTop: 4 }} />
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 10, paddingTop: 6, borderTopWidth: 1, borderTopColor: '#CCC' }}>
          <Text style={{ fontSize: 7, textAlign: 'center' }}>
            4970-47E (2022/11)     © King's Printer for Ontario, 2022     Disponible en français     Page 1 of 1
          </Text>
        </View>
      </Page>
    </Document>
  )
}
