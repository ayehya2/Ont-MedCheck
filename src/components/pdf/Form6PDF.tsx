import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { MedsCheckFormData } from '../../types/forms'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  title: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 8
  },
  note: {
    fontSize: 7,
    marginBottom: 10,
    padding: 6,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#CCC'
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#E0E0E0',
    padding: 4,
    marginTop: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#000'
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 6
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  tableRowLast: {
    flexDirection: 'row'
  },
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3
  },
  tableColLast: {
    padding: 3
  },
  tableCellLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1
  },
  tableCellValue: {
    fontSize: 9,
    color: '#00008B',
    backgroundColor: '#E8F0FE',
    padding: 2,
    minHeight: 14
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingLeft: 4
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
  checkboxValue: {
    fontSize: 8,
    color: '#00008B',
    backgroundColor: '#E8F0FE',
    padding: 2,
    marginLeft: 4,
    flex: 2
  },
  glossary: {
    fontSize: 6,
    padding: 4,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 6
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 7,
    textAlign: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  }
})

interface Form6PDFProps {
  data: MedsCheckFormData
}

export function Form6PDF({ data }: Form6PDFProps) {
  const form6 = data.form6

  return (
    <Document>
      {/* PAGE 1 - Patient Information and Initial Assessment */}
      <Page size="LETTER" style={styles.page}>
        {/* Header with logos */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={{ height: 28, width: 80, objectFit: 'contain' }} />
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Ministry of Health{'\n'}and Long-Term Care</Text>
          <Image src='/medscheck-logo.png' style={{ height: 28, width: 120, objectFit: 'contain' }} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Diabetes Education Checklist</Text>

        {/* Note */}
        <Text style={styles.note}>
          This document represents a list of the different subjects including insulin education if applicable to be covered during MedsCheck diabetes education sessions, and should be addressed according to the patient's needs, learning capabilities and the pharmacist availability. This education is considered specialty training. Pharmacists providing this service are required to have adequate knowledge of diabetes education through a professional program that is CCCEP approved or a Certified Diabetes Educator designation.{'\n\n'}
          Note** - See glossary for terms
        </Text>

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
              <Text style={styles.tableCellValue}>{form6.lastName}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.firstName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '25%' }]}>
              <Text style={styles.tableCellLabel}>Gender</Text>
            </View>
            <View style={[styles.tableCol, { width: '25%' }]}>
              <Text style={styles.tableCellLabel}>Date of Birth (yyyy/mm/dd)</Text>
            </View>
            <View style={[styles.tableCol, { width: '25%' }]}>
              <Text style={styles.tableCellLabel}>Health Card Number</Text>
            </View>
            <View style={[styles.tableColLast, { width: '25%' }]}>
              <Text style={styles.tableCellLabel}>Telephone Number</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '25%' }]}>
              <Text style={styles.tableCellValue}>{form6.gender}</Text>
            </View>
            <View style={[styles.tableCol, { width: '25%' }]}>
              <Text style={styles.tableCellValue}>{form6.dateOfBirth}</Text>
            </View>
            <View style={[styles.tableCol, { width: '25%' }]}>
              <Text style={styles.tableCellValue}>{form6.healthCardNumber}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '25%' }]}>
              <Text style={styles.tableCellValue}>{form6.telephoneNumber}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Date Patient Signed Annual Acknowledgement Form (yyyy/mm/dd)</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.datePatientSignedAcknowledgement}</Text>
            </View>
          </View>
        </View>

        {/* Caregiver Information */}
        <Text style={styles.sectionHeader}>Caregiver/Patient's Agent Information</Text>
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
              <Text style={styles.tableCellValue}>{form6.caregiverLastName}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.caregiverFirstName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Telephone Number</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Email Address</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.caregiverPhone}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.caregiverEmail}</Text>
            </View>
          </View>
        </View>

        {/* Primary Care Provider */}
        <Text style={styles.sectionHeader}>Primary Care Provider</Text>
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
              <Text style={styles.tableCellValue}>{form6.providerLastName}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.providerFirstName}</Text>
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
              <Text style={styles.tableCellLabel}>Email Address</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={[styles.tableCol, { width: '33.33%' }]}>
              <Text style={styles.tableCellValue}>{form6.providerPhone}</Text>
            </View>
            <View style={[styles.tableCol, { width: '33.33%' }]}>
              <Text style={styles.tableCellValue}>{form6.providerFax}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '33.34%' }]}>
              <Text style={styles.tableCellValue}>{form6.providerEmail}</Text>
            </View>
          </View>
        </View>

        {/* General Information */}
        <Text style={styles.sectionHeader}>General Information</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Stage of readiness for change</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.stageOfReadiness}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Identify Patient's Goals</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.identifyPatientsGoals}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>My Goals (information placed here - to be added to Patient Take-Home Summary)</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.myGoals}</Text>
            </View>
          </View>
        </View>

        {/* Medication Assessment */}
        <Text style={styles.sectionHeader}>Medication Assessment</Text>
        <View style={{ marginBottom: 6, paddingLeft: 4 }}>
          <View style={styles.checkboxRow}>
            <Text style={{ fontSize: 8, marginRight: 10 }}>Insulin use:</Text>
            <View style={form6.insulinUse === true ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, marginRight: 10 }}>Yes</Text>
            <View style={form6.insulinUse === false ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8 }}>No</Text>
          </View>
          <View style={styles.checkboxRow}>
            <Text style={{ fontSize: 8, marginRight: 10 }}>Oral Hypoglycemic Medications:</Text>
            <View style={form6.oralHypoglycemic === true ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, marginRight: 10 }}>Yes</Text>
            <View style={form6.oralHypoglycemic === false ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8 }}>No</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Pharmacists Comments on Drug Therapy</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.pharmacistComments}</Text>
            </View>
          </View>
        </View>

        {/* Lab Values */}
        <View style={{ marginBottom: 6 }}>
          <View style={styles.checkboxRow}>
            <View style={form6.hba1c ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>HbA1C*</Text>
            <Text style={styles.checkboxValue}>{form6.hba1cValue}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.bp ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>BP* (today's average)</Text>
            <Text style={styles.checkboxValue}>{form6.bpValue}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.fpg ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>FPG*</Text>
            <Text style={styles.checkboxValue}>{form6.fpgValue}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.tc ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, width: 30 }}>TC*</Text>
            <Text style={{ fontSize: 7, width: 60 }}>HDL ratio: {form6.hdlRatio}</Text>
            <Text style={{ fontSize: 7, width: 50 }}>LDL: {form6.ldl}</Text>
            <Text style={{ fontSize: 7, width: 50 }}>HDL: {form6.hdl}</Text>
            <Text style={{ fontSize: 7 }}>TG: {form6.tg}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          4969-47E (2022/11)     © King's Printer for Ontario, 2022     Disponible en français     Page 1 of 4
        </Text>
      </Page>

      {/* PAGE 2 - Health Assessment and Lifestyle */}
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={{ height: 28, width: 80, objectFit: 'contain' }} />
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Ministry of Health{'\n'}and Long-Term Care</Text>
          <Image src='/medscheck-logo.png' style={{ height: 28, width: 120, objectFit: 'contain' }} />
        </View>

        {/* Health Measurements */}
        <Text style={styles.sectionHeader}>Health Measurements</Text>
        <View style={{ marginBottom: 6 }}>
          <View style={styles.checkboxRow}>
            <View style={form6.physicalActivity ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>Physical Activity</Text>
            <Text style={styles.checkboxValue}>{form6.physicalActivityMinPerWeek} min/week</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.weight ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, width: 60 }}>Weight</Text>
            <Text style={{ fontSize: 7, width: 80 }}>Weight: {form6.weightValue}</Text>
            <Text style={{ fontSize: 7, width: 80 }}>Height: {form6.height}</Text>
            <Text style={{ fontSize: 7, width: 100 }}>Waist: {form6.waistCircumference}</Text>
            <Text style={{ fontSize: 7 }}>BMI*: {form6.bmi}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.cognitiveFunction ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>Cognitive function/learning impairments</Text>
            <Text style={styles.checkboxValue}>{form6.cognitiveFunctionNotes}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.medsCheckAnnualAvailable ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>MedsCheck for Diabetes (Annual) available for review (attached)</Text>
            <Text style={styles.checkboxValue}>{form6.medsCheckAnnualNotes}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.dtpIdentified ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>DTP identified and resolved (as per MedsCheck Diabetes (Annual) if applicable,)</Text>
            <Text style={styles.checkboxValue}>{form6.dtpNotes}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.tobacco ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, width: 50 }}>Tobacco</Text>
            <View style={form6.tobaccoYes ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, marginRight: 6 }}>Yes</Text>
            <View style={form6.tobaccoNo ? styles.checkboxChecked : styles.checkbox} />
            <Text style={{ fontSize: 8, width: 30 }}>No</Text>
            <Text style={styles.checkboxValue}>{form6.tobaccoCigPerDay} cig/day</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.smokingCessation ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>Smoking cessation offered</Text>
            <Text style={styles.checkboxValue}>{form6.smokingCessationNotes}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.alcoholDrugs ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>Alcohol/recreational drugs</Text>
            <Text style={{ fontSize: 7, width: 100 }}>{form6.alcoholDrugsType}</Text>
            <Text style={{ fontSize: 7, width: 80 }}>Frequency: {form6.alcoholDrugsFrequency}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.dietaryConcerns ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>Dietary concerns</Text>
            <Text style={styles.checkboxValue}>{form6.dietaryConcernsNotes}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={form6.otherHealth ? styles.checkboxChecked : styles.checkbox} />
            <Text style={styles.checkboxLabel}>Other (Specify)</Text>
            <Text style={styles.checkboxValue}>{form6.otherHealthNotes}</Text>
          </View>
        </View>

        {/* General Diabetes Education – Lifestyle / Health & Wellness */}
        <Text style={styles.sectionHeader}>General Diabetes Education – Lifestyle / Health & Wellness</Text>
        <View style={{ marginBottom: 6 }}>
          {[
            { checked: form6.managementOfMedications, label: 'Management of Medications (Rx and OTCs / herbals / vitamins)', value: form6.managementOfMedicationsNotes },
            { checked: form6.footCareDiscussion, label: 'Foot care discussion', value: form6.footCareNotes },
            { checked: form6.screeningForDN, label: 'Screening for DN*', value: form6.screeningForDNNotes },
            { checked: form6.footConditionUlcers, label: 'Foot condition/ulcers', value: form6.footConditionNotes },
            { checked: form6.properShoeFit, label: 'Proper shoe fit', value: form6.properShoeFitNotes },
            { checked: form6.bpMonitoring, label: 'BP monitoring*', value: form6.bpMonitoringNotes },
            { checked: form6.cvRiskFactors, label: 'CV and other risk factors*', value: form6.cvRiskFactorsNotes },
            { checked: form6.mentalHealthAssessment, label: 'Mental health assessment', value: form6.mentalHealthNotes },
            { checked: form6.erectileDysfunction, label: 'Erectile dysfunction/ sexual health', value: form6.erectileDysfunctionNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
          
          {/* Lifestyle with sub-items */}
          <View style={styles.checkboxRow}>
            <View style={form6.lifestyle ? styles.checkboxChecked : styles.checkbox} />
            <Text style={[styles.checkboxLabel, { fontFamily: 'Helvetica-Bold' }]}>Lifestyle:</Text>
          </View>
          {form6.lifestyle && (
            <View style={{ paddingLeft: 20 }}>
              <View style={styles.checkboxRow}>
                <View style={form6.lifestyleDiet ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Diet</Text>
                <Text style={styles.checkboxValue}>{form6.lifestyleDietNotes}</Text>
              </View>
              <View style={styles.checkboxRow}>
                <View style={form6.lifestyleStressReduction ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Stress Reduction</Text>
                <Text style={styles.checkboxValue}>{form6.lifestyleStressReductionNotes}</Text>
              </View>
              <View style={styles.checkboxRow}>
                <View style={form6.lifestyleExercise ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Exercise</Text>
                <Text style={styles.checkboxValue}>{form6.lifestyleExerciseNotes}</Text>
              </View>
            </View>
          )}

          {[
            { checked: form6.eyeHealth, label: 'Eye health and reminder of yearly eye exam', value: form6.eyeHealthNotes },
            { checked: form6.dentalHygiene, label: 'Dental hygiene', value: form6.dentalHygieneNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}

          {/* Immunizations with sub-items */}
          <View style={styles.checkboxRow}>
            <View style={form6.immunizations ? styles.checkboxChecked : styles.checkbox} />
            <Text style={[styles.checkboxLabel, { fontFamily: 'Helvetica-Bold' }]}>Immunizations:</Text>
          </View>
          {form6.immunizations && (
            <View style={{ paddingLeft: 20 }}>
              <View style={styles.checkboxRow}>
                <View style={form6.immunizationsInfluenza ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Influenza</Text>
                <Text style={styles.checkboxValue}>{form6.immunizationsInfluenzaNotes}</Text>
              </View>
              <View style={styles.checkboxRow}>
                <View style={form6.immunizationsPneumococcal ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Pneumococcal vaccine</Text>
                <Text style={styles.checkboxValue}>{form6.immunizationsPneumococcalNotes}</Text>
              </View>
              <View style={styles.checkboxRow}>
                <View style={form6.immunizationsOther ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Other (Specify)</Text>
                <Text style={styles.checkboxValue}>{form6.immunizationsOtherNotes}</Text>
              </View>
            </View>
          )}

          {[
            { checked: form6.drivingGuidelines, label: 'Driving guidelines', value: form6.drivingGuidelinesNotes },
            { checked: form6.travellingWithDiabetes, label: 'Travelling with diabetes', value: form6.travellingWithDiabetesNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          4969-47E (2022/11)     © King's Printer for Ontario, 2022     Disponible en français     Page 2 of 4
        </Text>
      </Page>

      {/* PAGE 3 - Blood Glucose Management and Specialty Training */}
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={{ height: 28, width: 80, objectFit: 'contain' }} />
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Ministry of Health{'\n'}and Long-Term Care</Text>
          <Image src='/medscheck-logo.png' style={{ height: 28, width: 120, objectFit: 'contain' }} />
        </View>

        {/* Self-Monitoring of Blood Glucose */}
        <Text style={styles.sectionHeader}>Self-Monitoring of Blood Glucose – Blood Sugar Management</Text>
        <View style={{ marginBottom: 6 }}>
          {[
            { checked: form6.meterTraining, label: 'Meter training', value: form6.meterTrainingNotes },
            { checked: form6.testingFrequency, label: 'Testing frequency and Optimal schedule', value: form6.testingFrequencyNotes },
            { checked: form6.recordingResults, label: 'Recording of results (logbook given)', value: form6.recordingResultsNotes },
            { checked: form6.identificationPatterns, label: 'Identification of patterns', value: form6.identificationPatternsNotes },
            { checked: form6.preventionHypoglycemia, label: 'Prevention, Identification and Treatment of hypoglycemia', value: form6.preventionHypoglycemiaNotes },
            { checked: form6.properMedicationHandling, label: 'Proper medication/supplies handling', value: form6.properMedicationHandlingNotes },
            { checked: form6.trainingDisposal, label: 'Training on use and disposal of diabetes supplies (needles, lancets)', value: form6.trainingDisposalNotes },
            { checked: form6.sickDaysManagement, label: 'Sick Days Management and Ketones Testing', value: form6.sickDaysManagementNotes },
            { checked: form6.individualizedBGTargets, label: 'Individualized BG targets*', value: form6.individualizedBGTargetsNotes },
            { checked: form6.otherBloodGlucose, label: 'Other (Specify)', value: form6.otherBloodGlucoseNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Specialty Training */}
        <Text style={styles.sectionHeader}>Specialty Training</Text>
        <View style={{ marginBottom: 6 }}>
          {[
            { checked: form6.insulinTypes, label: 'Insulin types/ duration of action', value: form6.insulinTypesNotes },
            { checked: form6.penSyringeHandling, label: 'Pen/ syringe handling', value: form6.penSyringeHandlingNotes },
            { checked: form6.sitePreparation, label: 'Site preparation and inspection', value: form6.sitePreparationNotes },
            { checked: form6.injectionTrainingGLP1, label: 'Injection training for GLP-1*', value: form6.injectionTrainingGLP1Notes },
            { checked: form6.properInjectionTechnique, label: 'Proper injection technique / site rotation', value: form6.properInjectionTechniqueNotes },
            { checked: form6.patientDemonstratedUse, label: 'Patient demonstrated use', value: form6.patientDemonstratedUseNotes },
            { checked: form6.dosageAdjustments, label: 'Dosage adjustments (BG patterns management)*', value: form6.dosageAdjustmentsNotes },
            { checked: form6.missedDoses, label: 'Missed or skipped doses/ timing of injections', value: form6.missedDosesNotes },
            { checked: form6.reviewCarbohydrate, label: 'Review of carbohydrate counting', value: form6.reviewCarbohydrateNotes },
            { checked: form6.emergencySickDay, label: 'Emergency and sick day management', value: form6.emergencySickDayNotes },
            { checked: form6.alcoholTobaccoInsulin, label: 'Alcohol/ recreational drugs/ tobacco and insulin', value: form6.alcoholTobaccoInsulinNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}

          {/* Updated Insulin Regimen */}
          <View style={styles.checkboxRow}>
            <View style={form6.updatedInsulinRegimen ? styles.checkboxChecked : styles.checkbox} />
            <Text style={[styles.checkboxLabel, { fontFamily: 'Helvetica-Bold' }]}>Updated Insulin Regimen:</Text>
          </View>
          {form6.updatedInsulinRegimen && (
            <View style={{ paddingLeft: 20, marginBottom: 4 }}>
              <Text style={{ fontSize: 7 }}>
                Type: {form6.insulinType1}     am: {form6.insulinType1Am}     noon: {form6.insulinType1Noon}     supper: {form6.insulinType1Supper}
              </Text>
              <Text style={{ fontSize: 7 }}>
                Type: {form6.insulinType2}     HS: {form6.insulinType2HS}     Other: {form6.insulinType2Other}
              </Text>
            </View>
          )}

          {[
            { checked: form6.otherSpecialty, label: 'Other (Specify)', value: form6.otherSpecialtyNotes },
            { checked: form6.otherComplications, label: 'Other complications discussed', value: form6.otherComplicationsNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Resources Provided */}
        <Text style={styles.sectionHeader}>Resources Provided</Text>
        <View style={{ marginBottom: 6 }}>
          {[
            { checked: form6.diabetesPassport, label: 'Diabetes Passport (record of important lab tests)', value: form6.diabetesPassportNotes },
            { checked: form6.sickDaysManagementPlan, label: 'Sick days management plan', value: form6.sickDaysManagementPlanNotes },
            { checked: form6.afterHoursSupport, label: 'After hours support/ contact information', value: form6.afterHoursSupportNotes },
            { checked: form6.directoryResources, label: 'Directory of local community resources', value: form6.directoryResourcesNotes },
            { checked: form6.otherMaterialGiven, label: 'Other material given to the patient', value: form6.otherMaterialGivenNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Resource Information to be added to Patient Take-Home Summary</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.resourceInformation}</Text>
            </View>
          </View>
        </View>

        {/* Referrals and Reason */}
        <Text style={styles.sectionHeader}>Referrals and Reason</Text>
        <View style={{ marginBottom: 6 }}>
          {[
            { checked: form6.endocrinologist, label: 'Endocrinologist', value: form6.endocrinologistNotes },
            { checked: form6.primaryCarePhysician, label: 'Primary care physician', value: form6.primaryCarePhysicianNotes },
            { checked: form6.dietitian, label: 'Dietitian', value: form6.dietitianNotes },
            { checked: form6.nurse, label: 'Nurse', value: form6.nurseNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          4969-47E (2022/11)     © King's Printer for Ontario, 2022     Disponible en français     Page 3 of 4
        </Text>
      </Page>

      {/* PAGE 4 - Follow-up and Summary */}
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src='/ontario-logo.png' style={{ height: 28, width: 80, objectFit: 'contain' }} />
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Ministry of Health{'\n'}and Long-Term Care</Text>
          <Image src='/medscheck-logo.png' style={{ height: 28, width: 120, objectFit: 'contain' }} />
        </View>

        {/* Referrals (Continued) */}
        <Text style={styles.sectionHeader}>Referrals (Continued)</Text>
        <View style={{ marginBottom: 6 }}>
          {[
            { checked: form6.familyPharmacist, label: 'Family pharmacist', value: form6.familyPharmacistNotes },
            { checked: form6.otherReferral, label: 'Other', value: form6.otherReferralNotes },
            { checked: form6.additionalReferral, label: '', value: form6.additionalReferralNotes }
          ].map((item, index) => (
            <View key={index} style={styles.checkboxRow}>
              <View style={item.checked ? styles.checkboxChecked : styles.checkbox} />
              <Text style={styles.checkboxLabel}>{item.label || '(Additional)'}</Text>
              <Text style={styles.checkboxValue}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Follow-up date (yyyy/mm/dd)</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.followUpDate}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Purpose</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.purpose}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Referral Information to be added to Patient Take-Home Summary</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.referralInformation}</Text>
            </View>
          </View>
        </View>

        {/* Summary and Goals */}
        <Text style={styles.sectionHeader}>Summary and Goals</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Summary of Today's Discussion</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.summaryDiscussion}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Summary of Discussion to be added to Patient Take-Home Summary</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.summaryToAddToTakeHome}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellLabel}>Reaching the Goal</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableColLast}>
              <Text style={styles.tableCellValue}>{form6.reachingTheGoal}</Text>
            </View>
          </View>
        </View>

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
              <Text style={styles.tableCellValue}>{form6.pharmacistFullName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>OCP Number</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Date of Diabetes Education (Diabetes Education is billed on the day of the consultation) (yyyy/mm/dd)</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.ocpNumber}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.dateOfDiabetesEducation}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Appointment Time</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellLabel}>Date Diabetes Education Documentation Completed (yyyy/mm/dd)</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.appointmentTime}</Text>
            </View>
            <View style={[styles.tableColLast, { width: '50%' }]}>
              <Text style={styles.tableCellValue}>{form6.dateDocumentationCompleted}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColLast}>
              <View style={styles.checkboxRow}>
                <View style={form6.copyRecordSentTo ? styles.checkboxChecked : styles.checkbox} />
                <Text style={styles.checkboxLabel}>Copy of this record sent to</Text>
                <Text style={styles.checkboxValue}>{form6.copyRecordSentToDetails}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Glossary */}
        <Text style={styles.glossary}>
          * CV= cardiovascular   DN- diabetic neuropathy   OTC= over-the-counter Rx = prescription   BP= blood pressure   HbA1C= hemoglobin A1C{'\n'}
          BMI= body mass index   BG = blood glucose   FPG= fasting plasma glucose  DOB=date of birth  GLP-1= Glucagon-like peptide-1{'\n'}
          TG=triglyceride   DTP = drug therapy problem  TC= total cholesterol HDL or LDL= high or low density lipoprotein
        </Text>

        {/* Footer */}
        <Text style={styles.footer}>
          4969-47E (2022/11)     © King's Printer for Ontario, 2022     Disponible en français     Page 4 of 4
        </Text>
      </Page>
    </Document>
  )
}
