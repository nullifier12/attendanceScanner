import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
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
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const { isTablet } = useResponsive();

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
    <View style={[styles.container, { backgroundColor }, isTablet && styles.containerTablet]}>
      <View style={styles.pageHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="calendar-clock" size={isTablet ? 28 : 24} color={iconColor} />
          <Text style={[styles.headerTitle, { color: textColor }, isTablet && styles.headerTitleTablet]}>Attendance Records</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialCommunityIcons name="calendar-check" size={isTablet ? 28 : 24} color={iconColor} />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={[styles.dateColumn, isTablet && styles.dateColumnTablet]}>
              <Text style={[styles.headerText, { color: textColor }, isTablet && styles.headerTextTablet]}>Date</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.timeColumn, isTablet && styles.timeColumnTablet]}>
              <Text style={[styles.headerText, { color: textColor }, isTablet && styles.headerTextTablet]}>Time In</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.timeColumn, isTablet && styles.timeColumnTablet]}>
              <Text style={[styles.headerText, { color: textColor }, isTablet && styles.headerTextTablet]}>Time Out</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.statusColumn, isTablet && styles.statusColumnTablet]}>
              <Text style={[styles.headerText, { color: textColor }, isTablet && styles.headerTextTablet]}>Status</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.hoursColumn, isTablet && styles.hoursColumnTablet]}>
              <Text style={[styles.headerText, { color: textColor }, isTablet && styles.headerTextTablet]}>Hours</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.actionColumn, isTablet && styles.actionColumnTablet]}>
              <Text style={[styles.headerText, { color: textColor }, isTablet && styles.headerTextTablet]}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView
            style={[styles.scrollView, isTablet && styles.scrollViewTablet]}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {attendance.map((record, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={[styles.dateColumn, isTablet && styles.dateColumnTablet]}>
                  <Text style={[styles.cellText, { color: textColor }, isTablet && styles.cellTextTablet]}>{record.date}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.timeColumn, isTablet && styles.timeColumnTablet]}>
                  <Text style={[styles.cellText, { color: textColor }, isTablet && styles.cellTextTablet]}>{record.in}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.timeColumn, isTablet && styles.timeColumnTablet]}>
                  <Text style={[styles.cellText, { color: textColor }, isTablet && styles.cellTextTablet]}>{record.out}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.statusColumn, isTablet && styles.statusColumnTablet]}>
                  <Chip
                    mode="flat"
                    style={[styles.statusChip, { backgroundColor: getStatusColor(record.status) }, isTablet && styles.statusChipTablet]}
                    textStyle={[styles.statusText, isTablet && styles.statusTextTablet]}
                  >
                    {record.status}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.hoursColumn, isTablet && styles.hoursColumnTablet]}>
                  <Text style={[styles.cellText, { color: textColor }, isTablet && styles.cellTextTablet]}>{record.hours}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.actionColumn, isTablet && styles.actionColumnTablet]}>
                  <MaterialCommunityIcons
                    name="eye"
                    size={isTablet ? 24 : 20}
                    color={iconColor}
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
  containerTablet: {
    borderRadius: 16,
    padding: 24,
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
  },
  headerTitleTablet: {
    fontSize: 20,
  },
  headerRight: {
    padding: 4,
  },
  scrollView: {
    maxHeight: 300,
  },
  scrollViewTablet: {
    maxHeight: 400,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerTextTablet: {
    fontSize: 16,
  },
  cellText: {
    fontSize: 14,
  },
  cellTextTablet: {
    fontSize: 16,
  },
  statusChip: {
    height: 28,
    minWidth: 80,
  },
  statusChipTablet: {
    height: 32,
    minWidth: 90,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  statusTextTablet: {
    fontSize: 14,
  },
  // Column widths
  dateColumn: {
    flex: 2,
    minWidth: 120,
  },
  dateColumnTablet: {
    minWidth: 140,
  },
  timeColumn: {
    flex: 1,
    minWidth: 100,
  },
  timeColumnTablet: {
    minWidth: 120,
  },
  statusColumn: {
    flex: 1,
    minWidth: 100,
  },
  statusColumnTablet: {
    minWidth: 120,
  },
  hoursColumn: {
    flex: 1,
    minWidth: 80,
  },
  hoursColumnTablet: {
    minWidth: 100,
  },
  actionColumn: {
    flex: 1,
    minWidth: 80,
  },
  actionColumnTablet: {
    minWidth: 100,
  },
});

