import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { logger } from "@/utils/logger";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ChangePassword = () => {
  const router = useRouter();
  const { session } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  const url = Constants.expoConfig?.extra?.apiUrl;
  const mobileKey = Constants.expoConfig?.extra?.mobileKey;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      general: "",
    };

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
      isValid = false;
    } else if (newPassword === currentPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    logger.info("Change password attempt started", {
      userId: session?.user?.id,
      hasCurrentPassword: !!currentPassword,
      hasNewPassword: !!newPassword,
    });

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${url}/api/mobile/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to change password");
      }

      if (responseData.success === false) {
        throw new Error(responseData.message || "Password change failed");
      }

      logger.info("Password changed successfully");
      setIsSuccess(true);

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Alert.alert("Success", "Your password has been changed successfully!", [
        {
          text: "OK",
          onPress: () => {
            setIsSuccess(false);
            router.back();
          },
        },
      ]);
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error("Change password error", {
        error: errorMessage,
        stack: (error as Error).stack,
      });

      setErrors((prev) => ({
        ...prev,
        general: errorMessage || "Failed to change password. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { backgroundColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>
              Change Password
            </Text>
            <View style={styles.placeholder} />
          </View>

          {/* Success Message */}
          {isSuccess && (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.successText}>
                Password changed successfully!
              </Text>
            </View>
          )}

          {/* General Error */}
          {errors.general && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ff3b30" />
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          )}

          {/* Form Container */}
          <View style={[styles.formContainer, { backgroundColor }]}>
            {/* Current Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>
                Current Password
              </Text>
              <View style={[styles.inputContainer, { backgroundColor }]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={iconColor}
                />
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="Enter current password"
                  placeholderTextColor={iconColor}
                  value={currentPassword}
                  onChangeText={(text) => {
                    setCurrentPassword(text);
                    clearErrors();
                  }}
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={
                      showCurrentPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={20}
                    color={iconColor}
                  />
                </Pressable>
              </View>
              {errors.currentPassword ? (
                <Text style={styles.fieldErrorText}>
                  {errors.currentPassword}
                </Text>
              ) : null}
            </View>

            {/* New Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>
                New Password
              </Text>
              <View style={[styles.inputContainer, { backgroundColor }]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={iconColor}
                />
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="Enter new password"
                  placeholderTextColor={iconColor}
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    clearErrors();
                  }}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={iconColor}
                  />
                </Pressable>
              </View>
              {errors.newPassword ? (
                <Text style={styles.fieldErrorText}>{errors.newPassword}</Text>
              ) : null}
            </View>

            {/* Confirm New Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>
                Confirm New Password
              </Text>
              <View style={[styles.inputContainer, { backgroundColor }]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={iconColor}
                />
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="Confirm new password"
                  placeholderTextColor={iconColor}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    clearErrors();
                  }}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={20}
                    color={iconColor}
                  />
                </Pressable>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.fieldErrorText}>
                  {errors.confirmPassword}
                </Text>
              ) : null}
            </View>

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={[styles.requirementsTitle, { color: textColor }]}>
                Password Requirements:
              </Text>
              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    newPassword.length >= 6
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={newPassword.length >= 6 ? "#4CAF50" : iconColor}
                />
                <Text style={[styles.requirementText, { color: textColor }]}>
                  At least 6 characters long
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    newPassword !== currentPassword
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={
                    newPassword !== currentPassword ? "#4CAF50" : iconColor
                  }
                />
                <Text style={[styles.requirementText, { color: textColor }]}>
                  Different from current password
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    confirmPassword === newPassword && confirmPassword !== ""
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={
                    confirmPassword === newPassword && confirmPassword !== ""
                      ? "#4CAF50"
                      : iconColor
                  }
                />
                <Text style={[styles.requirementText, { color: textColor }]}>
                  Passwords match
                </Text>
              </View>
            </View>

            {/* Change Password Button */}
            <Pressable
              style={[
                styles.changePasswordButton,
                isLoading && styles.changePasswordButtonDisabled,
              ]}
              onPress={handleChangePassword}
              disabled={isLoading}
              android_ripple={{
                color: "rgba(255,255,255,0.2)",
                borderless: false,
              }}
            >
              <Text style={styles.changePasswordButtonText}>
                {isLoading ? "Changing Password..." : "Change Password"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.2)",
  },
  successText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.2)",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
  },
  formContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
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
  },
  fieldErrorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  requirementsContainer: {
    backgroundColor: "rgba(17, 40, 102, 0.05)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(17, 40, 102, 0.1)",
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 12,
    marginLeft: 8,
  },
  changePasswordButton: {
    backgroundColor: "#112866",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  changePasswordButtonDisabled: {
    backgroundColor: "#8a9ac4",
  },
  changePasswordButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChangePassword;
