import React from "react"
import { Image, ImageStyle } from "react-native"
import { itemForName, PlentiItem } from "../assets/PlentiItemsIndex"

interface Props {
  imageOverride?: string
  item: PlentiItem | string
  style?: ImageStyle
  resizeMode?: "cover" | "contain"
}

function isPlentiItem(val: PlentiItem | string): val is PlentiItem {
  return (val as PlentiItem).localImage !== undefined
}

export const ProduceItemImage: React.FC<Props> = (props) => {
  const { imageOverride, item, style, resizeMode } = props

  if (imageOverride) {
    return <Image source={{ uri: imageOverride }} style={style} resizeMode={resizeMode} />
  } else {
    const plentiItem = isPlentiItem(item) ? item : itemForName(item)
    return <Image source={plentiItem?.localImage} style={style} resizeMode={resizeMode} />
  }
}
