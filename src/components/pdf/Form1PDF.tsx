import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

// Styles specific to Form 1
const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 9,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
    color: '#000000',
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 6
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ontarioLogo: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#00703C'
  },
  ministryText: {
    fontSize: 6,
    marginLeft: 6,
    color: '#000'
  },
  medsCheckLogo: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0066CC'
  },
  title: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8
  },
  fieldGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  label: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    width: 100
  },
  labelSmall: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    width: 80
  },
  value: {
    flex: 1,
    fontSize: 9,
    backgroundColor: '#E8EEF7',
    padding: 4,
    minHeight: 16
  },
  valueHalf: {
    width: '45%',
    fontSize: 9,
    backgroundColor: '#E8EEF7',
    padding: 4,
    minHeight: 16,
    marginRight: 8
  },
  paragraph: {
    fontSize: 9,
    marginBottom: 8,
    lineHeight: 1.4
  },
  boldText: {
    fontFamily: 'Helvetica-Bold'
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    marginTop: 12,
    marginBottom: 4
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 4
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#6699CC',
    backgroundColor: '#E8EEF7',
    marginRight: 8,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxChecked: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#6699CC',
    backgroundColor: '#6699CC',
    marginRight: 8,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 7
  },
  checkboxText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4
  },
  issuesBox: {
    borderWidth: 1,
    borderColor: '#333333',
    minHeight: 80,
    padding: 8,
    marginTop: 4,
    marginBottom: 12
  },
  signatureRow: {
    flexDirection: 'row',
    marginTop: 12
  },
  signatureGroup: {
    width: '50%'
  },
  signatureLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    height: 20,
    marginBottom: 4
  },
  inlineText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  inlineValue: {
    backgroundColor: '#E8EEF7',
    padding: 2,
    paddingHorizontal: 4,
    marginHorizontal: 2
  }
})

// Helper to format date
function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  // Handle both yyyy-mm-dd and yyyy/mm/dd formats
  const cleanDate = dateStr.replace(/-/g, '/')
  return cleanDate
}

interface Form1PDFProps {
  data: MedsCheckFormData
}

export function Form1PDF({ data }: Form1PDFProps) {
  const form1 = data.form1

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.ontarioLogo}>Ontario</Text>
            <Text style={styles.ministryText}>Ministry of Health and Long-Term Care</Text>
          </View>
          <Text style={styles.medsCheckLogo}>MedsCheck</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Healthcare Provider Notification of MedsCheck Services</Text>

        {/* Recipient Info Row 1: To and Fax */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.labelSmall}>To</Text>
            <View style={styles.valueHalf}>
              <Text>{form1.to || ''}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.labelSmall}>Fax Number</Text>
            <View style={styles.value}>
              <Text>{form1.faxNumber || ''}</Text>
            </View>
          </View>
        </View>

        {/* Row 2: Telephone and Pages */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.labelSmall}>Telephone Number</Text>
            <View style={styles.valueHalf}>
              <Text>{form1.telephoneNumber || ''}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.labelSmall}>Pages</Text>
            <View style={styles.value}>
              <Text>{form1.pages || ''}</Text>
            </View>
          </View>
        </View>

        {/* Row 3: Email and Date */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.labelSmall}>Email Address</Text>
            <View style={styles.valueHalf}>
              <Text>{form1.emailAddress || ''}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.labelSmall}>Date (yyyy/mm/dd)</Text>
            <View style={styles.value}>
              <Text>{formatDate(form1.date) || ''}</Text>
            </View>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Re: Patient's Name</Text>
          <View style={styles.value}>
            <Text>{form1.patientName || ''}</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={{ ...styles.labelSmall, width: 100 }}>Patient's Address</Text>
          <View style={styles.value}>
            <Text>{form1.patientAddress || ''}</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={{ ...styles.labelSmall, width: 100 }}>Telephone Number</Text>
          <View style={styles.value}>
            <Text>{form1.patientPhone || ''}</Text>
          </View>
        </View>

        {/* MedsCheck paragraph */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.inlineText}>
            <Text style={{ fontSize: 9 }}>Our mutual patient noted above has had a MedsCheck completed by our pharmacist on </Text>
            <View style={styles.inlineValue}>
              <Text style={{ fontSize: 9 }}>{formatDate(form1.medsCheckDate) || '                    '}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 9, marginTop: 2 }}>Date (yyyy/mm/dd)</Text>
        </View>

        {/* Description paragraphs */}
        <Text style={{ ...styles.paragraph, marginTop: 12 }}>
          The MedsCheck program aims to ensure that patients take medications as prescribed. It also aims to resolve or prevent any drug therapy problems identified by the patient or the pharmacist.
        </Text>

        <Text style={styles.paragraph}>
          The resulting comprehensive <Text style={styles.boldText}>MedsCheck Personal Medication Record</Text> is attached consolidating his/her prescription, non-prescription and natural health product profile.
        </Text>

        <Text style={styles.paragraph}>
          This MedsCheck Personal Medication Record is for your reference and may be included as part of your patient's ongoing medical record.
        </Text>

        <Text style={styles.paragraph}>Please see attached</Text>

        {/* Follow-up status */}
        <Text style={styles.sectionTitle}>Please take note of the following:</Text>

        <View style={styles.checkboxRow}>
          <View style={form1.followUpStatus === 'no_issues' ? styles.checkboxChecked : styles.checkbox}>
            {form1.followUpStatus === 'no_issues' && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            No follow-up issues have been identified at this time. The MedsCheck Personal Medication Record is an accurate assessment of the patient's prescription, non-prescription and natural health product usage at this current moment.
          </Text>
        </View>

        <View style={styles.checkboxRow}>
          <View style={form1.followUpStatus === 'issues_identified' ? styles.checkboxChecked : styles.checkbox}>
            {form1.followUpStatus === 'issues_identified' && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            Follow-up issues have been identified with this MedsCheck review, and they have been summarized and are attached with this fax transmission.
          </Text>
        </View>

        {/* Issues box */}
        <Text style={{ fontSize: 9, marginTop: 8 }}>Issues</Text>
        <View style={styles.issuesBox}>
          <Text style={{ fontSize: 9 }}>{form1.issues || ''}</Text>
        </View>

        {/* Signature section */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureGroup}>
            <Text style={styles.signatureLabel}>Pharmacist Name</Text>
            <View style={styles.signatureLine}>
              <Text style={{ fontSize: 9 }}>{form1.pharmacistName || ''}</Text>
            </View>
          </View>
          <View style={styles.signatureGroup}>
            <Text style={styles.signatureLabel}>Pharmacist's Signature</Text>
            <View style={styles.signatureLine}>
              <Text style={{ fontSize: 9, fontStyle: 'italic' }}>{form1.pharmacistSignature || ''}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
