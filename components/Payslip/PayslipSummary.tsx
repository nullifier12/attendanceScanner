import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PayrollDataTable from "./PayrollDataTable";

interface PayslipRecord {
  id: string;
  period: string;
  date: string;
  basicPay: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: "Paid" | "Pending" | "Processing";
}

interface PayslipSummaryProps {
  payslips: PayslipRecord[];
}

const PayslipSummary = ({ payslips }: PayslipSummaryProps) => {
  const backgroundColor = useThemeColor({}, "background");

  // Sample payroll data - in real app, this would come from API
  const payrollData = [
    // Initial Earnings/Adjustments
    { category: "Basic Pay", jan: 21252.14, feb: 14953.86, mar: 14953.86, apr: 11630.78, may: 14123.09, jun: 14893.63, total: 91807.36 },
    { category: "Absences", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: 0.00 },
    { category: "Tardiness", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: 0.00 },
    { category: "Undertime", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: 0.00 },
    { category: "OT Pay", jan: 2160.00, feb: 508.85, mar: 0.00, apr: 519.23, may: 2648.08, jun: 119.32, total: 5955.48 },
    { category: "Regular ND", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: 0.00 },
    { category: "Add Back", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: 0.00 },
    { category: "Paid Holiday", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: 0.00 },
    
    // Taxable Earnings
    { category: "MSA", jan: 83.08, feb: 83.08, mar: 41.54, apr: 0.00, may: 0.00, jun: 0.00, total: 207.70 },
    { category: "NDREG20%", jan: 3685.92, feb: 2769.37, mar: 2699.59, apr: 1780.96, may: 2513.08, jun: 1474.61, total: 14923.53 },
    { category: "REF_BON (Referral Bonus)", jan: 20000.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 20000.00, total: 40000.00 },
    { category: "PAID PTO LEAVES_CURR", jan: 0.00, feb: 1661.54, mar: 0.00, apr: 4984.62, may: 2492.31, jun: 0.00, total: 9138.47 },
    { category: "P4P (Pay for Performance)", jan: 0.00, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 5000.00, total: 5000.00 },
    
    // Gross Pay
    { category: "Gross Pay", jan: 47181.14, feb: 19976.70, mar: 17694.99, apr: 18915.59, may: 21776.56, jun: 41487.56, total: 167032.54 },
    
    // Deductions
    { category: "Withholding Tax", jan: -3991.07, feb: 0.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: -3991.07 },
    { category: "SSS", jan: -1000.00, feb: -1000.00, mar: -1000.00, apr: -950.00, may: -1000.00, jun: -1000.00, total: -5950.00 },
    { category: "SSS Provident", jan: -750.00, feb: -25.00, mar: 0.00, apr: 0.00, may: -100.00, jun: -750.00, total: -1625.00 },
    { category: "PhilHealth", jan: -450.00, feb: -450.00, mar: -450.00, apr: -450.00, may: -450.00, jun: -450.00, total: -2700.00 },
    { category: "PAG-IBIG", jan: -200.00, feb: -200.00, mar: -200.00, apr: -200.00, may: -200.00, jun: -200.00, total: -1200.00 },
    
    // Other Deductions
    { category: "SEF_PROD_DED", jan: 0.00, feb: -400.00, mar: 0.00, apr: 0.00, may: 0.00, jun: 0.00, total: -400.00 },
    { category: "OTH_INC_PROD_DED", jan: 0.00, feb: 0.00, mar: -200.00, apr: 0.00, may: 0.00, jun: 0.00, total: -200.00 },
    
    // Non-taxable Earnings
    { category: "Non-taxable Earnings", jan: 0.00, feb: 400.00, mar: 2144.00, apr: 0.00, may: 0.00, jun: 0.00, total: 2544.00 },
    
    // Net Pay
    { category: "Net Pay", jan: 40790.07, feb: 18301.70, mar: 17988.99, apr: 17315.59, may: 20026.56, jun: 39087.56, total: 153510.47 }
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Payroll Data Table */}
      <PayrollDataTable 
        data={payrollData} 
        title="Payroll Data (Jan - Jun)" 
      />
    </ScrollView>
  );
};

export default PayslipSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
