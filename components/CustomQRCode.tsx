import { QRCodeData } from "@/utils/qrCodeGenerator";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface CustomQRCodeProps {
  data: QRCodeData;
  size?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

const CustomQRCode: React.FC<CustomQRCodeProps> = ({
  data,
  size = 200,
  backgroundColor = "white",
  foregroundColor = "#112866",
}) => {
  // Create a URL-encoded data string for QR code
  const createQRData = (data: QRCodeData): string => {
    const jsonString = JSON.stringify(data);
    return encodeURIComponent(jsonString);
  };

  // Generate QR code URL using a free QR code service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${createQRData(data)}&bgcolor=${backgroundColor.replace('#', '')}&color=${foregroundColor.replace('#', '')}&format=png&margin=10`;

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor }]}>
      <Image
        source={{ uri: qrCodeUrl }}
        style={[styles.qrImage, { width: size - 20, height: size - 20 }]}
        resizeMode="contain"
      />
    </View>
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
  },
  qrImage: {
    borderRadius: 4,
  },
});

export default CustomQRCode;
