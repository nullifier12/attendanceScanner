import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { logger } from "@/utils/logger";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FirstTimeLogin = () => {
  const router = useRouter();
  const { employeeNumber } = useLocalSearchParams<{ employeeNumber: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const confirmPasswordRef = useRef<TextInput>(null);

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const { isTablet } = useResponsive();

  const url = Constants.expoConfig?.extra?.apiUrl;
  const mobileKey = Constants.expoConfig?.extra?.mobileKey;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSetPassword = async () => {
    if (!validateForm()) return;

    logger.info("Setting password for new user", {
      employeeNumber,
      hasPassword: !!password,
    });

    setIsLoading(true);

    try {
      const response = await fetch(`${url}/api/mobile/setuserpassword`, {
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to set password");
      }

      logger.info("Password set successfully", {
        employeeNumber,
        success: result.success,
      });

      Alert.alert(
        "Password Set Successfully",
        "Your password has been created. You can now login with your credentials.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/login");
            },
          },
        ]
      );
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error("Set password error", {
        error: errorMessage,
        employeeNumber,
      });

      setErrors((prev) => ({
        ...prev,
        general: "Failed to set password. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={[styles.content, { backgroundColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToLogin}
            >
              <Ionicons name="arrow-back" size={24} color={iconColor} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: textColor }]}>
              First Time Login
            </Text>
          </View>

          {/* Logo */}
          {/* <View style={styles.logoContainer}>
            <Image
              source={require("./../assets/images/KCPAPI.png")}
              style={[styles.logo, isTablet && styles.logoTablet]}
              resizeMode="contain"
            />
          </View> */}

          {/* Form */}
          <View
            style={[
              styles.formContainer,
              { backgroundColor },
              isTablet && styles.formContainerTablet,
            ]}
          >
            <Text style={[styles.welcomeText, { color: textColor }]}>
              Welcome! Please create your password to continue.
            </Text>

            <Text style={[styles.employeeText, { color: iconColor }]}>
              Employee Number: {employeeNumber}
            </Text>

            {/* Password Input */}
            <View style={[styles.inputContainer, { backgroundColor }]}>
              <Ionicons
                name="lock-closed-outline"
                size={isTablet ? 24 : 20}
                color={iconColor}
              />
              <TextInput
                style={[
                  styles.input,
                  { color: textColor },
                  isTablet && styles.inputTablet,
                ]}
                placeholder="New Password"
                placeholderTextColor={iconColor}
                value={password}
                onChangeText={(text) => {
                  console.log("Password changed:", text);
                  setPassword(text);
                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                    general: "",
                  }));
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  confirmPasswordRef.current?.focus();
                }}
                editable={true}
                selectTextOnFocus={true}
                multiline={false}
                numberOfLines={1}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={isTablet ? 24 : 20}
                  color={iconColor}
                />
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            {/* Confirm Password Input */}
            <View style={[styles.inputContainer, { backgroundColor }]}>
              <Ionicons
                name="lock-closed-outline"
                size={isTablet ? 24 : 20}
                color={iconColor}
              />
              <TextInput
                ref={confirmPasswordRef}
                style={[
                  styles.input,
                  { color: textColor },
                  isTablet && styles.inputTablet,
                ]}
                placeholder="Confirm Password"
                placeholderTextColor={iconColor}
                value={confirmPassword}
                onChangeText={(text) => {
                  console.log("Confirm password changed:", text);
                  setConfirmPassword(text);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "",
                    general: "",
                  }));
                }}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onSubmitEditing={handleSetPassword}
                editable={true}
                selectTextOnFocus={true}
                multiline={false}
                numberOfLines={1}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={isTablet ? 24 : 20}
                  color={iconColor}
                />
              </Pressable>
            </View>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}

            {/* General Error */}
            {errors.general ? (
              <Text style={styles.errorText}>{errors.general}</Text>
            ) : null}

            {/* Set Password Button */}
            <Pressable
              style={[
                styles.setPasswordButton,
                isLoading && styles.setPasswordButtonDisabled,
                isTablet && styles.setPasswordButtonTablet,
              ]}
              onPress={handleSetPassword}
              disabled={isLoading}
              android_ripple={{
                color: "rgba(255,255,255,0.2)",
                borderless: false,
              }}
            >
              <Text
                style={[
                  styles.setPasswordButtonText,
                  isTablet && styles.setPasswordButtonTextTablet,
                ]}
              >
                {isLoading ? "Setting Password..." : "Set Password"}
              </Text>
            </Pressable>

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.backToLoginButton}
              onPress={handleBackToLogin}
            >
              <Text style={[styles.backToLoginText, { color: iconColor }]}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 160,
  },
  logoTablet: {
    width: 280,
    height: 220,
  },
  formContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  formContainerTablet: {
    padding: 32,
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  employeeText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
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
  inputTablet: {
    paddingVertical: 16,
    fontSize: 18,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  setPasswordButton: {
    backgroundColor: "#112866",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  setPasswordButtonTablet: {
    paddingVertical: 20,
    borderRadius: 16,
  },
  setPasswordButtonDisabled: {
    backgroundColor: "#8a9ac4",
  },
  setPasswordButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  setPasswordButtonTextTablet: {
    fontSize: 18,
  },
  backToLoginButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  backToLoginText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default FirstTimeLogin;
