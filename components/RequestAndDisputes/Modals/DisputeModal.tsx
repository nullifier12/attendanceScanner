import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

interface DisputeModalProps {
  isVisible: boolean;
  setModalVisible: () => void;
}

const DisputeModal = ({ isVisible, setModalVisible }: DisputeModalProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");

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
            <Text style={styles.title}>Time Dispute</Text>
            <Pressable onPress={setModalVisible}>
              <MaterialCommunityIcons name="close" size={24} color={iconColor} />
            </Pressable>
          </View>

          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>Date</Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={[styles.datePickerBox, { backgroundColor }]}
              >
                <Text style={[styles.datePickerText, { color: textColor }]}>
                  {date ? date.toDateString() : "Select date"}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>Dispute Type</Text>
              <TextInput
                mode="outlined"
                value={type}
                onChangeText={setType}
                style={[styles.input, { backgroundColor }]}
                textColor={textColor}
                placeholderTextColor={iconColor}
                placeholder="Time In/Time Out/Break Time"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: textColor }]}>Reason</Text>
              <TextInput
                mode="outlined"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
                style={[styles.input, { backgroundColor }]}
                textColor={textColor}
                placeholderTextColor={iconColor}
                placeholder="Enter reason for dispute"
              />
            </View>

            <Pressable style={styles.submitButton} onPress={setModalVisible}>
              <Text style={styles.submitButtonText}>Submit Dispute</Text>
            </Pressable>
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
    borderRadius: 12,
    width: "90%",
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#112866",
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  datePickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
  },
  datePickerText: {
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#112866",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
}); 