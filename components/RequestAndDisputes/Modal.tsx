import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import LeaveModal from "./Modals/LeaveModal";

export default function RequestModal(props: any) {
  const [leaveModal, setLeaveModal] = useState<boolean>(false);
  const closeMainModal = () => {
    props.setModalVisible(false);
  };
  const leaveModalClose = () => {
    setLeaveModal(false);
  };
  const leaveModalOpen = () => {
    console.log("presssedd");
    setLeaveModal(true);
    props.setModalVisible(false);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={closeMainModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Request</Text>
              <Pressable onPress={closeMainModal}>
                <Text style={styles.closeButton}>X</Text>
              </Pressable>
            </View>

            <View style={styles.options}>
              <View style={styles.optionTextWrapper}>
                <Text style={styles.optionText} onPress={leaveModalOpen}>
                  Leave
                </Text>
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={styles.optionText}>OT/UT</Text>
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={styles.optionText}>OB</Text>
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={styles.optionText}>Disputes</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <LeaveModal isVisible={leaveModal} setModalVisible={leaveModalClose} />
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
    backgroundColor: "white",
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
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  optionTextWrapper: {
    width: "20%",
    aspectRatio: 1,
    paddingVertical: 10,
    backgroundColor: "#112866",
    borderRadius: 8,
    overflow: "hidden",
  },
  optionText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
