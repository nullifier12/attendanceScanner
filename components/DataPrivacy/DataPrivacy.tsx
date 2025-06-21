import ViewWrapper from "@/components/Layout/View";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";

export default function DataPrivacy() {
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
            <MaterialCommunityIcons name="shield-account" size={24} color={iconColor} />
            <Text style={[styles.headerTitle, { color: textColor }]}>Data Privacy</Text>
          </View>
        </View>

        <Divider style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Data Protection Policy</Text>
          <View style={[styles.policyCard, { backgroundColor }]}>
            <Text style={[styles.policyTitle, { color: textColor }]}>Personal Information</Text>
            <Text style={[styles.policyText, { color: iconColor }]}>
              We collect and process your personal information in accordance with data protection laws.
              Your data is used solely for employment-related purposes and is kept secure and confidential.
            </Text>
          </View>

          <View style={[styles.policyCard, { backgroundColor }]}>
            <Text style={[styles.policyTitle, { color: textColor }]}>Data Security</Text>
            <Text style={[styles.policyText, { color: iconColor }]}>
              We implement appropriate security measures to protect your personal information.
              Access to your data is restricted to authorized personnel only.
            </Text>
          </View>

          <View style={[styles.policyCard, { backgroundColor }]}>
            <Text style={[styles.policyTitle, { color: textColor }]}>Your Rights</Text>
            <Text style={[styles.policyText, { color: iconColor }]}>
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