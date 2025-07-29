import { DebugPanel } from "@/components/DebugPanel/DebugPanel";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { debugHelper } from "@/utils/debugHelper";
import { logger } from "@/utils/logger";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNotification } from "../contexts/NotificationContext";
const Login = () => {
  const router = useRouter();
  const segments = useSegments();
  const { session, setSession } = useAuth();
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    employeeNumber?: string;
    password?: string;
    credentials?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false);
  const url = Constants.expoConfig?.extra?.apiUrl;
  const mobileKey = Constants.expoConfig?.extra?.mobileKey;
  const isInitialized = useRef(false);

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const { expoPushToken } = useNotification();

  // Combined initialization and biometric check
  useEffect(() => {
    if (!isInitialized.current) {
      debugHelper.logComponentLifecycle("Login", "mount");
      debugHelper.logAppStart();

      // Check API connectivity on mount
      debugHelper.checkApiConnectivity().then((isConnected) => {
        logger.info("API connectivity check result", { isConnected });
      });

      // Check biometric availability
      const checkBiometricSupport = async () => {
        try {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();

          setIsBiometricSupported(hasHardware);
          setIsBiometricEnrolled(isEnrolled);

          logger.info("Biometric support check", {
            hasHardware,
            isEnrolled,
          });
        } catch (error) {
          logger.error("Biometric support check failed", {
            error: (error as Error).message,
          });
        }
      };

      checkBiometricSupport();
      isInitialized.current = true;
    }

    return () => {
      debugHelper.logComponentLifecycle("Login", "unmount");
    };
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      employeeNumber: "",
      password: "",
      credentials: "",
    };

    if (!employeeNumber.trim()) {
      newErrors.employeeNumber = "Employee number is required";
      isValid = false;
    } else if (employeeNumber.length < 1) {
      newErrors.employeeNumber = "Employee number must be 8 digits";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBiometricAuth = async () => {
    try {
      logger.info("Biometric authentication started");

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with biometric",
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      logger.info("Biometric authentication result", Device.osInternalBuildId);

      if (result.success) {
        // For demo purposes, use a default employee number
        // In a real app, you would retrieve stored credentials
        setEmployeeNumber("12345678");
        setPassword("password123");

        Alert.alert(
          "Biometric Success",
          "Authentication successful! Please tap Login to continue.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Biometric Failed",
          "Authentication failed. Please try again or use manual login.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      logger.error("Biometric authentication error", {
        error: (error as Error).message,
      });

      Alert.alert(
        "Biometric Error",
        "Biometric authentication is not available. Please use manual login.",
        [{ text: "OK" }]
      );
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    logger.info("Login attempt started", {
      employeeNumber: employeeNumber.length,
      hasPassword: !!password,
      apiUrl: url,
    });

    setIsLoading(true);

    try {
      await logger.logApiRequest(`${url}/api/mobile/mobileAuth`, "POST", {
        ID: employeeNumber,
        password: "***",
      });
      const registerToken = await fetch(`${url}/api/mobile/registerPushToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: employeeNumber,
          push_token: expoPushToken,
          device_id: Device.osInternalBuildId,
        }),
      });
      const deviceToken = await registerToken.json();
      console.log("tokenDevice", deviceToken);

      if (deviceToken.ok === false || deviceToken.success === false) {
        throw new Error(
          deviceToken.message ||
            deviceToken.error ||
            "Failed to register push token"
        );
      }

      if (
        deviceToken.ok === undefined &&
        deviceToken.success === undefined &&
        deviceToken.message
      ) {
        if (__DEV__) {
          debugHelper.showErrorAlert(
            "Push Token Registration",
            deviceToken.message,
            deviceToken
          );
        }
      }
      const tokenResponse = await fetch(`${url}/api/mobile/generateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${mobileKey}`,
        },
        body: JSON.stringify({
          ID: employeeNumber,
          password: password,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokenData.message || "Failed to generate token");
      }

      const response = await fetch(`${url}/api/mobile/mobileAuth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          ID: employeeNumber,
          password: password,
          device_id: Device.osInternalBuildId,
        }),
      });

      // Log API response
      await logger.logApiResponse(
        `${url}/api/mobile/mobileAuth`,
        "POST",
        response.status
      );

      if (!response.ok) {
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        logger.error("Login failed - HTTP error", {
          status: response.status,
          statusText: response.statusText,
        });

        setErrors((prev) => ({
          ...prev,
          credentials: "Employee number or Password is incorrect",
        }));
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();

      logger.info("Login API response received", {
        hasData: !!responseData,
        dataKeys: responseData ? Object.keys(responseData) : [],
      });

      const session = {
        token: responseData.token,
        user: {
          id: responseData?.user?.empID,
          name: `${responseData?.user?.pi_lname},${responseData?.user?.pi_fname}`,
          email: responseData?.user?.pi_email,
          department: responseData?.user?.comp_assign_department,
          designation: responseData?.user?.comp_assign_designation,
          location: responseData?.user?.comp_assign_location,
          company: responseData?.user?.comp_assign_subsidiary,
          requestorId: responseData?.user?.ID,
        },
      };

      logger.info("Setting session", {
        userId: session.user.id,
        userName: session.user.name,
      });

      await setSession(session);

      logger.info("Session set successfully, navigating to userinfo");

      // Log navigation
      debugHelper.logNavigation("login", "userinfo/userinfo", {
        hasUserData: !!responseData,
      });

      // Navigate with error handling
      try {
        router.push({
          pathname: "/userinfo/userinfo",
          params: {
            userData: JSON.stringify(responseData),
          },
        });

        logger.info("Navigation to userinfo completed");
      } catch (navigationError) {
        logger.error("Navigation failed", {
          error: (navigationError as Error).message,
        });

        // Fallback navigation
        router.replace("/userinfo/userinfo");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error("Login error", {
        error: errorMessage,
        stack: (error as Error).stack,
      });

      // Show debug alert in development
      if (__DEV__) {
        debugHelper.showErrorAlert("Login Error", errorMessage, error);
      }

      setErrors((prev) => ({
        ...prev,
        credentials: "Employee number or Password is incorrect",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={[styles.content, { backgroundColor }]}>
        {/* Debug Panel Toggle - Only show in development */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.debugButton}
            onPress={() => setShowDebugPanel(true)}
          >
            <Text style={styles.debugButtonText}>🐛 Debug</Text>
          </TouchableOpacity>
        )}

        <View style={styles.logoContainer}>
          <Image
            source={require("./../assets/images/KCPAPI.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.formContainer, { backgroundColor }]}>
          <View style={[styles.inputContainer, { backgroundColor }]}>
            <Ionicons name="id-card-outline" size={20} color={iconColor} />
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Employee Number"
              placeholderTextColor={iconColor}
              value={employeeNumber}
              onChangeText={(text) => {
                setEmployeeNumber(text);
                setErrors((prev) => ({
                  ...prev,
                  employeeNumber: "",
                  credentials: "",
                }));
              }}
              // keyboardType="number-pad"
              maxLength={8}
            />
          </View>
          {errors.employeeNumber ? (
            <Text style={styles.errorText}>{errors.employeeNumber}</Text>
          ) : null}

          <View style={[styles.inputContainer, { backgroundColor }]}>
            <Ionicons name="lock-closed-outline" size={20} color={iconColor} />
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Password"
              placeholderTextColor={iconColor}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({
                  ...prev,
                  password: "",
                  credentials: "",
                }));
              }}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={iconColor}
              />
            </Pressable>
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          {errors.credentials ? (
            <Text style={styles.errorText}>{errors.credentials}</Text>
          ) : null}

          <Pressable
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
            android_ripple={{
              color: "rgba(255,255,255,0.2)",
              borderless: false,
            }}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </Pressable>

          {/* Biometric Authentication */}
          {/* {isBiometricSupported && isBiometricEnrolled ? (
            <>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={[styles.dividerText, { color: iconColor }]}>
                  OR
                </Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.biometricButton}
                onPress={handleBiometricAuth}
                disabled={isLoading}
              >
                <Ionicons name="finger-print" size={24} color="#112866" />
                <Text style={styles.biometricButtonText}>
                  Login with Fingerprint
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.biometricInfoContainer}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={iconColor}
              />
              <Text style={[styles.biometricInfoText, { color: iconColor }]}>
                {!isBiometricSupported
                  ? "Biometric authentication not available on this device"
                  : "Please set up biometric authentication in your device settings"}
              </Text>
            </View>
          )} */}
        </View>

        {/* Version Number */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: iconColor }]}>
            Version: {Constants.expoConfig?.version || "1.0.0"}
          </Text>
        </View>
      </View>

      {/* Debug Panel */}
      <DebugPanel
        visible={showDebugPanel}
        onClose={() => setShowDebugPanel(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 200,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112866",
  },
  formContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: "#112866",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: "#8a9ac4",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#112866",
    marginTop: 8,
  },
  biometricButtonText: {
    color: "#112866",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  biometricInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(17, 40, 102, 0.05)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(17, 40, 102, 0.1)",
  },
  biometricInfoText: {
    fontSize: 12,
    marginLeft: 8,
    textAlign: "center",
    flex: 1,
  },
  debugButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 1000,
  },
  debugButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  versionContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
  },
});

export default Login;
