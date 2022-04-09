import { Card } from "@rneui/themed"
import React from "react"
import { TouchableOpacity } from "react-native"

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
    <TouchableOpacity
      style={{
        height: 200,
        marginBottom: 15,
        minWidth: 140,
        marginHorizontal: 10,
        flex: 1,
      }}
      onPress={onPress}
    >
      <Card>
        <ProduceItemImage
          imageOverride={imageURL}
          item={plentiItem}
          style={{ height: 130, width: "100%" }}
          resizeMode="cover"
        />
        <Card.Title>{plentiItem.name}</Card.Title>
        {props.children}
      </Card>
    </TouchableOpacity>
  )
}
