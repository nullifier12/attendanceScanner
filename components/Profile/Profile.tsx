import ViewWrapper from "@/components/Layout/View";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
    EvilIcons,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";

export default function Profile() {
  const router = useRouter();
  const { session } = useAuth();
  
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  const announcements = [
    { id: "1", title: "Team Meeting at 3 PM", date: "2024-03-20" },
    { id: "2", title: "New Policy Update", date: "2024-03-19" },
    { id: "3", title: "System Maintenance Tonight", date: "2024-03-18" },
    { id: "4", title: "Holiday Schedule Released", date: "2024-03-17" },
    { id: "5", title: "Office Renovation Notice", date: "2024-03-16" },
    { id: "6", title: "New Employee Onboarding", date: "2024-03-15" },
    { id: "7", title: "Quarterly Review Meeting", date: "2024-03-14" },
    { id: "8", title: "Health and Safety Training", date: "2024-03-13" },
    { id: "9", title: "Team Building Event", date: "2024-03-12" },
  ];

  const birthdays = [
    { id: "1", name: "John Doe", date: "March 25" },
    { id: "2", name: "Jane Smith", date: "March 28" },
    { id: "3", name: "Mike Johnson", date: "March 30" },
    { id: "4", name: "Sarah Williams", date: "March 31" },
  ];

  const getCurrentMonth = () => {
    const date = new Date();
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ViewWrapper>
        {/* Profile Header */}
        <View style={[styles.header, { backgroundColor }]}>
          <View style={styles.profileInfo}>
            <Text style={[styles.welcomeText, { color: iconColor }]}>Welcome back</Text>
            <Text style={[styles.nameText, { color: textColor }]}>{session?.user.name || "User"}</Text>
            <Text style={[styles.roleText, { color: iconColor }]}></Text>
          </View>
        </View>

        <Divider style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

        <View style={styles.quickActions}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{
              color: "rgba(255,255,255,0.2)",
              borderless: false,
            }}
            onPress={() => router.push("/profile/profile")}
          >
            <Ionicons name="person" size={24} color={"white"} />
            <Text style={styles.actionButtonText}>User Details</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            android_ripple={{
              color: "rgba(255,255,255,0.2)",
              borderless: false,
            }}
            onPress={() => router.push("/profile/worksched")}
          >
            <EvilIcons name="calendar" size={32} color="white" />
            <Text style={styles.actionButtonText}>Schedule</Text>
          </Pressable>
        </View>

        {/* Department Info */}
        <View style={styles.infoSection}>
          <View style={[styles.infoCard, { backgroundColor }]}>
            <MaterialCommunityIcons
              name="office-building"
              size={24}
              color={iconColor}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: iconColor }]}>Department</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>Information Technology</Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor }]}>
            <MaterialCommunityIcons
              name="briefcase"
              size={24}
              color={iconColor}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: iconColor }]}>Designation</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>Software Developer</Text>
            </View>
          </View>
        </View>

        {/* Announcements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="bullhorn" size={24} color={iconColor} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>Announcements</Text>
          </View>
          <View style={[styles.infoCard, { backgroundColor }]}>
            <ScrollView
              style={styles.scrollableContent}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {announcements.map((announcement) => (
                <View key={announcement.id} style={styles.announcementItem}>
                  <Text style={[styles.announcementTitle, { color: textColor }]}>
                    {announcement.title}
                  </Text>
                  <Text style={[styles.announcementDate, { color: iconColor }]}>
                    {announcement.date}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Birthday Celebrants Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="cake-variant"
              size={24}
              color={iconColor}
            />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Birthday Celebrants - {getCurrentMonth()}
            </Text>
          </View>
          <View style={[styles.card, { backgroundColor }]}>
            <ScrollView
              style={styles.scrollableContent}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {birthdays.map((item) => (
                <View key={item.id} style={styles.birthdayItem}>
                  <View style={styles.birthdayContent}>
                    <Text style={[styles.birthdayName, { color: textColor }]}>{item.name}</Text>
                    <Text style={[styles.birthdayDate, { color: iconColor }]}>{item.date}</Text>
                  </View>
                  <MaterialCommunityIcons name="gift" size={24} color={iconColor} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ViewWrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    gap: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#112866",
  },
  roleText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#112866",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  infoSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#112866",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#112866",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollableContent: {
    maxHeight: 200,
  },
  announcementItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  announcementContent: {
    flex: 1,
    marginRight: 12,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#112866",
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: "#666",
  },
  birthdayItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  birthdayContent: {
    flex: 1,
    marginRight: 12,
  },
  birthdayName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#112866",
    marginBottom: 4,
  },
  birthdayDate: {
    fontSize: 12,
    color: "#666",
  },
});
