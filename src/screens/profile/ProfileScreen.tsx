import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginSignupSelector } from "./LoginSignupSelector";
import { ProfileInformation } from "./ProfileInformation";

export const ProfileScreen: React.FC = () => {
  const { user } = useContext(AuthContext);

  const InnerComponent = () => {
    if (user) {
      return <ProfileInformation />;
    } else {
      return <LoginSignupSelector />;
    }
  };

  return (
    <View style={{ paddingHorizontal: 15, height: "100%" }}>
      <InnerComponent />
      <View style={{ position: "absolute", bottom: 0, right: 12 }}>
        <Text>Version Information Here</Text>
      </View>
    </View>
  );
};
