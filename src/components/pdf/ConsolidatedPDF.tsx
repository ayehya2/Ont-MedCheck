import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { MedsCheckFormData } from '@/types/forms'

// Import individual form page components
import { Form1Page } from './Form1PDF'
import { Form2Page } from './Form2PDF'
import { Form3Page } from './Form3PDF'
import { Form4Page } from './Form4PDF'
import { Form5Page } from './Form5PDF'
import { Form6Page } from './Form6PDF'

interface ConsolidatedPDFProps {
  data: MedsCheckFormData
}

const styles = StyleSheet.create({
  coverPage: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
  coverTitle: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
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
  dividerPage: {
    padding: 40,
    fontSize: 18,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 300
  }
})

// Consolidated PDF includes all 6 forms with bookmarks for navigation
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
      <Page size="LETTER" style={styles.coverPage} bookmark="Table of Contents">
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
          <Text style={{fontSize: 12, marginBottom: 5, fontFamily: 'Times-Bold'}}>Contents:</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 1: Healthcare Provider Notification of MedsCheck Services</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 2: MedsCheck Patient Acknowledgement of Professional Pharmacy Service</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 3: Personal Medication Record</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 4: MedsCheck Pharmacist Worksheet</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 5: Patient Take-Home Summary</Text>
          <Text style={{fontSize: 11, marginBottom: 3}}>• Form 6: Diabetes Education Checklist</Text>
        </View>
        <Text style={styles.coverDate}>
          Generated: {new Date().toLocaleString('en-CA')}
        </Text>
      </Page>

      {/* Form 1: Healthcare Provider Notification */}
      <Page size="LETTER" style={styles.dividerPage} bookmark="Form 1: Healthcare Provider Notification">
        <Text>Form 1</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>Healthcare Provider Notification of MedsCheck Services</Text>
      </Page>
      <Form1Page data={data} />

      {/* Form 2: Patient Acknowledgement */}
      <Page size="LETTER" style={styles.dividerPage} bookmark="Form 2: Patient Acknowledgement">
        <Text>Form 2</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>MedsCheck Patient Acknowledgement of Professional Pharmacy Service</Text>
      </Page>
      <Form2Page data={data} />

      {/* Form 3: Personal Medication Record */}
      <Page size="LETTER" style={styles.dividerPage} bookmark="Form 3: Personal Medication Record">
        <Text>Form 3</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>Personal Medication Record</Text>
      </Page>
      <Form3Page data={data} />

      {/* Form 4: Pharmacist Worksheet */}
      <Page size="LETTER" style={styles.dividerPage} bookmark="Form 4: Pharmacist Worksheet">
        <Text>Form 4</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>MedsCheck Pharmacist Worksheet</Text>
      </Page>
      <Form4Page data={data} />

      {/* Form 5: Patient Take-Home Summary */}
      <Page size="LETTER" style={styles.dividerPage} bookmark="Form 5: Patient Take-Home Summary">
        <Text>Form 5</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>Patient Take-Home Summary</Text>
      </Page>
      <Form5Page data={data} />

      {/* Form 6: Diabetes Education Checklist */}
      <Page size="LETTER" style={styles.dividerPage} bookmark="Form 6: Diabetes Education Checklist">
        <Text>Form 6</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>Diabetes Education Checklist</Text>
      </Page>
      <Form6Page data={data} />
    </Document>
  )
}
