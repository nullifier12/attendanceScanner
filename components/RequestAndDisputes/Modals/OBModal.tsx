import { useAuth } from "@/contexts/AuthContext";
import { useRequest } from "@/contexts/RequestContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

interface OBModalProps {
  isVisible: boolean;
  setModalVisible: () => void;
}

interface OBRequest {
  employeeId: string;
  requestType: "OB";
  startDate: string;
  timeFrom: string;
  endDate: string;
  timeTo: string;
  location: string;
  reason: string;
  requestorID: string;
  subsidiary: string;
  department: string;
  designation: string;
  type: "Ob";
}

interface OBResponse {
  referenceId: string;
  success: boolean;
  message?: string;
}

const OBModal = ({ isVisible, setModalVisible }: OBModalProps) => {
  const [obReason, setObReason] = useState<string>("OB");
  const [location, setLocation] = useState("");
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
  const { session } = useAuth();
  const { refreshData } = useRequest();

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const url = Constants.expoConfig?.extra?.apiUrl;

  const submitOB = async () => {
    // Validation
    if (
      !fromDate ||
      !fromTime ||
      !toDate ||
      !toTime ||
      !location.trim() ||
      !reason.trim()
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!session?.token || !session?.user?.id) {
      Alert.alert("Error", "Session not found. Please login again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const obRequest: OBRequest = {
        employeeId: session.user.id,
        requestType: "OB",
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
        location: location.trim(),
        reason: reason.trim(),
        requestorID: session?.user.requestorId,
        subsidiary: session?.user?.company,
        department: session?.user.department,
        designation: session?.user.designation,
        type: "Ob",
      };

      console.log("OB Request:", obRequest);

      const response = await fetch(`${url}/api/mobile/saveRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(obRequest),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const responseData: OBResponse = await response.json();
      console.log("Success Response:", responseData);

      Alert.alert(
        "Success",
        `Your OB request has been submitted successfully!\nReference ID: ${
          responseData.referenceId || "N/A"
        }`,
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setObReason("OB");
              setLocation("");
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
      console.error("Submit OB error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      Alert.alert("Error", `Failed to submit request: ${errorMessage}`, [
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
            Official Business Request
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
          {/* Official Business Request Form */}
          <View style={styles.actionContainer}>
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>
                  Reason For OB
                </Text>
                <View style={[styles.pickerBox, { backgroundColor }]}>
                  <Picker
                    selectedValue={obReason}
                    style={[styles.picker, { color: textColor }]}
                    onValueChange={(itemValue) => setObReason(itemValue)}
                  >
                    <Picker.Item
                      label="Official Business"
                      value="OB"
                      color={textColor}
                    />
                    <Picker.Item
                      label="Field Work"
                      value="FW"
                      color={textColor}
                    />
                    <Picker.Item
                      label="Client Visit"
                      value="CV"
                      color={textColor}
                    />
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
                    {new Date().toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>Location</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { color: textColor, backgroundColor },
                ]}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#aaa"
              />
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>
                  Date From
                </Text>
                <Pressable
                  onPress={() => setShowFromDatePicker(true)}
                  style={[styles.datePickerBox, { backgroundColor }]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }]}>
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
                <Text style={[styles.label, { color: textColor }]}>
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
                  ]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }]}>
                    {fromTime
                      ? fromTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Select time"}
                  </Text>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={20}
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
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>
                  Date To
                </Text>
                <Pressable
                  onPress={() => setShowToDatePicker(true)}
                  style={[styles.datePickerBox, { backgroundColor }]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }]}>
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
                <Text style={[styles.label, { color: textColor }]}>
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
                  ]}
                >
                  <Text style={[styles.datePickerText, { color: textColor }]}>
                    {toTime
                      ? toTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Select time"}
                  </Text>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={20}
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
              <Text style={[styles.label, { color: textColor }]}>Reason</Text>
              <TextInput
                style={[
                  styles.reasonInput,
                  { color: textColor, backgroundColor },
                ]}
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason for OB"
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
                disabled={isSubmitting}
              >
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={submitOB}
                disabled={isSubmitting}
              >
                <Text style={styles.submitBtnText}>
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OBModal;

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
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
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
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
  },
  actionContainer: {
    rowGap: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#112866",
    marginBottom: 8,
    textAlign: "left",
  },
});
