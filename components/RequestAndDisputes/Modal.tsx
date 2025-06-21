import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import DisputeModal from "./Modals/DisputeModal";
import LeaveModal from "./Modals/LeaveModal";
import OBModal from "./Modals/OBModal";
import OTModal from "./Modals/OTModal";

interface RequestModalProps {
  isVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function RequestModal({ isVisible, setModalVisible }: RequestModalProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  const closeMainModal = () => {
    setModalVisible(false);
  };

  const openModal = (type: string) => {
    setActiveModal(type);
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeMainModal}
      >
        <View style={styles.overlay}>
          <View style={[styles.modalView, { backgroundColor }]}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: textColor }]}>Create Request</Text>
              <Pressable onPress={closeMainModal} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color={iconColor} />
              </Pressable>
            </View>

            <View style={styles.options}>
              <Pressable
                style={[styles.optionCard, { backgroundColor }]}
                onPress={() => openModal('leave')}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialCommunityIcons name="calendar-clock" size={24} color="#1976D2" />
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: textColor }]}>Leave Request</Text>
                  <Text style={[styles.optionDescription, { color: iconColor }]}>Apply for sick leave, vacation leave, or other types of leave</Text>
                </View>
              </Pressable>

              <Pressable
                style={[styles.optionCard, { backgroundColor }]}
                onPress={() => openModal('ot')}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                  <MaterialCommunityIcons name="clock-time-four" size={24} color="#2E7D32" />
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: textColor }]}>Overtime/Undertime</Text>
                  <Text style={[styles.optionDescription, { color: iconColor }]}>Request overtime work or undertime adjustments</Text>
                </View>
              </Pressable>

              <Pressable
                style={[styles.optionCard, { backgroundColor }]}
                onPress={() => openModal('ob')}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialCommunityIcons name="briefcase" size={24} color="#E65100" />
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: textColor }]}>Official Business</Text>
                  <Text style={[styles.optionDescription, { color: iconColor }]}>Request time off for official business matters</Text>
                </View>
              </Pressable>

              <Pressable
                style={[styles.optionCard, { backgroundColor }]}
                onPress={() => openModal('dispute')}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#FFEBEE' }]}>
                  <MaterialCommunityIcons name="alert-circle" size={24} color="#C62828" />
                </View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: textColor }]}>Time Dispute</Text>
                  <Text style={[styles.optionDescription, { color: iconColor }]}>Report and resolve time entry discrepancies</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <LeaveModal 
        isVisible={activeModal === 'leave'} 
        setModalVisible={() => setActiveModal(null)} 
      />
      <OTModal 
        isVisible={activeModal === 'ot'} 
        setModalVisible={() => setActiveModal(null)} 
      />
      <OBModal 
        isVisible={activeModal === 'ob'} 
        setModalVisible={() => setActiveModal(null)} 
      />
      <DisputeModal 
        isVisible={activeModal === 'dispute'} 
        setModalVisible={() => setActiveModal(null)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    maxWidth: 500,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  options: {
    padding: 20,
    gap: 16,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
