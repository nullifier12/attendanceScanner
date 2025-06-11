import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip, DataTable } from "react-native-paper";

interface RequestAndDispProps {
  type: string;
}

const RequestAndDisp = ({ type }: RequestAndDispProps) => {
  const leaveArray = [
    {
      type: "SL",
      from: "2025-06-01",
      to: "2025-06-02",
      status: "Approved",
      reason: "Medical Checkup",
    },
    {
      type: "VL",
      from: "2025-06-03",
      to: "2025-06-07",
      status: "Pending",
      reason: "Family Vacation",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
    {
      type: "SL",
      from: "2025-06-10",
      to: "2025-06-10",
      status: "Rejected",
      reason: "Dental Appointment",
    },
  ];

  const otArray = [
    {
      date: "2025-06-01",
      hours: "2",
      status: "Approved",
      reason: "Project Deadline",
    },
    {
      date: "2025-06-02",
      hours: "3",
      status: "Pending",
      reason: "System Update",
    },
    {
      date: "2025-06-03",
      hours: "4",
      status: "Rejected",
      reason: "Client Meeting",
    },
  ];

  const obArray = [
    {
      date: "2025-06-01",
      location: "Client Office",
      status: "Approved",
      reason: "Project Meeting",
    },
    {
      date: "2025-06-02",
      location: "Training Center",
      status: "Pending",
      reason: "Training Session",
    },
    {
      date: "2025-06-03",
      location: "Conference Hall",
      status: "Rejected",
      reason: "Team Building",
    },
  ];

  const disputesArray = [
    {
      date: "2025-06-01",
      type: "Time In",
      status: "Pending",
      reason: "System Error",
    },
    {
      date: "2025-06-02",
      type: "Time Out",
      status: "Approved",
      reason: "Network Issue",
    },
    {
      date: "2025-06-03",
      type: "Break Time",
      status: "Rejected",
      reason: "Manual Entry",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "#4CAF50";
      case "pending":
        return "#FFA000";
      case "rejected":
        return "#F44336";
      default:
        return "#666";
    }
  };

  const renderTableContent = () => {
    switch (type) {
      case "leave":
        return (
          <>
            <DataTable.Header>
              <DataTable.Title style={styles.typeColumn}>
                <Text style={styles.headerText}>Type</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={styles.headerText}>From</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={styles.headerText}>To</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={styles.headerText}>Status</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={styles.headerText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {leaveArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.typeColumn}>
                    <Text style={styles.cellText}>{item.type}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={styles.cellText}>{item.from}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={styles.cellText}>{item.to}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.statusColumn}>
                    <Chip
                      mode="flat"
                      style={[
                        styles.statusChip,
                        { backgroundColor: getStatusColor(item.status) },
                      ]}
                      textStyle={styles.statusChipText}
                    >
                      {item.status}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionColumn}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={20}
                      color="#112866"
                      onPress={() => console.log("View details", item)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </>
        );
      case "ot":
        return (
          <>
            <DataTable.Header>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={styles.headerText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.hoursColumn}>
                <Text style={styles.headerText}>Hours</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={styles.headerText}>Status</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={styles.headerText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {otArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={styles.cellText}>{item.date}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.hoursColumn}>
                    <Text style={styles.cellText}>{item.hours}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.statusColumn}>
                    <Chip
                      mode="flat"
                      style={[
                        styles.statusChip,
                        { backgroundColor: getStatusColor(item.status) },
                      ]}
                      textStyle={styles.statusChipText}
                    >
                      {item.status}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionColumn}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={20}
                      color="#112866"
                      onPress={() => console.log("View details", item)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </>
        );
      case "ob":
        return (
          <>
            <DataTable.Header>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={styles.headerText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.locationColumn}>
                <Text style={styles.headerText}>Location</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={styles.headerText}>Status</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={styles.headerText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {obArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={styles.cellText}>{item.date}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.locationColumn}>
                    <Text style={styles.cellText}>{item.location}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.statusColumn}>
                    <Chip
                      mode="flat"
                      style={[
                        styles.statusChip,
                        { backgroundColor: getStatusColor(item.status) },
                      ]}
                      textStyle={styles.statusChipText}
                    >
                      {item.status}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionColumn}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={20}
                      color="#112866"
                      onPress={() => console.log("View details", item)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </>
        );
      case "disputes":
        return (
          <>
            <DataTable.Header>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={styles.headerText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.typeColumn}>
                <Text style={styles.headerText}>Type</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={styles.headerText}>Status</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={styles.headerText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {disputesArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={styles.cellText}>{item.date}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.typeColumn}>
                    <Text style={styles.cellText}>{item.type}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.statusColumn}>
                    <Chip
                      mode="flat"
                      style={[
                        styles.statusChip,
                        { backgroundColor: getStatusColor(item.status) },
                      ]}
                      textStyle={styles.statusChipText}
                    >
                      {item.status}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionColumn}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={20}
                      color="#112866"
                      onPress={() => console.log("View details", item)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable>{renderTableContent()}</DataTable>
      </ScrollView>
    </View>
  );
};

export default RequestAndDisp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollView: {
    maxHeight: 200,
  },
  headerText: {
    color: "#112866",
    fontSize: 14,
    fontWeight: "600",
  },
  cellText: {
    color: "#333",
    fontSize: 14,
  },
  typeColumn: {
    width: 100,
    paddingHorizontal: 8,
  },
  dateColumn: {
    width: 120,
    paddingHorizontal: 8,
  },
  statusColumn: {
    width: 150,
    paddingHorizontal: 8,
  },
  actionColumn: {
    width: 80,
    paddingHorizontal: 8,
  },
  hoursColumn: {
    width: 100,
    paddingHorizontal: 8,
  },
  locationColumn: {
    width: 200,
    paddingHorizontal: 8,
  },
  statusChip: {
    height: 28,
    minWidth: 120,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusChipText: {
    color: "white",
    fontSize: 13,
    height: 40,
    fontWeight: "500",
    textAlign: "center",
  },
});
