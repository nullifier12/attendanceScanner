import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  isVisible: boolean;
  setModalVisible: () => void;
}

const LeaveModal = ({ isVisible, setModalVisible }: Props) => {
  const [leaveType, setLeaveType] = useState<string>("SL");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showToPicker, setShowToPicker] = useState(false);

  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={setModalVisible}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalView, { backgroundColor }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>Leave Request</Text>
            <Pressable onPress={setModalVisible}>
              <Text style={[styles.closeButton, { color: textColor }]}>X</Text>
            </Pressable>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>Leave Type</Text>
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

            {/* From Date Picker */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>From</Text>
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

            {/* To Date Picker */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>To</Text>
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
});
