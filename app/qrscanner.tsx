import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const SCAN_AREA_SIZE = Math.min(width * 0.7, 300);

const QRScanner = () => {
  const url = Constants.expoConfig?.extra?.apiUrl;
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const router = useRouter();
  const scanLineAnim = React.useRef(new Animated.Value(0)).current;
  const { setSession } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setShowCamera(false);
      setTimeout(() => setShowCamera(true), 100);
    }, [])
  );

  React.useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <BlurView intensity={20} style={styles.permissionContainer}>
          <Ionicons name="camera" size={48} color="#112866" />
          <Text style={styles.permissionText}>
            Camera access is required for scanning QR codes
          </Text>
          <Text style={styles.permissionSubText}>
            Please grant camera permission to continue
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    );
  }

  const handleScan = async ({ data }: any) => {
    if (!scanned) {
      setScanned(true);
      try {
        const response = await fetch(`${url}/api/mobile/mobileAuth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log("API Response Status:", response.status);
        const responseData = await response.json();
        console.log("API Response Data:", responseData);

        const session = {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: responseData[0].ID,
            name: `${responseData[0].pi_fname} ${responseData[0].pi_lname}`,
            email: responseData[0].pi_email,
          },
        };

        await setSession(session);

        Alert.alert(
          "Success",
          "QR Code scanned successfully",
          [{ text: "OK" }],
          { cancelable: false }
        );

        router.push({
          pathname: "/userinfo/userinfo",
          params: {
            userData: JSON.stringify(responseData)
          }
        });
      } catch (error) {
        console.error("Scan error:", error);
        Alert.alert(
          "Error",
          "Failed to process QR code. Please try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      } finally {
        setTimeout(() => setScanned(false), 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      {showCamera && (
        <>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing={facing}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleScan}
          />
          <View style={styles.overlay}>
            <BlurView intensity={20} style={styles.scanAreaContainer}>
              <View style={styles.scanArea}>
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [
                        {
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, SCAN_AREA_SIZE],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </BlurView>
            <Text style={styles.scanText}>Position QR code within frame</Text>
            <Text style={styles.scanSubText}>
              Scanning will start automatically
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanAreaContainer: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    borderRadius: 20,
    overflow: "hidden",
  },
  scanArea: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#fff",
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#fff",
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#fff",
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#fff",
  },
  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#112866",
    position: "absolute",
  },
  scanText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  scanSubText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 8,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  permissionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#112866",
    textAlign: "center",
    marginTop: 20,
  },
  permissionSubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  permissionButton: {
    backgroundColor: "#112866",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default QRScanner;
