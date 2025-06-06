import Header from "@/components/Layout/Header";
import ViewWrapper from "@/components/Layout/View";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <>
      <View style={{ paddingVertical: 8 }}>
        <Header />
      </View>
      <ViewWrapper>
        <Text>Welcome to Profile!</Text>
      </ViewWrapper>
    </>
  );
}
