import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface DisputeModalProps {
  isVisible: boolean;
  setModalVisible: () => void;
}

const DisputeModal = ({ isVisible, setModalVisible }: DisputeModalProps) => {
  const [concern, setConcern] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [description, setDescription] = useState("");
  const { session } = useAuth();

  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const now = new Date();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={setModalVisible}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalView, { backgroundColor }]}>
          <Text style={[styles.modalTitle, { color: '#112866', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }]}>Disputes</Text>
          <View style={styles.employeeInfoRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.empLabel, { color: textColor }]}>Last, First MI</Text>
              <Text style={[styles.empValue, { color: textColor, fontWeight: "bold" }]}>{session?.user?.name || "-"}</Text>
              <Text style={[styles.empLabel, { color: textColor }]}>Subsidiary</Text>
              <Text style={[styles.empValue, { color: textColor }]}>ABACUS</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.empLabel, { color: textColor }]}>Designation</Text>
              <Text style={[styles.empValue, { fontWeight: "bold" }]}>Developer</Text>
              <Text style={[styles.empLabel, { color: textColor }]}>Department</Text>
              <Text style={[styles.empValue, { color: textColor, fontWeight: "bold" }]}>Information Technology</Text>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>What is the Concern about?</Text>
                <View style={[styles.pickerBox, { backgroundColor }]}>
                  <Picker
                    selectedValue={concern}
                    style={[styles.picker, { color: textColor }]}
                    onValueChange={(itemValue) => setConcern(itemValue)}
                  >
                    <Picker.Item label="Select concern" value="" color="#aaa" />
                    <Picker.Item label="Time In" value="Time In" color={textColor} />
                    <Picker.Item label="Time Out" value="Time Out" color={textColor} />
                    <Picker.Item label="Break Time" value="Break Time" color={textColor} />
                    <Picker.Item label="Others" value="Others" color={textColor} />
                  </Picker>
                </View>
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: textColor }]}>Date Requested</Text>
                <View style={[styles.dateRequestedBox, { backgroundColor }]}>
                  <Text style={[styles.dateRequestedText, { color: textColor }]}>{now.toLocaleString()}</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Text style={[styles.label, { color: textColor }]}>Date From</Text>
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
                <Text style={[styles.label, { color: textColor }]}>Date To</Text>
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
            </View>
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>Please provide a brief description of your concern</Text>
              <TextInput
                style={[styles.reasonInput, { color: textColor, backgroundColor }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter details of your concern"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={5}
              />
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={setModalVisible}>
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DisputeModal;

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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#112866',
    marginBottom: 8,
    textAlign: 'left',
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
    minHeight: 100,
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
}); 