import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Chip, DataTable } from "react-native-paper";

interface RequestAndDispProps {
  type: string;
  data: {
    requests?: {
      leave?: any[] | undefined;
      ot?: any[] | undefined;
      ob?: any[] | undefined;
      disputes?: any[] | undefined;
    };
  };
}

const RequestAndDisp = ({ type, data }: RequestAndDispProps) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const leave = data.requests?.leave || [];
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

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
    switch (String(status)) {
      case "2":
        return "#4CAF50";
      case "1":
        return "#81D4FA";
      case "0":
        return "#F44336";
      default:
        return "#666"; // Gray for unknown status
    }
  };

  const renderTableContent = () => {
    switch (type) {
      case "leave":
        return (
          <>
            <DataTable.Header>
              <DataTable.Title style={styles.typeColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Type
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  From
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  To
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Status
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Action
                </Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {leave.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.typeColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.request_name}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.date_from
                        ? new Date(item.date_from)
                            .toISOString()
                            .slice(0, 10)
                            .replace(/-/g, "/")
                        : "-"}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.date_to
                        ? new Date(item.date_to)
                            .toISOString()
                            .slice(0, 10)
                            .replace(/-/g, "/")
                        : "-"}
                    </Text>
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
                      {item.status === 1
                        ? "Pending"
                        : item.status === 2
                        ? "Approved"
                        : item.status === 0
                        ? "Rejected"
                        : "Unknown"}
                    </Chip>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.actionColumn}>
                    <Pressable
                      onPress={() => {
                        setSelectedItem(item);
                        setModalVisible(true);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="eye"
                        size={24}
                        color={iconColor}
                      />
                    </Pressable>
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
                <Text style={[styles.headerText, { color: textColor }]}>
                  Date
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.hoursColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Hours
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Status
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Action
                </Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {otArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.date}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.hoursColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.hours}
                    </Text>
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
                      name="file-document"
                      size={24}
                      color={iconColor}
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
                <Text style={[styles.headerText, { color: textColor }]}>
                  Date
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.locationColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Location
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Status
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Action
                </Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {obArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.date}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.locationColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.location}
                    </Text>
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
                      name="file-document"
                      size={24}
                      color={iconColor}
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
                <Text style={[styles.headerText, { color: textColor }]}>
                  Date
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.typeColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Type
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.statusColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Status
                </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                <Text style={[styles.headerText, { color: textColor }]}>
                  Action
                </Text>
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scrollView}>
              {disputesArray.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.dateColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.date}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.typeColumn}>
                    <Text style={[styles.cellText, { color: textColor }]}>
                      {item.type}
                    </Text>
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
                      name="file-document"
                      size={24}
                      color={iconColor}
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
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.pageHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="file-document"
            size={24}
            color={iconColor}
          />
          <Text style={[styles.headerTitle, { color: textColor }]}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Requests
          </Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={iconColor}
          />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable style={styles.table}>{renderTableContent()}</DataTable>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, { backgroundColor }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={24}
                  color="#112866"
                />
                <Text style={[styles.modalTitle, { color: "#112866" }]}>
                  Request Details
                </Text>
              </View>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={iconColor}
                />
              </Pressable>
            </View>

            {/* Modal Content */}
            <ScrollView
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {selectedItem && (
                <>
                  {/* Reference ID Section */}
                  <View style={styles.detailSection}>
                    <View style={styles.sectionHeader}>
                      <MaterialCommunityIcons
                        name="identifier"
                        size={20}
                        color="#112866"
                      />
                      <Text style={[styles.sectionTitle, { color: "#112866" }]}>
                        Request Information
                      </Text>
                    </View>
                    <View style={styles.detailCard}>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Reference ID
                        </Text>
                        <Text
                          style={[
                            styles.detailValue,
                            { color: textColor, fontWeight: "600" },
                          ]}
                        >
                          {selectedItem.reference_id}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Request Type
                        </Text>
                        <Text
                          style={[styles.detailValue, { color: textColor }]}
                        >
                          {selectedItem.request_name}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Employee ID
                        </Text>
                        <Text
                          style={[styles.detailValue, { color: textColor }]}
                        >
                          {selectedItem.emp_id}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Date Section */}
                  <View style={styles.detailSection}>
                    <View style={styles.sectionHeader}>
                      <MaterialCommunityIcons
                        name="calendar-range"
                        size={20}
                        color="#112866"
                      />
                      <Text style={[styles.sectionTitle, { color: "#112866" }]}>
                        Date Information
                      </Text>
                    </View>
                    <View style={styles.detailCard}>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Date Filed
                        </Text>
                        <Text
                          style={[styles.detailValue, { color: textColor }]}
                        >
                          {selectedItem.date_filed
                            ? new Date(selectedItem.date_filed)
                                .toISOString()
                                .slice(0, 10)
                                .replace(/-/g, "/")
                            : "-"}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Date From
                        </Text>
                        <Text
                          style={[styles.detailValue, { color: textColor }]}
                        >
                          {selectedItem.date_from
                            ? new Date(selectedItem.date_from)
                                .toISOString()
                                .slice(0, 10)
                                .replace(/-/g, "/")
                            : "-"}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Date To
                        </Text>
                        <Text
                          style={[styles.detailValue, { color: textColor }]}
                        >
                          {selectedItem.date_to
                            ? new Date(selectedItem.date_to)
                                .toISOString()
                                .slice(0, 10)
                                .replace(/-/g, "/")
                            : "-"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Status Section */}
                  <View style={styles.detailSection}>
                    <View style={styles.sectionHeader}>
                      <MaterialCommunityIcons
                        name="information-outline"
                        size={20}
                        color="#112866"
                      />
                      <Text style={[styles.sectionTitle, { color: "#112866" }]}>
                        Status & Details
                      </Text>
                    </View>
                    <View style={styles.detailCard}>
                      <View style={styles.detailRowLong}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Details
                        </Text>
                        <Text
                          style={[styles.detailValueLong, { color: textColor }]}
                          numberOfLines={0}
                        >
                          {selectedItem.details || "-"}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text
                          style={[styles.detailLabel, { color: textColor }]}
                        >
                          Status
                        </Text>
                        <Chip
                          mode="flat"
                          style={[
                            styles.statusChip,
                            {
                              backgroundColor: getStatusColor(
                                selectedItem.status
                              ),
                            },
                          ]}
                          textStyle={styles.statusChipText}
                        >
                          {selectedItem.status === 1
                            ? "Pending"
                            : selectedItem.status === 2
                            ? "Approved"
                            : selectedItem.status === 0
                            ? "Rejected"
                            : "Unknown"}
                        </Chip>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RequestAndDisp;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  scrollView: {
    maxHeight: 200,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cellText: {
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
  headerRight: {
    padding: 4,
  },
  table: {
    backgroundColor: "transparent",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalView: {
    width: "100%",
    maxWidth: 500,
    maxHeight: "85%",
    borderRadius: 16,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  modalContent: {
    padding: 24,
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#112866",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  detailCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6c757d",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "400",
    flex: 2,
    textAlign: "right",
  },
  detailRowLong: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  detailValueLong: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    lineHeight: 20,
    textAlign: "left",
  },
});
