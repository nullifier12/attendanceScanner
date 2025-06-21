import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

interface WorkSchedule {
  day: string;
  time: string;
  breakTime: string;
}

const ScheduleTable = () => {
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

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
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.pageHeader, { backgroundColor }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color={iconColor}
          />
          <Text style={[styles.headerTitle, { color: textColor }]}>Work Schedule</Text>
        </View>
      </View>

      <View style={[styles.tableContainer, { backgroundColor }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.dayColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Day</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.timeColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Time</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.breakColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>Break Time</Text>
              </DataTable.Title>
            </DataTable.Header>

            {workSchedule.map((schedule) => (
              <DataTable.Row key={schedule.day}>
                <DataTable.Cell style={styles.dayColumn}>
                  <Text style={[styles.cellText, { color: textColor }]}>{schedule.day}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.timeColumn}>
                  <Text style={[styles.cellText, { color: textColor }]}>{schedule.time}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.breakColumn}>
                  <Text style={[styles.cellText, { color: textColor }]}>{schedule.breakTime}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.actionColumn}>
                  <MaterialCommunityIcons
                    name="eye"
                    size={20}
                    color={iconColor}
                    onPress={() => console.log("View details for:", schedule.day)}
                  />
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
  tableContainer: {
    flex: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    maxHeight: 400,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  table: {
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cellText: {
    fontSize: 14,
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
  actionColumn: {
    width: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default ScheduleTable;
