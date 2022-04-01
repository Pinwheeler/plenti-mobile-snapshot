import React from "react"
import { Image, View } from "react-native"
import { Card, Title } from "react-native-paper"
import { PlentiItem } from "../../assets/PlentiItemsIndex"

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
        {imageURL ? (
          <Image source={{ uri: imageURL }} style={{ height: 130, width: "100%" }} resizeMode="cover" />
        ) : (
          <Image source={plentiItem.localImage} style={{ height: 130, width: "100%" }} resizeMode="cover" />
        )}

        <Card.Content>
          <Title>{plentiItem.name}</Title>
          {props.children}
        </Card.Content>
      </Card>
    </View>
  )
}
