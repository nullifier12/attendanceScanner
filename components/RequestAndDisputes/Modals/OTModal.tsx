import { useAuth } from "@/contexts/AuthContext";
import { useRequest } from "@/contexts/RequestContext";
import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface OTModalProps {
  isVisible: boolean;
  setModalVisible: () => void;
}

interface OTUtRequest {
  employeeId: string;
  requestType: "OT" | "UT";
  startDate: string;
  timeFrom: string;
  endDate: string;
  timeTo: string;
  reason: string;
  requestorID: string;
  subsidiary: string;
  department: string;
  designation: string;
  type: "Ot";
}

interface OTUtResponse {
  referenceId: string;
  success: boolean;
  message?: string;
}

const OTModal = ({ isVisible, setModalVisible }: OTModalProps) => {
  const [requestType, setRequestType] = useState<"OT" | "UT">("OT");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRequestTypePicker, setShowRequestTypePicker] = useState(false);
  const { session } = useAuth();
  const { refreshData } = useRequest();
  const { isTablet } = useResponsive();

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const url = Constants.expoConfig?.extra?.apiUrl;

  const requestTypes = [
    { label: "Overtime (OT)", value: "OT" },
    { label: "Undertime (UT)", value: "UT" },
  ];

  const handleRequestTypeSelect = (type: "OT" | "UT") => {
    setRequestType(type);
    setShowRequestTypePicker(false);
  };

  const submitOtUt = async () => {
    // Validation
    if (!fromDate || !fromTime || !toDate || !toTime || !reason.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!session?.token || !session?.user?.id) {
      Alert.alert("Error", "Session not found. Please login again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const otUtRequest: OTUtRequest = {
        employeeId: session.user.id,
        requestType: requestType,
        startDate: fromDate.toISOString().split("T")[0],
        timeFrom: fromTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        endDate: toDate.toISOString().split("T")[0],
        timeTo: toTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        reason: reason.trim(),
        requestorID: session?.user.requestorId,
        subsidiary: session?.user?.company,
        department: session?.user.department,
        designation: session?.user.designation,
        type: "Ot",
      };
      console.log(",", otUtRequest);
      const response = await fetch(`${url}/api/mobile/saveRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(otUtRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: OTUtResponse = await response.json();

      Alert.alert(
        "Success",
        `Your ${requestType} request has been submitted successfully!\nReference ID: ${responseData.referenceId}`,
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setRequestType("OT");
              setFromDate(null);
              setFromTime(null);
              setToDate(null);
              setToTime(null);
              setReason("");

              // Close modal
              setModalVisible();

              // Refresh data
              refreshData();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Submit OT/UT error:", error);
      Alert.alert("Error", "Failed to submit request. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={setModalVisible}
    >
      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View style={[styles.modalView, { backgroundColor }, isTablet && styles.modalViewTablet]}>
          {/* Modal Title */}
          <Text
            style={[
              styles.modalTitle,
              {
                color: "#112866",
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 8,
              },
              isTablet && styles.modalTitleTablet,
            ]}
          >
            Overtime/Undertime Request
          </Text>
          {/* Employee Info Section */}
          <View style={[styles.employeeInfoRow, isTablet && styles.employeeInfoRowTablet]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.empLabel, { color: textColor }, isTablet && styles.empLabelTablet]}>
                Last, First MI
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { color: textColor, fontWeight: "bold" },
                  isTablet && styles.empValueTablet,
                ]}
              >
                {session?.user?.name || "-"}
              </Text>
              <Text style={[styles.empLabel, { color: textColor }, isTablet && styles.empLabelTablet]}>
                Subsidiary
              </Text>
              <Text style={[styles.empValue, { color: textColor }, isTablet && styles.empValueTablet]}>
                ABACUS
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.empLabel, { color: textColor }, isTablet && styles.empLabelTablet]}>
                Designation
              </Text>
              <Text style={[styles.empValue, { fontWeight: "bold" }, isTablet && styles.empValueTablet]}>
                Developer
              </Text>
              <Text style={[styles.empLabel, { color: textColor }, isTablet && styles.empLabelTablet]}>
                Department
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { color: textColor, fontWeight: "bold" },
                  isTablet && styles.empValueTablet,
                ]}
              >
                Information Technology
              </Text>
            </View>
          </View>
          {/* Overtime/Undertime Request Form */}
          <View style={[styles.actionContainer, isTablet && styles.actionContainerTablet]}>
            {/* Request Type - Touchable Selector */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                Request Type
              </Text>
              <TouchableOpacity
                onPress={() => setShowRequestTypePicker(true)}
                style={[styles.requestTypeBox, { backgroundColor }, isTablet && styles.requestTypeBoxTablet]}
              >
                <Text style={[styles.requestTypeText, { color: textColor }, isTablet && styles.requestTypeTextTablet]}>
                  {requestTypes.find(type => type.value === requestType)?.label || "Select request type"}
                </Text>
                <Text style={[styles.dropdownArrow, { color: textColor }]}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Date From and Time From - Side by Side */}
            <View style={[styles.inputRow, isTablet && styles.inputRowTablet]}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                  Date From
                </Text>
                <Pressable
                  onPress={() => setShowFromDatePicker(true)}
                  style={[styles.datePickerBox, { backgroundColor }, isTablet && styles.datePickerBoxTablet]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }, isTablet && styles.datePickerTextTablet]}>
                    {fromDate ? fromDate.toDateString() : "Select date"}
                  </Text>
                </Pressable>
                {showFromDatePicker && (
                  <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowFromDatePicker(false);
                      if (selectedDate) setFromDate(selectedDate);
                    }}
                  />
                )}
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                  Time From
                </Text>
                <Pressable
                  onPress={() => setShowFromTimePicker(true)}
                  style={[
                    styles.datePickerBox,
                    {
                      backgroundColor,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                    isTablet && styles.datePickerBoxTablet,
                  ]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }, isTablet && styles.datePickerTextTablet]}>
                    {fromTime
                      ? fromTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Select time"}
                  </Text>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={isTablet ? 24 : 20}
                    color={iconColor}
                  />
                </Pressable>
                {showFromTimePicker && (
                  <DateTimePicker
                    value={fromTime || new Date()}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowFromTimePicker(false);
                      if (selectedTime) setFromTime(selectedTime);
                    }}
                  />
                )}
              </View>
            </View>

            {/* Date To and Time To - Side by Side */}
            <View style={[styles.inputRow, isTablet && styles.inputRowTablet]}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                  Date To
                </Text>
                <Pressable
                  onPress={() => setShowToDatePicker(true)}
                  style={[styles.datePickerBox, { backgroundColor }, isTablet && styles.datePickerBoxTablet]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }, isTablet && styles.datePickerTextTablet]}>
                    {toDate ? toDate.toDateString() : "Select date"}
                  </Text>
                </Pressable>
                {showToDatePicker && (
                  <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowToDatePicker(false);
                      if (selectedDate) setToDate(selectedDate);
                    }}
                  />
                )}
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                  Time To
                </Text>
                <Pressable
                  onPress={() => setShowToTimePicker(true)}
                  style={[
                    styles.datePickerBox,
                    {
                      backgroundColor,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                    isTablet && styles.datePickerBoxTablet,
                  ]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }, isTablet && styles.datePickerTextTablet]}>
                    {toTime
                      ? toTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Select time"}
                  </Text>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={isTablet ? 24 : 20}
                    color={iconColor}
                  />
                </Pressable>
                {showToTimePicker && (
                  <DateTimePicker
                    value={toTime || new Date()}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowToTimePicker(false);
                      if (selectedTime) setToTime(selectedTime);
                    }}
                  />
                )}
              </View>
            </View>

            {/* Reason Textarea */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>Reason</Text>
              <TextInput
                style={[
                  styles.reasonInput,
                  { color: textColor, backgroundColor },
                  isTablet && styles.reasonInputTablet,
                ]}
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason for overtime/undertime"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={isTablet ? 4 : 3}
              />
            </View>

            {/* Buttons */}
            <View style={[styles.buttonRow, isTablet && styles.buttonRowTablet]}>
              <TouchableOpacity
                style={[styles.cancelBtn, isTablet && styles.cancelBtnTablet]}
                onPress={setModalVisible}
              >
                <Text style={[styles.cancelBtnText, isTablet && styles.cancelBtnTextTablet]}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, isTablet && styles.submitBtnTablet]}
                onPress={submitOtUt}
                disabled={isSubmitting}
              >
                <Text style={[styles.submitBtnText, isTablet && styles.submitBtnTextTablet]}>
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Request Type Picker Modal */}
      <Modal
        visible={showRequestTypePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRequestTypePicker(false)}
      >
        <View style={styles.pickerOverlay}>
          <View style={[styles.pickerModal, { backgroundColor }, isTablet && styles.pickerModalTablet]}>
            <View style={styles.pickerHeader}>
              <Text style={[styles.pickerTitle, { color: textColor }, isTablet && styles.pickerTitleTablet]}>
                Select Request Type
              </Text>
              <TouchableOpacity onPress={() => setShowRequestTypePicker(false)}>
                <Text style={[styles.pickerClose, { color: textColor }]}>✕</Text>
              </TouchableOpacity>
            </View>
            {requestTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.pickerOption,
                  { backgroundColor },
                  requestType === type.value && styles.pickerOptionSelected,
                  isTablet && styles.pickerOptionTablet,
                ]}
                onPress={() => handleRequestTypeSelect(type.value as "OT" | "UT")}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    { color: textColor },
                    requestType === type.value && styles.pickerOptionTextSelected,
                    isTablet && styles.pickerOptionTextTablet,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default OTModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    padding: 16,
    borderRadius: 10,
    width: "90%",
    elevation: 10,
  },
  modalViewTablet: {
    padding: 24,
    borderRadius: 16,
    width: "80%",
    maxWidth: 600,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#112866",
    marginBottom: 6,
    textAlign: "left",
  },
  modalTitleTablet: {
    fontSize: 20,
    marginBottom: 8,
  },
  employeeInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  employeeInfoRowTablet: {
    marginBottom: 16,
    gap: 16,
  },
  empLabel: {
    fontSize: 11,
    color: "#888",
  },
  empLabelTablet: {
    fontSize: 13,
  },
  empValue: {
    fontSize: 13,
    marginBottom: 2,
  },
  empValueTablet: {
    fontSize: 15,
    marginBottom: 4,
  },
  actionContainer: {
    rowGap: 12,
  },
  actionContainerTablet: {
    rowGap: 16,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
    fontSize: 14,
  },
  labelTablet: {
    marginBottom: 6,
    fontSize: 16,
  },
  requestTypeBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 36,
  },
  requestTypeBoxTablet: {
    borderRadius: 8,
    padding: 10,
    minHeight: 42,
  },
  requestTypeText: {
    fontSize: 14,
    flex: 1,
  },
  requestTypeTextTablet: {
    fontSize: 16,
  },
  dropdownArrow: {
    fontSize: 12,
    marginLeft: 8,
  },
  inputRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  inputRowTablet: {
    gap: 8,
    marginBottom: 16,
  },
  datePickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  datePickerBoxTablet: {
    borderRadius: 8,
    padding: 10,
  },
  datePickerText: {
    color: "#333",
    fontSize: 14,
  },
  datePickerTextTablet: {
    fontSize: 16,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    minHeight: 48,
    textAlignVertical: "top",
    fontSize: 14,
  },
  reasonInputTablet: {
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 12,
  },
  buttonRowTablet: {
    marginTop: 16,
    gap: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#b71c1c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelBtnTablet: {
    padding: 12,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelBtnTextTablet: {
    fontSize: 16,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#112866",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitBtnTablet: {
    padding: 12,
    borderRadius: 8,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  submitBtnTextTablet: {
    fontSize: 16,
  },
  // Picker Modal Styles
  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerModal: {
    width: "80%",
    maxWidth: 400,
    borderRadius: 10,
    padding: 16,
  },
  pickerModalTablet: {
    maxWidth: 500,
    borderRadius: 16,
    padding: 24,
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerTitleTablet: {
    fontSize: 20,
  },
  pickerClose: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  pickerOptionTablet: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: "#112866",
    borderColor: "#112866",
  },
  pickerOptionText: {
    fontSize: 16,
  },
  pickerOptionTextTablet: {
    fontSize: 18,
  },
  pickerOptionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});
