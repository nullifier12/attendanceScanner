import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { useRouter, useSegments } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
  const url = Constants.expoConfig?.extra?.apiUrl;

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

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/mobile/mobileAuth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: employeeNumber, password: password }),
      });

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          credentials: "Employee number or Password is incorrect",
        }));
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
      }

      const responseData = await response.json();

      console.log("API Response Data:", responseData);

      const session = {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: responseData.ID,
          name: `${responseData.pi_fname} ${responseData.pi_lname}`,
          email: responseData.pi_email,
        },
      };

      await setSession(session);

      router.push({
        pathname: "/userinfo/userinfo",
        params: {
          userData: JSON.stringify(responseData),
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        credentials: "Employee number or Password is incorrect",
      }));
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/public/tempProfile.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>App Name Unknown Until Now</Text>
        </View>

        <BlurView intensity={20} style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="id-card-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Employee Number"
              value={employeeNumber}
              onChangeText={(text) => {
                setEmployeeNumber(text);
                setErrors((prev) => ({
                  ...prev,
                  employeeNumber: "",
                  credentials: "",
                }));
              }}
              keyboardType="number-pad"
              maxLength={8}
            />
          </View>
          {errors.employeeNumber ? (
            <Text style={styles.errorText}>{errors.employeeNumber}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Password"
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
                color="#666"
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
        </BlurView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112866",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
});

export default Login;
