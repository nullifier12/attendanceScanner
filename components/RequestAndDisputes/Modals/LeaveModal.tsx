import { useAuth } from "@/contexts/AuthContext";
import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LeaveRequestForm } from "@/types/leave";
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
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  isVisible: boolean;
  setModalVisible: () => void;
  onRequestSubmitted?: () => void;
}

const LeaveModal = ({ isVisible, setModalVisible }: Props) => {
  const [leaveType, setLeaveType] = useState<string>("SL");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showToPicker, setShowToPicker] = useState(false);
  const [reason, setReason] = useState("");
  const [showLeaveTypePicker, setShowLeaveTypePicker] = useState(false);
  const { session } = useAuth();
  const url = Constants.expoConfig?.extra?.apiUrl;
  const { isTablet } = useResponsive();

  // Get theme colors
  console.log("session", session?.user);
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const now = new Date();

  const leaveTypes = [
    { label: "Sick Leave (SL)", value: "SL" },
    { label: "Vacation Leave (VL)", value: "VL" },
  ];

  const handleSubmit = async () => {
    // Validate form
    if (!fromDate || !toDate) {
      Alert.alert("Validation Error", "Please select both from and to dates.");
      return;
    }

    if (!reason.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter a reason for your leave request."
      );
      return;
    }

    if (fromDate > toDate) {
      Alert.alert("Validation Error", "From date cannot be after to date.");
      return;
    }

    // Create leave request object
    const leaveRequest: LeaveRequestForm = {
      requestType: leaveType as "SL" | "VL",
      startDate: fromDate.toISOString().split("T")[0],
      endDate: toDate.toISOString().split("T")[0],
      token: session?.token,
      employeeId: session?.user.id,
      reason: reason.trim(),
      requestorID: session?.user.requestorId,
      subsidiary: session?.user?.company,
      department: session?.user.department,
      designation: session?.user.designation,
      type: "Leave",
    };

    const response = await fetch(`${url}/api/mobile/saveRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(leaveRequest),
    });

    const responseData = await response.json();

    if (response.ok) {
      Alert.alert(
        "Success",
        `Your leave request has been submitted successfully!\nReference ID: ${responseData.referenceId}`,
        [
          {
            text: "OK",
            onPress: () => {
              setLeaveType("SL");
              setFromDate(null);
              setToDate(null);
              setReason("");

              setModalVisible();
            },
          },
        ]
      );
    } else {
      // Error case
      Alert.alert(
        "Error",
        responseData.message ||
          "Failed to submit leave request. Please try again.",
        [{ text: "OK" }]
      );
      return;
    }
  };

  const handleLeaveTypeSelect = (type: string) => {
    setLeaveType(type);
    setShowLeaveTypePicker(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={setModalVisible}
    >
      <SafeAreaView style={styles.overlay} edges={["top", "bottom"]}>
        <View
          style={[
            styles.modalView,
            { backgroundColor },
            isTablet && styles.modalViewTablet,
          ]}
        >
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
            Leave Request
          </Text>

          {/* Employee Info Section */}
          <View
            style={[
              styles.employeeInfoRow,
              isTablet && styles.employeeInfoRowTablet,
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.empLabel,
                  { color: textColor },
                  isTablet && styles.empLabelTablet,
                ]}
              >
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
              <Text
                style={[
                  styles.empLabel,
                  { color: textColor },
                  isTablet && styles.empLabelTablet,
                ]}
              >
                Subsidiary
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { color: textColor },
                  isTablet && styles.empValueTablet,
                ]}
              >
                {session?.user?.company}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.empLabel,
                  { color: textColor },
                  isTablet && styles.empLabelTablet,
                ]}
              >
                Designation
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { fontWeight: "bold" },
                  isTablet && styles.empValueTablet,
                ]}
              >
                {session?.user.designation}
              </Text>
              <Text
                style={[
                  styles.empLabel,
                  { color: textColor },
                  isTablet && styles.empLabelTablet,
                ]}
              >
                Department
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { color: textColor, fontWeight: "bold" },
                  isTablet && styles.empValueTablet,
                ]}
              >
                {session?.user.department}
              </Text>
            </View>
          </View>

          {/* Leave Request Form */}
          <View
            style={[
              styles.actionContainer,
              isTablet && styles.actionContainerTablet,
            ]}
          >
            {/* Leave Type - Touchable Selector */}
            <View style={styles.inputWrapper}>
              <Text
                style={[
                  styles.label,
                  { color: textColor },
                  isTablet && styles.labelTablet,
                ]}
              >
                Leave Type
              </Text>
              <TouchableOpacity
                onPress={() => setShowLeaveTypePicker(true)}
                style={[
                  styles.leaveTypeBox,
                  { backgroundColor },
                  isTablet && styles.leaveTypeBoxTablet,
                ]}
              >
                <Text
                  style={[
                    styles.leaveTypeText,
                    { color: textColor },
                    isTablet && styles.leaveTypeTextTablet,
                  ]}
                >
                  {leaveTypes.find((type) => type.value === leaveType)?.label ||
                    "Select leave type"}
                </Text>
                <Text style={[styles.dropdownArrow, { color: textColor }]}>
                  ▼
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Requested - Single Column */}
            <View style={styles.inputWrapper}>
              <Text
                style={[
                  styles.label,
                  { color: textColor },
                  isTablet && styles.labelTablet,
                ]}
              >
                Date Requested
              </Text>
              <View
                style={[
                  styles.dateRequestedBox,
                  { backgroundColor },
                  isTablet && styles.dateRequestedBoxTablet,
                ]}
              >
                <Text
                  style={[
                    styles.dateRequestedText,
                    { color: textColor },
                    isTablet && styles.dateRequestedTextTablet,
                  ]}
                >
                  {now.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Date From and To - Side by Side */}
            <View style={[styles.inputRow, isTablet && styles.inputRowTablet]}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text
                  style={[
                    styles.label,
                    { color: textColor },
                    isTablet && styles.labelTablet,
                  ]}
                >
                  Date From
                </Text>
                <Pressable
                  onPress={() => setShowFromPicker(true)}
                  style={[
                    styles.datePickerBox,
                    { backgroundColor },
                    isTablet && styles.datePickerBoxTablet,
                  ]}
                >
                  <Text
                    style={[
                      styles.datePickerText,
                      { color: textColor },
                      isTablet && styles.datePickerTextTablet,
                    ]}
                  >
                    {fromDate ? fromDate.toDateString() : "Select date"}
                  </Text>
                </Pressable>
                {showFromPicker && (
                  <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowFromPicker(false);
                      if (selectedDate) setFromDate(selectedDate);
                    }}
                  />
                )}
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text
                  style={[
                    styles.label,
                    { color: textColor },
                    isTablet && styles.labelTablet,
                  ]}
                >
                  Date To
                </Text>
                <Pressable
                  onPress={() => setShowToPicker(true)}
                  style={[
                    styles.datePickerBox,
                    { backgroundColor },
                    isTablet && styles.datePickerBoxTablet,
                  ]}
                >
                  <Text
                    style={[
                      styles.datePickerText,
                      { color: textColor },
                      isTablet && styles.datePickerTextTablet,
                    ]}
                  >
                    {toDate ? toDate.toDateString() : "Select date"}
                  </Text>
                </Pressable>
                {showToPicker && (
                  <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowToPicker(false);
                      if (selectedDate) setToDate(selectedDate);
                    }}
                  />
                )}
              </View>
            </View>

            {/* Reason Textarea */}
            <View style={styles.inputWrapper}>
              <Text
                style={[
                  styles.label,
                  { color: textColor },
                  isTablet && styles.labelTablet,
                ]}
              >
                Reason
              </Text>
              <TextInput
                style={[
                  styles.reasonInput,
                  { color: textColor, backgroundColor },
                  isTablet && styles.reasonInputTablet,
                ]}
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason for leave"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={isTablet ? 4 : 3}
              />
            </View>

            {/* Buttons */}
            <View
              style={[styles.buttonRow, isTablet && styles.buttonRowTablet]}
            >
              <TouchableOpacity
                style={[styles.cancelBtn, isTablet && styles.cancelBtnTablet]}
                onPress={setModalVisible}
              >
                <Text
                  style={[
                    styles.cancelBtnText,
                    isTablet && styles.cancelBtnTextTablet,
                  ]}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, isTablet && styles.submitBtnTablet]}
                onPress={handleSubmit}
              >
                <Text
                  style={[
                    styles.submitBtnText,
                    isTablet && styles.submitBtnTextTablet,
                  ]}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Leave Type Picker Modal */}
      <Modal
        visible={showLeaveTypePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLeaveTypePicker(false)}
      >
        <View style={styles.pickerOverlay}>
          <View
            style={[
              styles.pickerModal,
              { backgroundColor },
              isTablet && styles.pickerModalTablet,
            ]}
          >
            <View style={styles.pickerHeader}>
              <Text
                style={[
                  styles.pickerTitle,
                  { color: textColor },
                  isTablet && styles.pickerTitleTablet,
                ]}
              >
                Select Leave Type
              </Text>
              <TouchableOpacity onPress={() => setShowLeaveTypePicker(false)}>
                <Text style={[styles.pickerClose, { color: textColor }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            {leaveTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.pickerOption,
                  { backgroundColor },
                  leaveType === type.value && styles.pickerOptionSelected,
                  isTablet && styles.pickerOptionTablet,
                ]}
                onPress={() => handleLeaveTypeSelect(type.value)}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    { color: textColor },
                    leaveType === type.value && styles.pickerOptionTextSelected,
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

export default LeaveModal;

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
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
  leaveTypeBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 36,
  },
  leaveTypeBoxTablet: {
    borderRadius: 8,
    padding: 10,
    minHeight: 42,
  },
  leaveTypeText: {
    fontSize: 14,
    flex: 1,
  },
  leaveTypeTextTablet: {
    fontSize: 16,
  },
  dropdownArrow: {
    fontSize: 12,
    marginLeft: 8,
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
  inputRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  inputRowTablet: {
    gap: 8,
    marginBottom: 16,
  },
  dateRequestedBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    minHeight: 36,
    justifyContent: "center",
  },
  dateRequestedBoxTablet: {
    borderRadius: 8,
    padding: 10,
    minHeight: 42,
  },
  dateRequestedText: {
    fontSize: 14,
  },
  dateRequestedTextTablet: {
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
