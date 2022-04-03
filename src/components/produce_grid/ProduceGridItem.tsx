import React from "react"
import { View } from "react-native"
import { Card, Title } from "react-native-paper"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { ProduceItemImage } from "../ProduceItemImage"

interface Props {
  plentiItem: PlentiItem
  imageURL?: string
  onPress?: () => void
}

export const ProduceGridItem: React.FC<Props> = (props) => {
  const { onPress, plentiItem, imageURL } = props
  return (
    <View
      style={{
        height: 200,
        marginBottom: 15,
        minWidth: 140,
        flex: 1,
      }}
    >
      <Card style={{ marginHorizontal: 10 }} onPress={onPress}>
        <ProduceItemImage
          imageOverride={imageURL}
          item={plentiItem}
          style={{ height: 130, width: "100%" }}
          resizeMode="cover"
        />
        <Card.Content>
          <Title>{plentiItem.name}</Title>
          {props.children}
        </Card.Content>
      </Card>
    </View>
  )
}
