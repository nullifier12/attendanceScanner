import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 90,
    paddingHorizontal: 16,
    paddingTop: 13,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 8,
  },
});

export default Header;
