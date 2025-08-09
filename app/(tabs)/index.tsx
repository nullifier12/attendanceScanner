import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const navigationTiles = [
  {
    id: "requests",
    title: "Requests",
    icon: "file-document-edit" as const,
    route: "/(tabs)/reqAndDis" as const,
  },
  {
    id: "payslip",
    title: "Payslip",
    icon: "cash" as const,
    route: "/(tabs)/payslip" as const,
  },
  {
    id: "timekeeping",
    title: "Time Keeping",
    icon: "clock-time-four" as const,
    route: "/(tabs)/timekeeping" as const,
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
  {
    id: "changepass",
    title: "Change Password",
    icon: "key-variant" as const,
    route: "/(tabs)/changepassword" as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const { isTablet } = useResponsive();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor }]}>
          <Text style={[styles.title, { color: textColor }]}>Menu</Text>
        </View>
        
        <View style={[styles.navigationContainer, { backgroundColor }]}>
          {navigationTiles.map((tile) => (
            <Pressable
              key={tile.id}
              style={[styles.navigationTile, { backgroundColor }, isTablet && styles.navigationTileTablet]}
              onPress={() => router.push(tile.route)}
              android_ripple={{
                color: "rgba(255,255,255,0.2)",
                borderless: false,
              }}
            >
              <MaterialCommunityIcons
                name={tile.icon}
                size={isTablet ? 40 : 32}
                color={iconColor}
              />
              <Text style={[styles.tileText, { color: textColor }, isTablet && styles.tileTextTablet]}>
                {tile.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navigationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationTile: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  navigationTileTablet: {
    width: "30%",
    padding: 24,
    borderRadius: 16,
  },
  tileText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  tileTextTablet: {
    fontSize: 16,
    marginTop: 12,
  },
});
