import { HapticTab } from "@/components/HapticTab";
import { BellNotification } from "@/components/Notifications/BellNotification";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: "#112866",
        },
        headerTitleStyle: {
          color: "white",
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            display: "none", // Hide tab bar on iOS
          },
          default: {
            display: "none", // Hide tab bar on Android
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={32} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="timekeeping"
        options={{
          title: "TimeKeeping",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={32} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="reqAndDis"
        options={{
          title: "Requests & Disputes",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="clipboard" size={24} color={color} />
            </View>
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="payslip"
        options={{
          title: "Payslip",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={32}
              color={color}
            />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="Sched"
        options={{
          title: "Work Schedule",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={32}
              color={color}
            />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="hrmanual"
        options={{
          title: "HR Manual",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-open-variant"
              size={32}
              color={color}
            />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="dataprivacy"
        options={{
          title: "Data Privacy",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="shield-account"
              size={32}
              color={color}
            />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" size={32} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
            display: "none", // Hide tab bar for this screen
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => <BellNotification />,
        }}
      />
    </Tabs>
  );
}
