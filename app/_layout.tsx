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

import { debugHelper } from "@/utils/debugHelper";
import { logger } from "@/utils/logger";
import React, { useEffect, useRef } from "react";
import { Alert, BackHandler, Text, View } from "react-native";

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error Boundary caught error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Something went wrong
          </Text>
          <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Text 
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => this.setState({ hasError: false })}
          >
            Try Again
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function RootLayoutNav() {
  const { session, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const route = useRoute();
  const { clearSession } = useAuth();
  const pathname = usePathname();
  const isInitialized = useRef(false);

  // Log app initialization only once
  useEffect(() => {
    if (!isInitialized.current) {
      debugHelper.logAppStart();
      isInitialized.current = true;
    }
  }, []);

  // Log navigation changes with memoization
  useEffect(() => {
    if (isInitialized.current) {
      logger.info('Pathname changed', { pathname });
    }
  }, [pathname]);

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
    }, [pathname, session])
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
            try {
              await clearSession();
              logger.info('User logged out');
              router.replace("/login");
            } catch (error) {
              logger.error('Logout failed', { error: (error as Error).message });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading) {
    logger.info('App is loading...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
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
