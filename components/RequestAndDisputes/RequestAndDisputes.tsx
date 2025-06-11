import ViewWrapper from "@/components/Layout/View";
import { useAuth } from "@/contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import RequestModal from "./Modal";
import RequestAndDisp from "./ReqAndDispTable";

const RequestAndDispute = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("leave");
  const { session } = useAuth();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ViewWrapper>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome back, {session?.user.name || 'User'}</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="plus-circle" size={24} color="white" />
            <Text style={styles.actionButtonText}>New Request</Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'leave' && styles.activeTab]}
            onPress={() => setActiveTab('leave')}
          >
            <MaterialCommunityIcons 
              name="calendar-clock" 
              size={20} 
              color={activeTab === 'leave' ? '#112866' : '#666'} 
            />
            <Text style={[styles.tabText, activeTab === 'leave' && styles.activeTabText]}>
              Leave
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'ot' && styles.activeTab]}
            onPress={() => setActiveTab('ot')}
          >
            <MaterialCommunityIcons 
              name="clock-time-four" 
              size={20} 
              color={activeTab === 'ot' ? '#112866' : '#666'} 
            />
            <Text style={[styles.tabText, activeTab === 'ot' && styles.activeTabText]}>
              OT/UT
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'ob' && styles.activeTab]}
            onPress={() => setActiveTab('ob')}
          >
            <MaterialCommunityIcons 
              name="briefcase" 
              size={20} 
              color={activeTab === 'ob' ? '#112866' : '#666'} 
            />
            <Text style={[styles.tabText, activeTab === 'ob' && styles.activeTabText]}>
              OB
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'disputes' && styles.activeTab]}
            onPress={() => setActiveTab('disputes')}
          >
            <MaterialCommunityIcons 
              name="alert-circle" 
              size={20} 
              color={activeTab === 'disputes' ? '#112866' : '#666'} 
            />
            <Text style={[styles.tabText, activeTab === 'disputes' && styles.activeTabText]}>
              Disputes
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <RequestAndDisp type={activeTab} />
        </View>

        <RequestModal
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </ViewWrapper>
  );
};

export default RequestAndDispute;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    gap: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#112866",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  quickActions: {
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#112866",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    gap: 8,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#f0f4ff",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#112866",
    fontWeight: "600",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
