import { useThemeColor } from "@/hooks/useThemeColor";
import { generateMonthMatrix } from "@/utils/calendarHelper";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EventModal from "./EventModal";

type Event = {
  title: string;
  color?: string;
  time?: string;
};

type Events = {
  [key: string]: Event[];
};

interface CustomCalendarProps {
  events?: Events;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ events = {} }) => {
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const today = new Date();

  // Get theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  const year = date.getFullYear();
  const month = date.getMonth();
  const monthName = date.toLocaleString("default", { month: "long" });

  const monthMatrix = generateMonthMatrix(year, month);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };

  const handleDayPress = (day: number | null, dayEvents: Event[]) => {
    if (day) {
      setSelectedDay(day);
      setSelectedDayEvents(dayEvents);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDay(null);
    setSelectedDayEvents([]);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text
          style={[styles.monthYear, { color: textColor }]}
        >{`${monthName} ${year}`}</Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <Text key={day} style={[styles.weekDayText, { color: iconColor }]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {monthMatrix.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekContainer}>
            {week.map((day, dayIndex) => {
              const dayKey = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(
                    day
                  ).padStart(2, "0")}`
                : "";
              const dayEvents = events[dayKey] || [];
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={styles.dayCell}
                  onPress={() => handleDayPress(day, dayEvents)}
                  disabled={!day}
                >
                  {day && (
                    <View style={[styles.dayView, isToday && styles.todayView]}>
                      <Text
                        style={[
                          styles.dayText,
                          { color: textColor },
                          isToday && styles.todayText,
                        ]}
                      >
                        {day}
                      </Text>
                      <View style={styles.dotsContainer}>
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <View
                            key={i}
                            style={[
                              styles.eventDot,
                              { backgroundColor: event.color || "#112866" },
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <EventModal
        visible={isModalVisible}
        onClose={closeModal}
        events={selectedDayEvents}
        day={selectedDay}
        month={monthName}
        year={year}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: "500",
    width: "14.28%",
    textAlign: "center",
  },
  daysContainer: {},
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayView: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
  },
  todayView: {
    backgroundColor: "#112866",
    borderRadius: 19,
  },
  dayText: {
    fontSize: 16,
  },
  todayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 4,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  navButton: {
    padding: 5,
  },
});

export default CustomCalendar;
