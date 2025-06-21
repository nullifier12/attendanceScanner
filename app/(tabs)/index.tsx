import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const navigationTiles = [
  {
    id: "timekeeping",
    title: "Time Keeping",
    icon: "clock-time-four" as const,
    route: "/(tabs)/timekeeping" as const,
  },
  {
    id: "payslip",
    title: "Payslip",
    icon: "cash" as const,
    route: "/(tabs)/payslip" as const,
  },
  {
    id: "requests",
    title: "Requests",
    icon: "file-document-edit" as const,
    route: "/(tabs)/reqAndDis" as const,
  },
  {
    id: "schedule",
    title: "Work Schedule",
    icon: "calendar-clock" as const,
    route: "/(tabs)/Sched" as const,
  },
  {
    id: "hrmanual",
    title: "HR Manual",
    icon: "book-open-variant" as const,
    route: "/(tabs)/hrmanual" as const,
  },
  {
    id: "dataprivacy",
    title: "Data Privacy",
    icon: "shield-account" as const,
    route: "/(tabs)/dataprivacy" as const,
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: "calendar-month" as const,
    route: "/(tabs)/calendar" as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
      </View>

      <View style={styles.navigationContainer}>
        {navigationTiles.map((tile) => (
          <Pressable
            key={tile.id}
            style={styles.navigationTile}
            onPress={() => router.push(tile.route)}
            android_ripple={{
              color: "rgba(255,255,255,0.2)",
              borderless: false,
            }}
          >
            <MaterialCommunityIcons
              name={tile.icon}
              size={32}
              color="#112866"
            />
            <Text style={styles.tileText}>{tile.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112866",
  },
  navigationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationTile: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tileText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#112866",
    textAlign: "center",
  },
});
