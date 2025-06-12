import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip, DataTable } from "react-native-paper";

interface AttendanceRecord {
  date: string;
  in: string;
  out: string;
  status: string;
  hours: string;
}

interface TimeKeepingTableProps {
  attendance: AttendanceRecord[];
}

const TimeKeepingTable = ({ attendance }: TimeKeepingTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return "#4CAF50";
      case "late":
        return "#FFA000";
      case "absent":
        return "#F44336";
      default:
        return "#666";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="calendar-clock" size={24} color="#112866" />
          <Text style={styles.headerTitle}>Attendance Records</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialCommunityIcons name="calendar-check" size={24} color="#112866" />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.dateColumn}>
              <Text style={styles.headerText}>Date</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.timeColumn}>
              <Text style={styles.headerText}>Time In</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.timeColumn}>
              <Text style={styles.headerText}>Time Out</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.statusColumn}>
              <Text style={styles.headerText}>Status</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.hoursColumn}>
              <Text style={styles.headerText}>Hours</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.actionColumn}>
              <Text style={styles.headerText}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView
            style={styles.scrollView}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {attendance.map((record, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.dateColumn}>
                  <Text style={styles.cellText}>{record.date}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.timeColumn}>
                  <Text style={styles.cellText}>{record.in}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.timeColumn}>
                  <Text style={styles.cellText}>{record.out}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.statusColumn}>
                  <Chip
                    mode="flat"
                    style={[styles.statusChip, { backgroundColor: getStatusColor(record.status) }]}
                    textStyle={styles.statusText}
                  >
                    {record.status}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell style={styles.hoursColumn}>
                  <Text style={styles.cellText}>{record.hours}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.actionColumn}>
                  <MaterialCommunityIcons
                    name="eye"
                    size={20}
                    color="#112866"
                    onPress={() => console.log("View details for:", record.date)}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default TimeKeepingTable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
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
  scrollView: {
    maxHeight: 300,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#112866",
  },
  cellText: {
    fontSize: 14,
    color: "#666",
  },
  statusChip: {
    height: 28,
    minWidth: 80,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  // Column widths
  dateColumn: {
    flex: 2,
    minWidth: 120,
  },
  timeColumn: {
    flex: 1,
    minWidth: 100,
  },
  statusColumn: {
    flex: 1,
    minWidth: 100,
  },
  hoursColumn: {
    flex: 1,
    minWidth: 80,
  },
  actionColumn: {
    flex: 1,
    minWidth: 80,
  },
});
