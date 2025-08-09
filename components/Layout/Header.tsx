import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  const router = useRouter();
  const { isTablet } = useResponsive();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={[styles.headerContainer, isTablet && styles.headerContainerTablet]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Ionicons name="arrow-back" size={isTablet ? 32 : 28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#112866",
  },
  headerContainer: {
    width: "100%",
    height: 90,
    paddingHorizontal: 16,
    paddingTop: 13,
    backgroundColor: "#112866",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainerTablet: {
    height: 100,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  button: {
    padding: 8,
  },
});

export default Header;
