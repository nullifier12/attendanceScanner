import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface ViewWrapperProps {
  children: ReactNode;
}

const ViewWrapper: React.FC<ViewWrapperProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ViewWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
