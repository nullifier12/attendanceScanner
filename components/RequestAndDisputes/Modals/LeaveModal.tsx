import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LeaveRequestForm } from "@/types/leave";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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
  const { session } = useAuth();
  const url = Constants.expoConfig?.extra?.apiUrl;
  // Get theme colors
  console.log("session", session?.user);
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const now = new Date();

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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={setModalVisible}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalView, { backgroundColor }]}>
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
            ]}
          >
            Leave Request
          </Text>
          {/* Employee Info Section */}
          <View style={styles.employeeInfoRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.empLabel, { color: textColor }]}>
                Last, First MI
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { color: textColor, fontWeight: "bold" },
                ]}
              >
                {session?.user?.name || "-"}
              </Text>
              <Text style={[styles.empLabel, { color: textColor }]}>
                Subsidiary
              </Text>
              <Text style={[styles.empValue, { color: textColor }]}>
                ABACUS
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.empLabel, { color: textColor }]}>
                Designation
              </Text>
              <Text style={[styles.empValue, { fontWeight: "bold" }]}>
                Developer
              </Text>
              <Text style={[styles.empLabel, { color: textColor }]}>
                Department
              </Text>
              <Text
                style={[
                  styles.empValue,
                  { color: textColor, fontWeight: "bold" },
                ]}
              >
                Information Technology
              </Text>
            </View>
          </View>
          {/* Leave Request Form */}
          <View style={styles.actionContainer}>
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>
                  Leave Type
                </Text>
                <View style={[styles.pickerBox, { backgroundColor }]}>
                  <Picker
                    selectedValue={leaveType}
                    style={[styles.picker, { color: textColor }]}
                    onValueChange={(itemValue) => setLeaveType(itemValue)}
                  >
                    <Picker.Item label="SL" value="SL" color={textColor} />
                    <Picker.Item label="VL" value="VL" color={textColor} />
                  </Picker>
                </View>
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: textColor }]}>
                  Date Requested
                </Text>
                <View style={[styles.dateRequestedBox, { backgroundColor }]}>
                  <Text
                    style={[styles.dateRequestedText, { color: textColor }]}
                  >
                    {now.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
            {/* From Date Picker */}
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>
                  Date From
                </Text>
                <Pressable
                  onPress={() => setShowFromPicker(true)}
                  style={[styles.datePickerBox, { backgroundColor }]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }]}>
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
                <Text style={[styles.label, { color: textColor }]}>
                  Date To
                </Text>
                <Pressable
                  onPress={() => setShowToPicker(true)}
                  style={[styles.datePickerBox, { backgroundColor }]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }]}>
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
              <Text style={[styles.label, { color: textColor }]}>Reason</Text>
              <TextInput
                style={[
                  styles.reasonInput,
                  { color: textColor, backgroundColor },
                ]}
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason for leave"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={3}
              />
            </View>
            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={setModalVisible}
              >
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
    padding: 20,
    borderRadius: 10,
    width: "90%",
    elevation: 10,
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
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50, // Reduced height to keep text visible
    width: "100%",
  },
  datePickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  datePickerText: {
    color: "#333",
  },
  employeeInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 16,
  },
  empLabel: {
    fontSize: 12,
    color: "#888",
  },
  empValue: {
    fontSize: 14,
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  dateRequestedBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 40,
    justifyContent: "center",
  },
  dateRequestedText: {
    fontSize: 14,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 60,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#b71c1c",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#112866",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#112866",
    marginBottom: 8,
    textAlign: "left",
  },
});
