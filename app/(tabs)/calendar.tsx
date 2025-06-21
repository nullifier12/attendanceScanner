import CustomCalendar from '@/components/CustomCalendar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const CalendarScreen = () => {
  // Define the 3 sample events
  const sampleEvents = {
    "2025-08-08": [
      { title: "Team Meeting", color: "#2a9d8f", time: "10:00 AM" },
    ],
    "2025-08-15": [
      { title: "Project Deadline", color: "#e76f51", time: "5:00 PM" },
    ],
    "2025-08-22": [
      { title: "Company Holiday", color: "#f4a261" },
      { title: "Vacation", color: "#e9c46a", time: "All Day" },
    ],
  };

  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <MaterialCommunityIcons name="calendar" size={24} color={iconColor} />
        <Text style={[styles.headerText, { color: textColor }]}>Calendar</Text>
      </View>
      <View style={styles.content}>
        <CustomCalendar events={sampleEvents} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  content: {
    paddingTop: 10,
  },
});

export default CalendarScreen;
