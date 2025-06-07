import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const UserInformation = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Company Name Here</Text>
      <Text style={styles.text}>Company Address here</Text>
      <Text style={styles.text}></Text>
      <Text style={styles.text}>User Information</Text>
      <Image
        source={require("../../assets/public/tempProfile.png")}
        style={styles.image}
      />
      <TextInput
        readOnly
        label="Employee Name"
        value="Roland Capinpin Jr"
        style={styles.input}
      />
      <TextInput
        style={styles.input}
        readOnly
        label="Employee Number"
        value=" EX-1001-1001-1001"
      />
      <View style={styles.buttonWrapper}>
        <Pressable
          style={styles.button}
          android_ripple={{ color: "gray", borderless: false }}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={styles.buttonLogout}
          onPress={() => console.log("Logout pressed")}
          android_ripple={{ color: "gray", borderless: false }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default UserInformation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    backgroundColor: "#112866",
  },
  image: {
    borderRadius: 6,
    width: 300,
    height: 300,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  input: {
    width: 300,
    height: 50,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#00809D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonLogout: {
    backgroundColor: "#CD5656",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonWrapper: {
    borderRadius: 12,
    width: "75%",
    marginBottom: 10,
    overflow: "hidden",
  },
});
