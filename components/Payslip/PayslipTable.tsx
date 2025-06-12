import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip, DataTable } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { currencyFormatter } from "../../utils/currencyFormatter";

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

const PayslipTable = () => {
  const { session } = useAuth();

  const payslipArray: PayslipRecord[] = [
    {
      id: "PS001",
      period: "June 1-15, 2024",
      date: "2024-06-15",
      basicPay: 25000,
      allowances: 5000,
      deductions: 2000,
      netPay: 28000,
      status: "Paid",
    },
    {
      id: "PS002",
      period: "May 16-31, 2024",
      date: "2024-05-31",
      basicPay: 25000,
      allowances: 5000,
      deductions: 2000,
      netPay: 28000,
      status: "Paid",
    },
    {
      id: "PS003",
      period: "May 1-15, 2024",
      date: "2024-05-15",
      basicPay: 25000,
      allowances: 5000,
      deductions: 2000,
      netPay: 28000,
      status: "Paid",
    },
  ];

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

  // Calculate summary statistics
  const totalPaid = payslipArray.filter(p => p.status === "Paid").length;
  const totalPending = payslipArray.filter(p => p.status === "Pending").length;
  const totalProcessing = payslipArray.filter(p => p.status === "Processing").length;
  const totalNetPay = payslipArray.reduce((sum, p) => sum + p.netPay, 0);

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="file-document-outline" size={24} color="#112866" />
          <Text style={styles.headerTitle}>Payslip History</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialCommunityIcons name="download-outline" size={24} color="#112866" />
        </View>
      </View>

      <View style={styles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.idColumn}>ID</DataTable.Title>
              <DataTable.Title style={styles.periodColumn}>
                Period
              </DataTable.Title>
              <DataTable.Title style={styles.dateColumn}>Date</DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                Basic Pay
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                Allowances
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                Deductions
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                Net Pay
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                Status
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                Action
              </DataTable.Title>
            </DataTable.Header>

            <ScrollView style={styles.tableBody}>
              {payslipArray.map((payslip) => (
                <DataTable.Row key={payslip.id}>
                  <DataTable.Cell style={styles.idColumn}>
                    {payslip.id}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.periodColumn}>
                    {payslip.period}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateColumn}>
                    {payslip.date}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    {currencyFormatter.format(payslip.basicPay)}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    {currencyFormatter.format(payslip.allowances)}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    {currencyFormatter.format(payslip.deductions)}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    {currencyFormatter.format(payslip.netPay)}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.statusColumn}>
                    <Chip
                      mode="flat"
                      style={[
                        styles.statusChip,
                        {
                          backgroundColor:
                            getStatusColor(payslip.status) + "20",
                        },
                      ]}
                      textStyle={[
                        styles.statusChipText,
                        { color: getStatusColor(payslip.status) },
                      ]}
                    >
                      {payslip.status}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionColumn}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={24}
                      color="#112866"
                      style={styles.actionIcon}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  headerRight: {
    padding: 4,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  table: {
    backgroundColor: "#fff",
  },
  tableBody: {
    maxHeight: 200,
  },
  idColumn: {
    width: 80,
    paddingHorizontal: 8,
  },
  periodColumn: {
    width: 150,
    paddingHorizontal: 8,
  },
  dateColumn: {
    width: 120,
    paddingHorizontal: 8,
  },
  amountColumn: {
    width: 120,
    paddingHorizontal: 8,
  },
  statusColumn: {
    width: 120,
    paddingHorizontal: 8,
  },
  actionColumn: {
    width: 80,
    paddingHorizontal: 8,
  },
  statusChip: {
    height: 28,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionIcon: {
    padding: 4,
  },
});

export default PayslipTable;

