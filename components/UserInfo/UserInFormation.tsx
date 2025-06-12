import { useAuth } from "@/contexts/AuthContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

const UserInformation = (props: any) => {
  const url = Constants.expoConfig?.extra?.apiUrl;
  const router = useRouter();
  const { session, clearSession } = useAuth();
  const { UserInfo } = props;
  const { pi_photo } = UserInfo;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Do you want to log out?",
      [
        {
          text: "Close",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearSession();
            router.replace("/login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const announcements = [
    { id: "1", title: "Team Meeting at 3 PM", date: "2024-03-20" },
    { id: "2", title: "New Policy Update", date: "2024-03-19" },
    { id: "3", title: "System Maintenance Tonight", date: "2024-03-18" },
    { id: "4", title: "System Maintenance Tonight", date: "2024-03-18" },
  ];

  const birthdays = [
    { id: "1", name: "John Doe", date: "March 25" },
    { id: "2", name: "Jane Smith", date: "March 28" },
    { id: "3", name: "Mike Johnson", date: "March 30" },
    { id: "4", name: "Mike Johnson", date: "March 30" },
  ];

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{ uri: `${url}/uploads/1692096855800-1B1.jpg` }}
              style={styles.profileImage}
              defaultSource={require("../../assets/public/tempProfile.png")}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.name}>
                {session?.user.name || "Not logged in"}
              </Text>
              <Text style={styles.employeeId}>
                Employee ID: {session?.user.id || "N/A"}
              </Text>
              <Text style={styles.email}>{session?.user.email || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={`${UserInfo}`}
              size={200}
              backgroundColor="white"
              color="#112866"
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color="#112866"
              />
              <Text style={styles.sectionTitle}>Employee Details</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="briefcase-outline" size={20} color="#666" />
                <Text style={styles.infoText}>
                  Position: Software Developer
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="people-outline" size={20} color="#666" />
                <Text style={styles.infoText}>
                  Department: Information Technology
                </Text>
              </View>
              {/* <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Text style={styles.infoText}>Join Date: January 1, 2024</Text>
              </View> */}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="phone" size={24} color="#112866" />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={20} color="#666" />
                <Text style={styles.infoText}>
                  {session?.user.email || "N/A"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={20} color="#666" />
                <Text style={styles.infoText}>+63 912 345 6789</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="bullhorn"
                size={24}
                color="#112866"
              />
              <Text style={styles.sectionTitle}>Announcements</Text>
            </View>
            <View style={styles.infoCard}>
              <ScrollView
                style={styles.scrollableContent}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {announcements.map((announcement) => (
                  <View key={announcement.id} style={styles.announcementItem}>
                    <Text style={styles.announcementTitle}>
                      {announcement.title}
                    </Text>
                    <Text style={styles.announcementDate}>
                      {announcement.date}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Birthdays Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="cake-variant"
                size={24}
                color="#112866"
              />
              <Text style={styles.sectionTitle}>Birthdays This Month</Text>
            </View>
            <View style={styles.infoCard}>
              <ScrollView
                style={styles.scrollableContent}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {birthdays.map((birthday) => (
                  <View key={birthday.id} style={styles.birthdayItem}>
                    <Text style={styles.birthdayName}>{birthday.name}</Text>
                    <Text style={styles.birthdayDate}>{birthday.date}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          android_ripple={{
            color: "rgba(255,255,255,0.2)",
            borderless: false,
          }}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.buttonText}>Menu</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.logoutButton]}
          android_ripple={{
            color: "rgba(255,255,255,0.2)",
            borderless: false,
          }}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#112866",
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#112866",
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  qrContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 10,
  },
  button: {
    backgroundColor: "#112866",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollableContent: {
    maxHeight: 200,
    flexGrow: 0,
  },
  announcementItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: "#666",
  },
  birthdayItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  birthdayName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 4,
  },
  birthdayDate: {
    fontSize: 12,
    color: "#666",
  },
});

export default UserInformation;
