import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

interface Form5PDFProps {
  data: MedsCheckFormData
  settings?: any
}

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
    fontFamily: 'Times-Bold',
    marginBottom: 8,
    marginTop: 4
  },
  // Section Headers - blue background matching government form
  sectionHeader: {
    backgroundColor: '#D0D8E8',
    padding: 3,
    fontSize: 8,
    fontFamily: 'Times-Bold',
    marginTop: 2,
    marginBottom: 1
  },
  // Table structure
  table: {
    borderWidth: 0.5,
    borderColor: '#999',
    marginBottom: 3
  },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999',
    borderTopWidth: 0,
    minHeight: 14
  },
  tableRowFirst: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999',
    minHeight: 14
  },
  tableRowLast: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#999',
    borderTopWidth: 0,
    minHeight: 14
  },
  tableCol: {
    borderRightWidth: 0.5,
    borderRightColor: '#999',
    padding: 2
  },
  tableColLast: {
    padding: 2
  },
  // Cell styling matching Forms 1-4
  cellLabel: {
    fontSize: 7,
    fontFamily: 'Times-Roman',
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
  tableCellLabel: {
    fontSize: 8,
    fontFamily: 'Times-Roman',
    padding: 2,
    backgroundColor: '#FFFFFF'
  },
  tableCellValue: {
    fontSize: 9,
    color: '#00008B',
    padding: 3,
    minHeight: 16,
    backgroundColor: '#E8EEF7'
  },
  // Dynamic sections
  dynamicSection: {
    marginTop: 6,
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  dynamicSectionHeader: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    backgroundColor: '#D0D8E8',
    padding: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000'
  },
  dynamicSectionContent: {
    fontSize: 9,
    color: '#00008B',
    padding: 3,
    minHeight: 40,
    backgroundColor: '#E8EEF7'
  },
  // Footer styling
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
  },
  // Signature styling
  signatureSection: {
    flexDirection: 'row',
    marginTop: 12,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  signatureBox: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: '#000',
    padding: 4,
    minHeight: 30
  },
  signatureBoxLast: {
    flex: 1,
    padding: 4,
    minHeight: 30
  },
  signatureLabel: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
    marginBottom: 2
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 20,
    justifyContent: 'flex-end',
    paddingBottom: 2
  },
  signatureText: {
    fontSize: 9,
    color: '#00008B'
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
    fontFamily: 'Times-Bold',
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
        <View style={styles.footer}>
          <Text>4970-47E (2022/11)   © King's Printer for Ontario, 2022</Text>
          <Text>Disponible en français</Text>
          <Text>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  )
}
