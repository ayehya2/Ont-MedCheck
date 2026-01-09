import { StyleSheet, Font } from '@react-pdf/renderer'

// Register fonts - using built-in fonts for now
// In production, you might want to register Times New Roman
Font.register({
  family: 'Times-Roman',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times%20New%20Roman.ttf' }
  ]
})

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 36, // 0.5 inch margins
    fontFamily: 'Times-Roman',
    fontSize: 9,
    lineHeight: 1.4,
    color: '#000000',
    backgroundColor: '#FFFFFF'
  },
  
  // Headers
  mainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4
  },
  
  subtitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#E8E8E8',
    padding: 4,
    marginTop: 8,
    marginBottom: 4
  },
  
  subSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 2
  },
  
  // Form layout
  row: {
    flexDirection: 'row',
    marginBottom: 4
  },
  
  column: {
    flexDirection: 'column'
  },
  
  halfWidth: {
    width: '50%',
    paddingRight: 8
  },
  
  thirdWidth: {
    width: '33.33%',
    paddingRight: 8
  },
  
  quarterWidth: {
    width: '25%',
    paddingRight: 8
  },
  
  fullWidth: {
    width: '100%'
  },
  
  // Field styling
  fieldLabel: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 1
  },
  
  fieldValue: {
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 2,
    minHeight: 14
  },
  
  fieldValueBox: {
    fontSize: 9,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 4,
    minHeight: 40
  },
  
  inlineLabel: {
    fontSize: 9
  },
  
  inlineValue: {
    fontSize: 9,
    fontWeight: 'bold'
  },
  
  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  checkboxChecked: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333'
  },
  
  checkmark: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold'
  },
  
  checkboxLabel: {
    fontSize: 9,
    flex: 1
  },
  
  // Tables
  table: {
    width: '100%',
    marginTop: 4,
    marginBottom: 4
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderWidth: 1,
    borderColor: '#333333'
  },
  
  tableRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333333'
  },
  
  tableCell: {
    fontSize: 8,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#333333'
  },
  
  tableCellLast: {
    fontSize: 8,
    padding: 4
  },
  
  tableHeaderCell: {
    fontSize: 8,
    fontWeight: 'bold',
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#333333'
  },
  
  tableHeaderCellLast: {
    fontSize: 8,
    fontWeight: 'bold',
    padding: 4
  },
  
  // Signature area
  signatureArea: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  signatureBlock: {
    width: '45%'
  },
  
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginTop: 30,
    marginBottom: 2
  },
  
  signatureLabel: {
    fontSize: 8,
    color: '#666666'
  },
  
  // Misc
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 8
  },
  
  note: {
    fontSize: 8,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 4
  },
  
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 36,
    fontSize: 8,
    color: '#666666'
  },
  
  header: {
    marginBottom: 16
  },
  
  footer: {
    position: 'absolute',
    bottom: 36,
    left: 36,
    right: 36,
    fontSize: 7,
    color: '#666666',
    textAlign: 'center'
  },
  
  // Logo placeholder
  logoArea: {
    height: 40,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0066CC'
  },
  
  // Government form styling
  formNumber: {
    fontSize: 8,
    color: '#666666',
    textAlign: 'right',
    marginBottom: 4
  },
  
  instructions: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 8,
    padding: 6,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },

  // Text wrapping
  textWrap: {
    flexWrap: 'wrap'
  }
})

// Helper function to format dates
export function formatPDFDate(dateString: string): string {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Helper to render checkbox
export function renderCheckbox(checked: boolean): string {
  return checked ? '☑' : '☐'
}
