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
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showObReasonPicker, setShowObReasonPicker] = useState(false);
  const { session } = useAuth();
  const { refreshData } = useRequest();
  const { isTablet } = useResponsive();

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const url = Constants.expoConfig?.extra?.apiUrl;

  const obReasons = [
    { label: "Official Business (OB)", value: "OB" },
    { label: "Field Work (FW)", value: "FW" },
    { label: "Client Visit (CV)", value: "CV" },
  ];

  const handleObReasonSelect = (reason: string) => {
    setObReason(reason);
    setShowObReasonPicker(false);
  };

  const submitOB = async () => {
    // Validation
    if (!fromDate || !fromTime || !toDate || !toTime || !location.trim() || !reason.trim()) {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: OBResponse = await response.json();

      Alert.alert(
        "Success",
        `Your OB request has been submitted successfully!\nReference ID: ${responseData.referenceId}`,
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setObReason("OB");
              setFromDate(null);
              setFromTime(null);
              setToDate(null);
              setToTime(null);
              setLocation("");
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
                marginBottom: 6,
              },
              isTablet && styles.modalTitleTablet,
            ]}
          >
            Official Business Request
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
          {/* Official Business Request Form */}
          <View style={[styles.actionContainer, isTablet && styles.actionContainerTablet]}>
            {/* Reason For OB - Touchable Selector */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                Reason For OB
              </Text>
              <TouchableOpacity
                onPress={() => setShowObReasonPicker(true)}
                style={[styles.obReasonBox, { backgroundColor }, isTablet && styles.obReasonBoxTablet]}
              >
                <Text style={[styles.obReasonText, { color: textColor }, isTablet && styles.obReasonTextTablet]}>
                  {obReasons.find(type => type.value === obReason)?.label || "Select reason"}
                </Text>
                <Text style={[styles.dropdownArrow, { color: textColor }]}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Date Requested - Single Column */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>
                Date Requested
              </Text>
              <View style={[styles.dateRequestedBox, { backgroundColor }, isTablet && styles.dateRequestedBoxTablet]}>
                <Text
                  style={[styles.dateRequestedText, { color: textColor }, isTablet && styles.dateRequestedTextTablet]}
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }, isTablet && styles.labelTablet]}>Location</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { color: textColor, backgroundColor },
                  isTablet && styles.textInputTablet,
                ]}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#aaa"
              />
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
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 6 }]}>
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
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 6 }]}>
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
                placeholder="Enter reason for official business"
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
                onPress={submitOB}
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

      {/* OB Reason Picker Modal */}
      <Modal
        visible={showObReasonPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowObReasonPicker(false)}
      >
        <View style={styles.pickerOverlay}>
          <View style={[styles.pickerModal, { backgroundColor }, isTablet && styles.pickerModalTablet]}>
            <View style={styles.pickerHeader}>
              <Text style={[styles.pickerTitle, { color: textColor }, isTablet && styles.pickerTitleTablet]}>
                Select Reason For OB
              </Text>
              <TouchableOpacity onPress={() => setShowObReasonPicker(false)}>
                <Text style={[styles.pickerClose, { color: textColor }]}>✕</Text>
              </TouchableOpacity>
            </View>
            {obReasons.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.pickerOption,
                  { backgroundColor },
                  obReason === type.value && styles.pickerOptionSelected,
                  isTablet && styles.pickerOptionTablet,
                ]}
                onPress={() => handleObReasonSelect(type.value)}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    { color: textColor },
                    obReason === type.value && styles.pickerOptionTextSelected,
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

export default OBModal;

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
  obReasonBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 36,
  },
  obReasonBoxTablet: {
    borderRadius: 8,
    padding: 10,
    minHeight: 42,
  },
  obReasonText: {
    fontSize: 14,
    flex: 1,
  },
  obReasonTextTablet: {
    fontSize: 16,
  },
  dropdownArrow: {
    fontSize: 12,
    marginLeft: 8,
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
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    minHeight: 36,
    fontSize: 14,
  },
  textInputTablet: {
    borderRadius: 8,
    padding: 10,
    minHeight: 42,
    fontSize: 16,
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
