import React, { useContext } from "react";
import { Image, ImageStyle } from "react-native";
import { PlentiItemEntity } from "../api/models/PlentiItem";

interface Props {
  item: PlentiItemEntity;
  style?: ImageStyle;
}

const LocalImages = {};

const NetworkImage: React.FC<Props> = (props) => {
  const { item } = props;
  const style = { width: 80, height: 80, ...props.style };
  const unknown = require("../lib/images/plenti_items/unknown.png");
  return (
    <Image
      source={{ uri: imageURL }}
      style={style}
      loadingIndicatorSource={unknown}
    />
  );
};

export default NetworkImage;
