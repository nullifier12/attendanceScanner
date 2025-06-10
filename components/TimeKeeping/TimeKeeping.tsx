import ViewWrapper from "@/components/Layout/View";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";
import TimeKeepingTable from "./TimekeepingTable";

const TimeKeeping = () => {
  const attendance = [
    { date: "2025-06-01", in: "08:00", out: "16:00" },
    { date: "2025-06-02", in: "08:15", out: "16:30" },
    { date: "2025-06-03", in: "09:00", out: "17:00" },
    { date: "2025-06-04", in: "08:45", out: "16:45" },
    { date: "2025-06-05", in: "08:30", out: "16:30" },
    { date: "2025-06-06", in: "08:00", out: "16:00" },
    { date: "2025-06-07", in: "09:15", out: "17:15" },
    { date: "2025-06-08", in: "08:10", out: "16:10" },
    { date: "2025-06-09", in: "08:20", out: "16:20" },
    { date: "2025-06-10", in: "08:05", out: "16:05" },
  ];

  return (
    <ViewWrapper>
      <View style={styles.gridContainer}>
        <TimeKeepingTable attendance={attendance} />
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <MaterialCommunityIcons
              name="beach"
              size={36}
              color="white"
              style={styles.icon}
            />
            <View>
              <Text style={styles.cardLabel}>Vacation Leave</Text>
              <Text style={styles.cardValue}>7</Text>
            </View>
          </View>
          <View style={styles.card}>
            <MaterialIcons
              name="sick"
              size={36}
              color="white"
              style={styles.icon}
            />
            <View>
              <Text style={styles.cardLabel}>Sick Leave</Text>
              <Text style={styles.cardValue}>7</Text>
            </View>
          </View>
        </View>
      </View>
    </ViewWrapper>
  );
};

export default TimeKeeping;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#112866",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    marginRight: 12,
  },
  cardLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  cardValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  forApprovalWrapper: {
    width: "100%",
    padding: 10,
    backgroundColor: "#112866",
    borderRadius: 8,
    overflow: "hidden",
  },
  textApproval: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  dataTableTitle: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
