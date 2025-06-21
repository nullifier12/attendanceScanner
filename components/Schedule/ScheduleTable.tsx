import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

interface WorkSchedule {
  day: string;
  time: string;
  breakTime: string;
}

const ScheduleTable = () => {
  const workSchedule: WorkSchedule[] = [
    {
      day: "Monday",
      time: "8:00 AM - 5:00 PM",
      breakTime: "12:00 PM - 1:00 PM",
    },
    {
      day: "Tuesday",
      time: "8:00 AM - 5:00 PM",
      breakTime: "12:00 PM - 1:00 PM",
    },
    {
      day: "Wednesday",
      time: "8:00 AM - 5:00 PM",
      breakTime: "12:00 PM - 1:00 PM",
    },
    {
      day: "Thursday",
      time: "8:00 AM - 5:00 PM",
      breakTime: "12:00 PM - 1:00 PM",
    },
    {
      day: "Friday",
      time: "8:00 AM - 5:00 PM",
      breakTime: "12:00 PM - 1:00 PM",
    },
    {
      day: "Saturday",
      time: "Day Off",
      breakTime: "N/A",
    },
    {
      day: "Sunday",
      time: "Day Off",
      breakTime: "N/A",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color="#112866"
          />
          <Text style={styles.headerTitle}>Work Schedule</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.dayColumn}>Day</DataTable.Title>
              <DataTable.Title style={styles.timeColumn}>Time</DataTable.Title>
              <DataTable.Title style={styles.breakColumn}>
                Break Time
              </DataTable.Title>
            </DataTable.Header>

            {workSchedule.map((schedule) => (
              <DataTable.Row key={schedule.day}>
                <DataTable.Cell style={styles.dayColumn}>
                  {schedule.day}
                </DataTable.Cell>
                <DataTable.Cell style={styles.timeColumn}>
                  {schedule.time}
                </DataTable.Cell>
                <DataTable.Cell style={styles.breakColumn}>
                  {schedule.breakTime}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
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
    maxHeight: 400,
  },
  table: {
    backgroundColor: "#fff",
  },
  dayColumn: {
    width: 120,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  timeColumn: {
    width: 150,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  breakColumn: {
    width: 150,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default ScheduleTable;
