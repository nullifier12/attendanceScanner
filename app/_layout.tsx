import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

import React from "react";
import { Alert, BackHandler } from "react-native";

function RootLayoutNav() {
  const { session, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const route = useRoute();
  const { clearSession } = useAuth();
  const pathname = usePathname();

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (pathname === "/userinfo/userinfo" && session) {
            showLogoutAlert();
            return true;
          }
          return false;
        }
      );

      return () => backHandler.remove();
    }, [pathname])
  );

  const showLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Do you want to log out?",
      [
        {
          text: "Close",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearSession();
            router.replace("/login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#112866",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userinfo/userinfo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
