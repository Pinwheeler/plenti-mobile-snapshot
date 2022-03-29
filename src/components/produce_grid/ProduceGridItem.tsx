import React from "react";
import { View } from "react-native";
import { Card, Title } from "react-native-paper";
import { usePlentItemURI } from "src/item_grid/NetworkImage";

interface Props {
  plentiItem: PlentiItemEntity;
  onPress?: () => void;
}

export const ProduceGridItem: React.FC<Props> = (props) => {
  const { onPress, plentiItem } = props;
  const imageURI = usePlentItemURI(plentiItem);
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
        <Card.Cover source={{ uri: imageURI }} style={{ height: 130 }} />
        <Card.Content>
          <Title>{plentiItem.displayName}</Title>
          {props.children}
        </Card.Content>
      </Card>
    </View>
  );
};
