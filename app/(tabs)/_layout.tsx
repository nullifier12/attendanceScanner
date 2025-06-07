import { HapticTab } from "@/components/HapticTab";
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
        //  tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: "white",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: "#112866",
        },
        headerTitleStyle: {
          color: "white", // Makes title text white
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",

          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={32} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
          },
        }}
      />
      <Tabs.Screen
        name="timekeeping"
        options={{
          title: "TimeKeeping",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={32} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="reqAndDis"
        options={{
          title: "Requests & Disputes",
          tabBarIcon: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="clipboard" size={24} color={color} />
            </View>
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="payslip"
        options={{
          title: "Payslip",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={32}
              color={color}
            />
          ),
          tabBarStyle: {
            backgroundColor: "#112866",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
