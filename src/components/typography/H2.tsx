import React from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import Theme from "../../lib/Theme";

interface Props {
  style?: StyleProp<TextStyle>;
}

export const H2: React.FC<Props> = (props) => {
  return (
    <View style={props.style}>
      <Text
        style={{ fontSize: 20, color: Theme.colors.text, fontWeight: "500" }}
      >
        {props.children}
      </Text>
    </View>
  );
};
