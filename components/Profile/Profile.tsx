import ViewWrapper from "@/components/Layout/View";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const announcements = [
    { id: "1", title: "Team Meeting at 3 PM" },
    { id: "2", title: "New Policy Update" },
    { id: "3", title: "System Maintenance Tonight" },
    { id: "4", title: "Holiday Schedule Released" },
    { id: "5", title: "Holiday Schedule Released" },
    { id: "6", title: "Holiday Schedule Released" },
    { id: "7", title: "Holiday Schedule Released" },
    { id: "8", title: "Holiday Schedule Released" },
    { id: "9", title: "Holiday Schedule Released" },
  ];

  const getCurrentMonth = () => {
    const date = new Date();
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ViewWrapper>
        <View style={styles.gridContainer}>
          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.button}
              android_ripple={{ color: "gray", borderless: false }}
              onPress={() => router.push("/profile/profile")}
            >
              <Ionicons name="person" size={32} color={"white"} />
              <Text style={styles.buttonText}>Go to Profile</Text>
            </Pressable>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.button}
              android_ripple={{ color: "gray", borderless: false }}
              onPress={() => router.push("/profile/worksched")}
            >
              <EvilIcons name="calendar" size={42} color="white" />
              <Text style={styles.buttonText}>Work Schedule</Text>
            </Pressable>
          </View>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="office-building"
              size={32}
              color="white"
            />
            <Text style={styles.text}>Department: IT</Text>
          </View>
          <View style={styles.box}>
            <MaterialCommunityIcons name="briefcase" size={32} color="white" />
            <Text style={styles.text}>Designation: Top Lane Support</Text>
          </View>

          {/* Announcements Section */}
          <View style={styles.announcementWrapper}>
            <Text style={styles.text}>Announcements</Text>
            <ScrollView
              style={{ maxHeight: 200 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {announcements.map((item) => (
                <View key={item.id} style={styles.announcementItem}>
                  <Text style={styles.announcementText}>{item?.title}</Text>
                  <MaterialCommunityIcons
                    name="eye"
                    size={20}
                    color="white"
                    onPress={() => console.log("item ID", item.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Birthday Celebrants Section */}
          <View style={styles.announcementWrapper}>
            <Text style={styles.text}>
              Birthday Celebrant for the month of {getCurrentMonth()}
            </Text>
            <ScrollView
              style={{ maxHeight: 200 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {announcements.map((item) => (
                <View key={item.id} style={styles.announcementItem}>
                  <Text style={styles.announcementText}>{item?.title}</Text>
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  box: {
    width: "48%",
    padding: 12,
    backgroundColor: "#112866",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#112866",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    width: "48%",
  },
  announcementWrapper: {
    width: "100%",
    padding: 12,
    backgroundColor: "#112866",
    borderRadius: 8,
    overflow: "hidden",
  },
  announcementItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#334699",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  announcementText: {
    color: "white",
    fontSize: 14,
  },
});
