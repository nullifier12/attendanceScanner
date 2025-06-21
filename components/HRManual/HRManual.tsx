import ViewWrapper from "@/components/Layout/View";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";

export default function HRManual() {
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ViewWrapper>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={[styles.pageHeader, { backgroundColor }]}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="book-open-variant" size={24} color={iconColor} />
            <Text style={[styles.headerTitle, { color: textColor }]}>HR Manual</Text>
          </View>
        </View>

        <Divider style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Company Policies</Text>
          <View style={[styles.policyCard, { backgroundColor }]}>
            <Text style={[styles.policyTitle, { color: textColor }]}>Attendance Policy</Text>
            <Text style={[styles.policyText, { color: iconColor }]}>
              Regular working hours are from 8:00 AM to 5:00 PM, Monday to Friday. 
              Employees are expected to be punctual and maintain regular attendance.
            </Text>
          </View>

          <View style={[styles.policyCard, { backgroundColor }]}>
            <Text style={[styles.policyTitle, { color: textColor }]}>Leave Policy</Text>
            <Text style={[styles.policyText, { color: iconColor }]}>
              Employees are entitled to 15 days of vacation leave and 15 days of sick leave per year.
              Leave requests must be submitted at least 3 days in advance.
            </Text>
          </View>

          <View style={[styles.policyCard, { backgroundColor }]}>
            <Text style={[styles.policyTitle, { color: textColor }]}>Code of Conduct</Text>
            <Text style={[styles.policyText, { color: iconColor }]}>
              Employees are expected to maintain professional behavior and adhere to company ethics.
              Any form of harassment or discrimination will not be tolerated.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ViewWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  contentContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  policyCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 