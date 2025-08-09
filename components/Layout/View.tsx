import { useResponsive } from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface ViewWrapperProps {
  children: ReactNode;
}

const ViewWrapper: React.FC<ViewWrapperProps> = ({ children }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const { isTablet } = useResponsive();
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor },
      isTablet && styles.containerTablet
    ]}>
      {children}
    </View>
  );
};

export default ViewWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  containerTablet: {
    paddingTop: "3%",
    paddingLeft: "8%",
    paddingRight: "8%",
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
});
