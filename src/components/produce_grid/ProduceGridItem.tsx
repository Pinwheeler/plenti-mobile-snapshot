import React from "react";
import { Image, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { PlentiItem } from "../../assets/PlentiItemsIndex";

interface Props {
  plentiItem: PlentiItem;
  onPress?: () => void;
}

export const ProduceGridItem: React.FC<Props> = (props) => {
  const { onPress, plentiItem } = props;
  return (
    <View
      style={{
        maxWidth: 190,
        height: 200,
        marginBottom: 15,
        minWidth: 140,
        flex: 1,
      }}
    >
      <Card style={{ marginHorizontal: 10 }} onPress={onPress}>
        <Image source={require("../../assets/images/pumpkins.jpg")} style={{height: 130}} />
        {/* <Card.Cover source={require("../../assets/images/pumpkins.jpg")} style={{ height: 130 }} /> */}
        <Card.Content>
          <Title>{plentiItem.name}</Title>
          {props.children}
        </Card.Content>
      </Card>
    </View>
  );
};
