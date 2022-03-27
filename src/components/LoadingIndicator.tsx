import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { H3 } from "./typography";

interface Props {
  thingThatIsLoading: string;
}

export const LoadingIndicator: React.FC<Props> = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <ActivityIndicator />
      <H3>{`Loading ${props.thingThatIsLoading}`}</H3>
    </View>
  );
};
