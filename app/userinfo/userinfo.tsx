import UserInformation from "@/components/UserInfo/UserInFormation";
import { useAuth } from "@/contexts/AuthContext";
import { debugHelper } from "@/utils/debugHelper";
import { logger } from "@/utils/logger";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

const UserInfo = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const route = useRoute();
  const { clearSession } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      debugHelper.logComponentLifecycle("UserInfo", "mount");
      isInitialized.current = true;
    }

    try {
      logger.info("UserInfo component processing params", {
        hasParams: !!params,
        paramKeys: params ? Object.keys(params) : [],
      });

      if (!params?.userData) {
        logger.error("No userData in params");
        setError("No user data provided");
        setIsLoading(false);
        return;
      }

      const parsedUserData = JSON.parse(params.userData as string);
      logger.info("User data parsed successfully", {
        hasData: !!parsedUserData,
        dataKeys: parsedUserData ? Object.keys(parsedUserData) : [],
      });

      setUserInfo(parsedUserData);
      setIsLoading(false);
    } catch (parseError) {
      const errorMessage = (parseError as Error).message;
      logger.error("Failed to parse user data", {
        error: errorMessage,
        userData: params?.userData,
      });

      setError(`Failed to parse user data: ${errorMessage}`);
      setIsLoading(false);
      if (__DEV__) {
        debugHelper.showErrorAlert("Parse Error", errorMessage, parseError);
      }
    }

    return () => {
      debugHelper.logComponentLifecycle("UserInfo", "unmount");
    };
  }, [params?.userData]);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "red",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Error: {error}
        </Text>
        <Text
          style={{ color: "blue", textDecorationLine: "underline" }}
          onPress={() => router.replace("/login")}
        >
          Return to Login
        </Text>
      </View>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading user information...</Text>
      </View>
    );
  }

  // Render user information
  return <UserInformation UserInfo={userInfo} />;
};

export default UserInfo;
