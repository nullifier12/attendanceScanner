import { useThemeColor } from "@/hooks/useThemeColor";
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
  
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

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
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.pageHeader, { backgroundColor }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="file-document-outline" size={24} color={iconColor} />
          <Text style={[styles.headerTitle, { color: textColor }]}>Payslip History</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialCommunityIcons name="download-outline" size={24} color={iconColor} />
        </View>
      </View>

      <View style={[styles.tableContainer, { backgroundColor }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.idColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>ID</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.periodColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Period</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Basic Pay</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Allowances</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Deductions</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.amountColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Net Pay</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Status</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>

            <ScrollView style={styles.tableBody}>
              {payslipArray.map((payslip) => (
                <DataTable.Row key={payslip.id}>
                  <DataTable.Cell style={styles.idColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{payslip.id}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.periodColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{payslip.period}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{payslip.date}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{currencyFormatter.format(payslip.basicPay)}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{currencyFormatter.format(payslip.allowances)}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{currencyFormatter.format(payslip.deductions)}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.amountColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>{currencyFormatter.format(payslip.netPay)}</Text>
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
                      name="file-document-outline"
                      size={24}
                      color={iconColor}
                      onPress={() => console.log("View details for:", payslip.id)}
                    />
                    <MaterialCommunityIcons
                      name="download-outline"
                      size={24}
                      color={iconColor}
                      onPress={() => console.log("Download payslip:", payslip.id)}
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
    padding: 16,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    padding: 4,
  },
  tableContainer: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  table: {
    backgroundColor: "transparent",
  },
  tableBody: {
    maxHeight: 400,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cellText: {
    fontSize: 14,
  },
  statusChip: {
    height: 28,
    minWidth: 80,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionIcon: {
    padding: 4,
  },
  // Column widths
  idColumn: {
    flex: 1,
    minWidth: 60,
  },
  periodColumn: {
    flex: 2,
    minWidth: 150,
  },
  dateColumn: {
    flex: 1,
    minWidth: 100,
  },
  amountColumn: {
    flex: 1,
    minWidth: 100,
  },
  statusColumn: {
    flex: 1,
    minWidth: 100,
  },
  actionColumn: {
    flex: 1,
    minWidth: 80,
  },
});

export default PayslipTable;

