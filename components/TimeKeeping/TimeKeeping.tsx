import { useAuth } from "@/contexts/AuthContext";
import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeKeepingTable from "./TimekeepingTable";

const TimeKeeping = () => {
  const { session } = useAuth();
  const { isTablet } = useResponsive();
  
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const attendance = [
    { date: "2025-06-01", in: "08:00", out: "16:00", status: "Present", hours: "8.0" },
    { date: "2025-06-02", in: "08:15", out: "16:30", status: "Present", hours: "8.25" },
    { date: "2025-06-03", in: "09:00", out: "17:00", status: "Late", hours: "8.0" },
    { date: "2025-06-04", in: "08:45", out: "16:45", status: "Present", hours: "8.0" },
    { date: "2025-06-05", in: "08:30", out: "16:30", status: "Present", hours: "8.0" },
    { date: "2025-06-06", in: "08:00", out: "16:00", status: "Present", hours: "8.0" },
    { date: "2025-06-07", in: "09:15", out: "17:15", status: "Late", hours: "8.0" },
    { date: "2025-06-08", in: "08:10", out: "16:10", status: "Present", hours: "8.0" },
    { date: "2025-06-09", in: "08:20", out: "16:20", status: "Present", hours: "8.0" },
    { date: "2025-06-10", in: "08:05", out: "16:05", status: "Present", hours: "8.0" },
  ];

  const stats = {
    present: 8,
    late: 2,
    absent: 0,
    totalHours: 64.25
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isTablet && styles.scrollContentTablet]}
      >
        {/* Header Section */}
        <View style={[styles.pageHeader, { backgroundColor }, isTablet && styles.pageHeaderTablet]}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="clock-time-four" size={isTablet ? 28 : 24} color={iconColor} />
            <Text style={[styles.headerTitle, { color: textColor }, isTablet && styles.headerTitleTablet]}>Time Keeping</Text>
          </View>
          <View style={styles.headerRight}>
            <MaterialCommunityIcons name="calendar-clock" size={isTablet ? 28 : 24} color={iconColor} />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Quick Stats */}
        <View style={[styles.statsContainer, isTablet && styles.statsContainerTablet]}>
          <View style={[styles.statCard, { backgroundColor }, isTablet && styles.statCardTablet]}>
            <MaterialCommunityIcons name="calendar-check" size={isTablet ? 28 : 24} color={iconColor} />
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: textColor }, isTablet && styles.statValueTablet]}>{stats.present}</Text>
              <Text style={[styles.statLabel, { color: iconColor }, isTablet && styles.statLabelTablet]}>Present</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor }, isTablet && styles.statCardTablet]}>
            <MaterialCommunityIcons name="clock-alert" size={isTablet ? 28 : 24} color={iconColor} />
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: textColor }, isTablet && styles.statValueTablet]}>{stats.late}</Text>
              <Text style={[styles.statLabel, { color: iconColor }, isTablet && styles.statLabelTablet]}>Late</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor }, isTablet && styles.statCardTablet]}>
            <MaterialCommunityIcons name="clock-time-four" size={isTablet ? 28 : 24} color={iconColor} />
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: textColor }, isTablet && styles.statValueTablet]}>{stats.totalHours}</Text>
              <Text style={[styles.statLabel, { color: iconColor }, isTablet && styles.statLabelTablet]}>Total Hours</Text>
            </View>
          </View>
        </View>

        {/* Leave Balance */}
        <View style={[styles.leaveContainer, isTablet && styles.leaveContainerTablet]}>
          <View style={[styles.leaveCard, { backgroundColor }, isTablet && styles.leaveCardTablet]}>
            <MaterialCommunityIcons name="beach" size={isTablet ? 28 : 24} color={iconColor} />
            <View style={styles.leaveContent}>
              <Text style={[styles.leaveValue, { color: textColor }, isTablet && styles.leaveValueTablet]}>7</Text>
              <Text style={[styles.leaveLabel, { color: iconColor }, isTablet && styles.leaveLabelTablet]}>Vacation Leave</Text>
            </View>
          </View>
          <View style={[styles.leaveCard, { backgroundColor }, isTablet && styles.leaveCardTablet]}>
            <MaterialIcons name="sick" size={isTablet ? 28 : 24} color={iconColor} />
            <View style={styles.leaveContent}>
              <Text style={[styles.leaveValue, { color: textColor }, isTablet && styles.leaveValueTablet]}>7</Text>
              <Text style={[styles.leaveLabel, { color: iconColor }, isTablet && styles.leaveLabelTablet]}>Sick Leave</Text>
            </View>
          </View>
        </View>

        {/* Attendance Table */}
        <TimeKeepingTable attendance={attendance} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimeKeeping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pageHeaderTablet: {
    padding: 24,
    borderRadius: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitleTablet: {
    fontSize: 20,
  },
  headerRight: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statsContainerTablet: {
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statCardTablet: {
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statValueTablet: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 12,
  },
  statLabelTablet: {
    fontSize: 14,
  },
  leaveContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  leaveContainerTablet: {
    gap: 16,
  },
  leaveCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  leaveCardTablet: {
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  leaveContent: {
    flex: 1,
  },
  leaveValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  leaveValueTablet: {
    fontSize: 24,
  },
  leaveLabel: {
    fontSize: 12,
  },
  leaveLabelTablet: {
    fontSize: 14,
  },
});
