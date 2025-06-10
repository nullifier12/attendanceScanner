import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
const RequestAndDisp = () => {
  const leaveArray = [
    { type: "SL", from: "2025-06-01", to: "2025-06-02" },
    { type: "VL", from: "2025-06-03", to: "2025-06-07" },
    { type: "SL", from: "2025-06-10", to: "2025-06-10" },
    { type: "VL", from: "2025-06-15", to: "2025-06-19" },
    { type: "SL", from: "2025-06-20", to: "2025-06-21" },
    { type: "VL", from: "2025-06-22", to: "2025-06-24" },
    { type: "SL", from: "2025-06-25", to: "2025-06-25" },
    { type: "VL", from: "2025-06-26", to: "2025-06-30" },
    { type: "SL", from: "2025-07-01", to: "2025-07-02" },
    { type: "VL", from: "2025-07-03", to: "2025-07-05" },
  ];
  return (
    <View style={styles.forApprovalWrapper}>
      <Text style={styles.textApproval}>Approved Leave </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>Type</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>From</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>To</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>Action</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView
          style={{ maxHeight: 200 }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {leaveArray.map((d, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Text style={styles.dataTableTitle}>{d?.type}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.dataTableTitle}>{d.from}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.dataTableTitle}>{d.to}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <MaterialCommunityIcons
                  name="eye"
                  size={20}
                  color="white"
                  onPress={() => console.log("item ID", index)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
      </DataTable>
    </View>
  );
};
export default RequestAndDisp;
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
