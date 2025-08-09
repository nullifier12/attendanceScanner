import CustomCalendar from "@/components/CustomCalendar";
import { useCalendar } from "@/contexts/CalendarContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CalendarScreen = () => {
  const { eventsByDate, loadEvents, isLoading } = useCalendar();

  useEffect(() => {
    // In case user lands here directly and events aren't loaded yet
    loadEvents();
  }, [loadEvents]);

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="calendar" size={24} color={iconColor} />
          <Text style={[styles.headerText, { color: textColor }]}>Calendar</Text>
        </View>
        <TouchableOpacity
          onPress={loadEvents}
          style={styles.refreshButton}
          accessibilityRole="button"
          accessibilityLabel="Refresh calendar events"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : (
            <MaterialCommunityIcons name="refresh" size={22} color={iconColor} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <CustomCalendar events={eventsByDate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  refreshButton: {
    padding: 6,
    borderRadius: 8,
  },
  content: {
    paddingTop: 10,
  },
});

export default CalendarScreen;
