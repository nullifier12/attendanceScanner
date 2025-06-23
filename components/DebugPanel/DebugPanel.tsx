import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { logger } from "../../utils/logger";
import { LogViewer } from "../LogViewer/LogViewer";

interface DebugPanelProps {
  visible: boolean;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ visible, onClose }) => {
  const lastVisibleRef = useRef(false);

  useEffect(() => {
    lastVisibleRef.current = visible;
  }, [visible]);

  const handleClearLogs = () => {
    logger.clearLogs().then(() => {
      Alert.alert("Logs Cleared", "All application logs have been deleted.");
    });
  };

  const modalBg = useThemeColor({}, "background");
  const borderColor = useThemeColor({ light: "#ccc", dark: "#333" }, "icon");
  const textColor = useThemeColor({}, "text");
  const buttonColor = useThemeColor({}, "tint");
  const buttonTextColor = useThemeColor(
    { light: buttonColor, dark: "#fff" },
    "background"
  );

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={[styles.container, { backgroundColor: modalBg }]}>
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <Text style={[styles.title, { color: textColor }]}>Debug Panel</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeButton, { color: textColor }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <LogViewer visible={visible} onClose={onClose} />
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: borderColor }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={handleClearLogs}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>
              Clear Logs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DebugPanel;
