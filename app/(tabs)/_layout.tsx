import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
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
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
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
        }}
      />
      <Tabs.Screen
        name="timekeeping"
        options={{
          title: "TimeKeeping",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={32} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
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
              <Ionicons name="clipboard-outline" size={24} color={color} />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
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
              name="file-document-outline"
              size={32}
              color={color}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
