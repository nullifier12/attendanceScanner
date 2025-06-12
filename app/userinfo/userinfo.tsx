import UserInformation from "@/components/UserInfo/UserInFormation";
import { useAuth } from "@/contexts/AuthContext";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";

import React from "react";

const UserInfo = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const route = useRoute();
  const { clearSession } = useAuth();

  const userInfo = JSON.parse(params?.userData as string);

  return <UserInformation UserInfo={userInfo} />;
};

export default UserInfo;
