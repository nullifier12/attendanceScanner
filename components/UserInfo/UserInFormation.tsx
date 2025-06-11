import { useAuth } from "@/contexts/AuthContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Divider } from "react-native-paper";

const UserInformation = () => {
  const router = useRouter();
  const { session, clearSession } = useAuth();

  const handleLogout = async () => {
    await clearSession();
    router.replace("/qrscanner");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/public/tempProfile.png")}
            style={styles.profileImage}
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

        <Divider style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="office-building"
              size={24}
              color="#112866"
            />
            <Text style={styles.sectionTitle}>Company Information</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.companyName}>AppABCs Corporation</Text>
            <Text style={styles.companyAddress}>
              123 Tech Street, Digital City, 1000
            </Text>
          </View>
        </View>
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
              <Text style={styles.infoText}>Position: Software Developer</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="people-outline" size={20} color="#666" />
              <Text style={styles.infoText}>
                Department: Information Technology
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Join Date: January 1, 2024</Text>
            </View>
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

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            android_ripple={{
              color: "rgba(255,255,255,0.2)",
              borderless: false,
            }}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.buttonText}>Proceed to Dashboard</Text>
          </Pressable>
          <Pressable
            style={styles.buttonLogout}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
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
  companyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#112866",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonLogout: {
    backgroundColor: "#CD5656",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserInformation;
