import ViewWrapper from "@/components/Layout/View";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RequestModal from "./Modal";
import RequestAndDisp from "./ReqAndDispTable";
const RequestAndDispute = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ViewWrapper>
      <View style={styles.addButton}>
        <Text style={styles.text} onPress={() => setModalVisible(true)}>
          +
        </Text>
        <RequestModal
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <RequestAndDisp />
    </ViewWrapper>
  );
};
export default RequestAndDispute;
const styles = StyleSheet.create({
  addButton: {
    width: "20%",
    padding: 10,
    backgroundColor: "#112866",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
