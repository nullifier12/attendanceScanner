import ViewWrapper from "@/components/Layout/View";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
export default function HomeScreen() {
  return (
    <ViewWrapper>
      <Text>Home Section</Text>
      <Link href={"/profile/profile"}>go to this profile</Link>
    </ViewWrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
