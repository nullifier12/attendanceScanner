import { QRCodeData } from "@/utils/qrCodeGenerator";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomQRCodeProps {
  data: QRCodeData;
  size?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CustomQRCode: React.FC<CustomQRCodeProps> = ({
  data,
  size = 200,
  backgroundColor = "white",
  foregroundColor = "#112866",
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Create a URL-encoded data string for QR code
  const createQRData = (data: QRCodeData): string => {
    const jsonString = JSON.stringify(data);
    return encodeURIComponent(jsonString);
  };

  // Generate QR code URL using a free QR code service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${createQRData(data)}&bgcolor=${backgroundColor.replace('#', '')}&color=${foregroundColor.replace('#', '')}&format=png&margin=10`;

  // Generate larger QR code URL for modal
  const largeQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${Math.min(screenWidth * 0.8, 400)}x${Math.min(screenWidth * 0.8, 400)}&data=${createQRData(data)}&bgcolor=${backgroundColor.replace('#', '')}&color=${foregroundColor.replace('#', '')}&format=png&margin=20`;

  const handlePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.container, { width: size, height: size, backgroundColor }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: qrCodeUrl }}
          style={[styles.qrImage, { width: size - 20, height: size - 20 }]}
          resizeMode="contain"
        />
        <View style={styles.zoomIndicator}>
          <Ionicons name="expand-outline" size={16} color="#666" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeModal}
        >
          <TouchableOpacity 
            style={styles.modalContent} 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
          >
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.modalQRContainer}>
              <Image
                source={{ uri: largeQrCodeUrl }}
                style={styles.modalQRImage}
                resizeMode="contain"
              />
            </View>
            
            <Text style={styles.modalText}>Tap outside to close</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    position: "relative",
  },
  qrImage: {
    borderRadius: 4,
  },
  zoomIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    maxWidth: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  modalQRContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalQRImage: {
    width: Math.min(screenWidth * 0.8, 400),
    height: Math.min(screenWidth * 0.8, 400),
    borderRadius: 8,
  },
  modalText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default CustomQRCode;
