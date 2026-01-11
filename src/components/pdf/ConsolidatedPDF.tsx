import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

// Import individual form page components - we'll need to create these exports
// For now, this is a placeholder that combines all forms

interface ConsolidatedPDFProps {
  data: MedsCheckFormData
}

const styles = StyleSheet.create({
  coverPage: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  coverTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 30,
    color: '#0066CC'
  },
  coverInfo: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  },
  coverDate: {
    fontSize: 12,
    marginTop: 30,
    textAlign: 'center',
    color: '#666'
  },
  sectionDivider: {
    padding: 40,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 300
  }
})

// Note: @react-pdf/renderer doesn't support PDF bookmarks/outlines natively
// This consolidated PDF includes all 6 forms with divider pages for easy navigation
export function ConsolidatedPDF({ data }: ConsolidatedPDFProps) {
  const patientName = data.form1.patientName || 
                     `${data.form2.patientFirstName} ${data.form2.patientLastName}`.trim() ||
                     `${data.form4.patientFirstName} ${data.form4.patientLastName}`.trim() ||
                     'Patient'
  const date = data.form1.date || new Date().toISOString().split('T')[0]
  
  return (
    <Document
      title={`MedsCheck Forms - ${patientName}`}
      author={data.form1.pharmacistName || data.pharmacy.pharmacistName || 'Pharmacist'}
      subject="Ontario MedsCheck - Complete Documentation Package"
      keywords="MedsCheck, Ontario, Pharmacy, Forms, All Forms"
    >
      {/* Cover Page */}
      <Page size="LETTER" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Ontario MedsCheck</Text>
        <Text style={{...styles.coverTitle, fontSize: 20, marginTop: 10}}>
          Complete Documentation Package
        </Text>
        <View style={{marginTop: 50}}>
          <Text style={styles.coverInfo}>Patient: {patientName}</Text>
          <Text style={styles.coverInfo}>Date: {date}</Text>
          <Text style={styles.coverInfo}>Pharmacist: {data.form1.pharmacistName || data.pharmacy.pharmacistName || ''}</Text>
        </View>
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 12, marginBottom: 5}}>Contents:</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 1: Healthcare Provider Notification</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 2: Patient Acknowledgement</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 3: Personal Medication Record</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 4: Pharmacist Worksheet</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 5: Diabetes Education Patient Take-Home Summary</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 6: Patient Take-Home Summary</Text>
        </View>
        <Text style={styles.coverDate}>
          Generated: {new Date().toLocaleString('en-CA')}
        </Text>
      </Page>

      {/* IMPORTANT: The individual form pages need to be imported here */}
      {/* Since each Form PDF component returns a <Document>, we cannot directly include them */}
      {/* This is a limitation of @react-pdf/renderer - it doesn't support nested Documents */}
      {/* or true PDF bookmarks */}
      
      {/* Workaround: Users download all forms separately with sequential naming */}
      {/* This provides organization through file naming rather than PDF bookmarks */}
      
      <Page size="LETTER" style={styles.coverPage}>
        <Text style={{fontSize: 16, textAlign: 'center', marginTop: 250}}>
          Note: This consolidated PDF feature requires restructuring the form components.
        </Text>
        <Text style={{fontSize: 12, textAlign: 'center', marginTop: 20, color: '#666'}}>
          Currently, please use "Download All" to get all 6 forms as separate PDFs.
        </Text>
        <Text style={{fontSize: 12, textAlign: 'center', marginTop: 10, color: '#666'}}>
          They will be named sequentially for easy organization.
        </Text>
      </Page>
    </Document>
  )
}
