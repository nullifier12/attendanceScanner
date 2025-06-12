import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { currencyFormatter } from "../../utils/currencyFormatter";

interface PayslipDetailProps {
  payslip: {
    id: string;
    period: string;
    date: string;
    basicPay: number;
    allowances: number;
    deductions: number;
    netPay: number;
    status: string;
  };
  onClose: () => void;
}

const PayslipDetail = ({ payslip, onClose }: PayslipDetailProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "#4CAF50";
      case "pending":
        return "#FFA000";
      case "processing":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color="#112866"
          />
          <Text style={styles.headerTitle}>Payslip Details</Text>
        </View>
        <Button
          mode="text"
          onPress={onClose}
          icon="close"
          textColor="#666"
        >
          Close
        </Button>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payslip Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Payslip ID</Text>
              <Text style={styles.infoValue}>{payslip.id}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Period</Text>
              <Text style={styles.infoValue}>{payslip.period}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{payslip.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(payslip.status) },
                ]}
              >
                <Text style={styles.statusText}>{payslip.status}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings</Text>
          <View style={styles.earningsContainer}>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Basic Pay</Text>
              <Text style={styles.earningsValue}>
                {currencyFormatter.format(payslip.basicPay)}
              </Text>
            </View>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Allowances</Text>
              <Text style={styles.earningsValue}>
                {currencyFormatter.format(payslip.allowances)}
              </Text>
            </View>
            <View style={[styles.earningsRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Earnings</Text>
              <Text style={styles.totalValue}>
                {currencyFormatter.format(payslip.basicPay + payslip.allowances)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deductions</Text>
          <View style={styles.deductionsContainer}>
            <View style={styles.deductionsRow}>
              <Text style={styles.deductionsLabel}>Total Deductions</Text>
              <Text style={styles.deductionsValue}>
                {currencyFormatter.format(payslip.deductions)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Net Pay</Text>
          <View style={styles.netPayContainer}>
            <Text style={styles.netPayValue}>
              {currencyFormatter.format(payslip.netPay)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => console.log("Download payslip")}
          icon="download"
          style={styles.downloadButton}
        >
          Download Payslip
        </Button>
      </View>
    </View>
  );
};

export default PayslipDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#112866",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoItem: {
    flex: 1,
    minWidth: "45%",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  earningsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 16,
  },
  earningsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  earningsLabel: {
    fontSize: 14,
    color: "#666",
  },
  earningsValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
  },
  deductionsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 16,
  },
  deductionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  deductionsLabel: {
    fontSize: 14,
    color: "#666",
  },
  deductionsValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  netPayContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  netPayValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1976D2",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  downloadButton: {
    backgroundColor: "#112866",
  },
}); 