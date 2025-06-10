import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
const TimeKeepingTable = (props: any) => {
  return (
    <View style={styles.forApprovalWrapper}>
      <Text style={styles.textApproval}>Attendance </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>Date</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>In</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>Out</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.dataTableTitle}>Action</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView
          style={{ maxHeight: 300 }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {props.attendance.map((d: any, index: number) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Text style={styles.dataTableTitle}>{d.date}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.dataTableTitle}>{d.in}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.dataTableTitle}>{d.out}</Text>
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

export default TimeKeepingTable;

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
