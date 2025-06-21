import ViewWrapper from "@/components/Layout/View";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";

export default function DataPrivacy() {
  return (
    <ViewWrapper>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="shield-account" size={24} color="#112866" />
            <Text style={styles.headerTitle}>Data Privacy</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Data Protection Policy</Text>
          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>Personal Information</Text>
            <Text style={styles.policyText}>
              We collect and process your personal information in accordance with data protection laws.
              Your data is used solely for employment-related purposes and is kept secure and confidential.
            </Text>
          </View>

          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>Data Security</Text>
            <Text style={styles.policyText}>
              We implement appropriate security measures to protect your personal information.
              Access to your data is restricted to authorized personnel only.
            </Text>
          </View>

          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>Your Rights</Text>
            <Text style={styles.policyText}>
              You have the right to access, correct, and request deletion of your personal information.
              Contact HR for any data privacy concerns or requests.
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#112866",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  contentContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 8,
  },
  policyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112866",
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
}); 