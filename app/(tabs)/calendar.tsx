import CustomCalendar from '@/components/CustomCalendar';
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="calendar" size={24} color="#112866" />
        <Text style={styles.headerText}>Calendar</Text>
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#112866',
    marginLeft: 10,
  },
  content: {
    paddingTop: 10,
  },
});

export default CalendarScreen;
