import * as React from 'react'
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer'

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#F97316', // Saffron accent color
    paddingBottom: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  titleSymbol: {
    fontSize: 24,
    marginBottom: 5,
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C2D12', // Maroon
    textTransform: 'uppercase',
  },
  trustInfo: {
    fontSize: 9,
    color: '#666666',
    marginTop: 3,
    textAlign: 'center',
  },
  receiptHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#F97316',
    marginVertical: 15,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10,
  },
  metaLabel: {
    fontWeight: 'bold',
    color: '#555555',
  },
  metaValue: {
    fontFamily: 'Helvetica-Bold',
  },
  grid: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 8,
    alignItems: 'center',
  },
  rowLabel: {
    width: '35%',
    color: '#555555',
  },
  rowValue: {
    width: '65%',
    fontFamily: 'Helvetica-Bold',
  },
  taxNote: {
    fontSize: 8.5,
    color: '#666666',
    marginTop: 25,
    padding: 10,
    backgroundColor: '#FFF7ED', // Light saffron bg
    borderWidth: 1,
    borderColor: '#FFEDD5',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signatureBlock: {
    alignItems: 'center',
    width: 150,
  },
  signatureLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: '#666666',
  },
})

interface ReceiptData {
  receiptNumber: string
  templeName: string
  trustRegistrationNo: string | null
  date: string
  donorName: string
  donorPhone: string | null
  donorPan: string | null
  amount: number
  categoryName: string
  paymentMethod: string
}

// PDF Document Component
export const ReceiptDocument = ({ data }: { data: ReceiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Spiritual Symbol and Header */}
      <View style={styles.header}>
        <Text style={styles.titleSymbol}>🕉️</Text>
        <Text style={styles.templeName}>{data.templeName}</Text>
        {data.trustRegistrationNo && (
          <Text style={styles.trustInfo}>
            Registered Trust No: {data.trustRegistrationNo} | 80G Approved Benefit Section
          </Text>
        )}
      </View>

      {/* Title */}
      <Text style={styles.receiptHeader}>Donation Receipt</Text>

      {/* Metadata */}
      <View style={styles.metaContainer}>
        <View>
          <Text style={styles.metaLabel}>Receipt Number:</Text>
          <Text style={styles.metaValue}>{data.receiptNumber}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.metaLabel}>Date:</Text>
          <Text style={styles.metaValue}>{data.date}</Text>
        </View>
      </View>

      {/* Grid Content */}
      <View style={styles.grid}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Donor Name:</Text>
          <Text style={styles.rowValue}>{data.donorName}</Text>
        </View>
        {data.donorPhone && (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Contact Phone:</Text>
            <Text style={styles.rowValue}>{data.donorPhone}</Text>
          </View>
        )}
        {data.donorPan && (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Donor PAN:</Text>
            <Text style={styles.rowValue}>{data.donorPan}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Donation Category:</Text>
          <Text style={styles.rowValue}>{data.categoryName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Payment Method:</Text>
          <Text style={styles.rowValue}>{data.paymentMethod.toUpperCase()}</Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0, marginTop: 10 }]}>
          <Text style={[styles.rowLabel, { fontSize: 13, color: '#7C2D12' }]}>Total Amount:</Text>
          <Text style={[styles.rowValue, { fontSize: 14, color: '#7C2D12', fontFamily: 'Helvetica-Bold' }]}>
            INR {data.amount.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* 80G Tax Note */}
      {data.donorPan && (
        <View style={styles.taxNote}>
          <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 2 }}>80G Certificate Note:</Text>
          <Text>
            Donations made to this trust are eligible for tax exemption under section 80G of the Income Tax Act, 1961. Please retain this receipt for filing your tax returns.
          </Text>
        </View>
      )}

      {/* Signature and Seal */}
      <View style={styles.footer}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 8, color: '#888888' }}>
            Generated electronically via MandirAI OS.
          </Text>
        </View>
        <View style={styles.signatureBlock}>
          <div style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Authorized Trustee / Treasurer</Text>
        </View>
      </View>
    </Page>
  </Document>
)

// Helper function to render document to buffer
export async function generateReceiptPdfBuffer(data: ReceiptData): Promise<any> {
  const doc = React.createElement(ReceiptDocument, { data })
  const stream = await pdf(doc as any).toBuffer()
  return stream
}
