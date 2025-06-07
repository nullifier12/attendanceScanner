import Header from "@/components/Layout/Header";
import ViewWrapper from "@/components/Layout/View";
import { Text, View } from "react-native";

export default function UserDetails() {
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
