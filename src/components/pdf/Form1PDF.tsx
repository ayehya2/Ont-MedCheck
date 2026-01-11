import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

interface Form1PDFProps {
  data: MedsCheckFormData
  settings?: any
}

// Styles specific to Form 1
const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 11,
    fontFamily: 'Times-Roman',
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
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
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
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    width: 100
  },
  labelSmall: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    width: 85
  },
  value: {
    flex: 1,
    fontSize: 11,
    backgroundColor: '#E8EEF7',
    padding: 4,
    minHeight: 16
  },
  valueHalf: {
    flex: 1,
    fontSize: 11,
    backgroundColor: '#E8EEF7',
    padding: 4,
    minHeight: 16,
    marginRight: 10
  },
  valueText: {
    fontSize: 11,
    color: '#000000'
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.4
  },
  boldText: {
    fontFamily: 'Helvetica-Bold'
  },
  sectionTitle: {
    fontSize: 11,
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
    fontSize: 9
  },
  checkboxText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.4
  },
  issuesBox: {
    borderWidth: 1,
    borderColor: '#000000',
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
    fontSize: 11,
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

// Export just the page content for consolidated PDF
export function Form1Page({ data }: Form1PDFProps) {
  const form1 = data.form1

  return (
    <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={styles.logo} />
          <Image src='/medscheck-logo.png' style={styles.medsCheckLogoImage} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Healthcare Provider Notification of MedsCheck Services</Text>

        {/* Recipient Info Row 1: To and Fax */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={styles.labelSmall}>To</Text>
            <Text style={styles.valueHalf}>{form1.to || ''}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={styles.labelSmall}>Fax Number</Text>
            <Text style={styles.value}>{form1.faxNumber || ''}</Text>
          </View>
        </View>

        {/* Row 2: Telephone and Pages */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={{ ...styles.labelSmall, width: 125 }}>Telephone Number</Text>
            <Text style={styles.valueHalf}>{form1.telephoneNumber || ''}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={styles.labelSmall}>Pages</Text>
            <Text style={styles.value}>{form1.pages || ''}</Text>
          </View>
        </View>

        {/* Row 3: Email and Date */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={styles.labelSmall}>Email Address</Text>
            <Text style={styles.valueHalf}>{form1.emailAddress || ''}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text style={{ ...styles.labelSmall, width: 125 }}>Date (yyyy/mm/dd)</Text>
            <Text style={styles.value}>{formatDate(form1.date) || ''}</Text>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Patient's Name</Text>
          <Text style={styles.value}>{form1.patientName || ''}</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={{ ...styles.labelSmall, width: 115 }}>Patient's Address</Text>
          <Text style={styles.value}>{form1.patientAddress || ''}</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={{ ...styles.labelSmall, width: 125 }}>Telephone Number</Text>
          <Text style={styles.value}>{form1.patientPhone || ''}</Text>
        </View>

        {/* MedsCheck paragraph */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.inlineText}>
            <Text style={{ fontSize: 11 }}>Our mutual patient noted above has had a MedsCheck completed by our pharmacist on </Text>
            <View style={styles.inlineValue}>
              <Text style={{ fontSize: 11 }}>{formatDate(form1.medsCheckDate) || '                    '}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 11, marginTop: 2 }}>Date (yyyy/mm/dd)</Text>
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
        <Text style={{ fontSize: 11, marginTop: 8 }}>Issues</Text>
        <View style={styles.issuesBox}>
          <Text style={{ fontSize: 11 }}>{form1.issues || ''}</Text>
        </View>

        {/* Signature section */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureGroup}>
            <Text style={styles.signatureLabel}>Pharmacist Name</Text>
            <View style={styles.signatureLine}>
              <Text style={{ fontSize: 11 }}>{form1.pharmacistName || ''}</Text>
            </View>
          </View>
          <View style={styles.signatureGroup}>
            <Text style={styles.signatureLabel}>Pharmacist's Signature</Text>
            <View style={styles.signatureLine}>
              {form1.pharmacistSignature && form1.pharmacistSignature.startsWith('data:image') ? (
                <Image 
                  src={form1.pharmacistSignature} 
                  style={{ height: 25, objectFit: 'contain' }}
                />
              ) : (
                <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{form1.pharmacistSignature || ''}</Text>
              )}
            </View>
          </View>
        </View>
      </Page>
  )
}

// Export full document for individual download
export function Form1PDF({ data }: Form1PDFProps) {
  return (
    <Document>
      <Form1Page data={data} />
    </Document>
  )
}
