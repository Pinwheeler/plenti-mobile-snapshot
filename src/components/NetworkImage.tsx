import React from "react";
import { Image, ImageStyle } from "react-native";

interface Props {
  uri: string
  style?: ImageStyle;
}

const NetworkImage: React.FC<Props> = (props) => {
  const { uri } = props;
  const style = { width: 80, height: 80, ...props.style };
  const unknown = require("../lib/images/plenti_items/unknown.png");
  return (
    <Image
      source={{ uri }}
      style={style}
      loadingIndicatorSource={unknown}
    />
  );
};

export default NetworkImage;
