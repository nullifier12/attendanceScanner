import Header from "@/components/Layout/Header";
import ViewWrapper from "@/components/Layout/View";
import { Text, View } from "react-native";
const WorkSchedule = () => {
  return (
    <>
      <View style={{ paddingVertical: 8 }}>
        <Header />
      </View>
      <ViewWrapper>
        <Text>Welcome to Work Schecule!</Text>
      </ViewWrapper>
    </>
  );
};
export default WorkSchedule;
