import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PayslipSummary from "../../components/Payslip/PayslipSummary";
import PayslipTable from "../../components/Payslip/PayslipTable";

export default function Payslip() {
  const [activeTab, setActiveTab] = useState<"history" | "summary">("history");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");
  const { isTablet } = useResponsive();

  // Sample payslip data - in real app, this would come from API
  const payslips = [
    {
      id: "PS001",
      period: "June 1-15, 2024",
      date: "2024-06-15",
      basicPay: 25000,
      allowances: 5000,
      deductions: 2000,
      netPay: 28000,
      status: "Paid" as const,
    },
    {
      id: "PS002",
      period: "May 16-31, 2024",
      date: "2024-05-31",
      basicPay: 25000,
      allowances: 5000,
      deductions: 2000,
      netPay: 28000,
      status: "Paid" as const,
    },
    {
      id: "PS003",
      period: "May 1-15, 2024",
      date: "2024-05-15",
      basicPay: 25000,
      allowances: 5000,
      deductions: 2000,
      netPay: 28000,
      status: "Paid" as const,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={["top", "left", "right"]}
    >
      {/* Tab Navigation */}
      <View
        style={[
          styles.tabContainer,
          { backgroundColor },
          isTablet && styles.tabContainerTablet,
        ]}
      >
        <View
          style={[
            styles.tabButton,
            activeTab === "history" && styles.activeTab,
            isTablet && styles.tabButtonTablet,
          ]}
          onTouchEnd={() => setActiveTab("history")}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={isTablet ? 24 : 20}
            color={activeTab === "history" ? "#1976D2" : iconColor}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "history" ? "#1976D2" : textColor },
              isTablet && styles.tabTextTablet,
            ]}
          >
            Payslip History
          </Text>
        </View>

        <View
          style={[
            styles.tabButton,
            activeTab === "summary" && styles.activeTab,
            isTablet && styles.tabButtonTablet,
          ]}
          onTouchEnd={() => setActiveTab("summary")}
        >
          <MaterialCommunityIcons
            name="chart-line"
            size={isTablet ? 24 : 20}
            color={activeTab === "summary" ? "#1976D2" : iconColor}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "summary" ? "#1976D2" : textColor },
              isTablet && styles.tabTextTablet,
            ]}
          >
            Payslip Summary
          </Text>
        </View>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === "history" ? (
          <PayslipTable />
        ) : (
          <PayslipSummary payslips={payslips} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabContainerTablet: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabButtonTablet: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: "#E3F2FD",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextTablet: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
});
