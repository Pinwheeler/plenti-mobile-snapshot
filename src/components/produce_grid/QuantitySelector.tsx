import { Button, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"

interface Props {
  quantitySelected: (quantity: Quantity) => void
  selectedItem: PlentiItem
}

export const QuantitySelector: React.FC<Props> = (props) => {
  const { quantitySelected, selectedItem } = props

  const displayName = selectedItem.name

  return (
    <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
      <Text h1 style={{ marginBottom: 15, textDecorationLine: "underline" }}>{`How many ${displayName}?`}</Text>
      <QuantitySelectorItem quantity={"A Little"} quantitySelected={quantitySelected} />
      <QuantitySelectorItem quantity={"Some"} quantitySelected={quantitySelected} />
      <QuantitySelectorItem quantity={"A Lot"} quantitySelected={quantitySelected} />
    </View>
  )
}

interface ItemProps {
  quantity: Quantity
  quantitySelected: (quantity: Quantity) => void
}

const QuantitySelectorItem: React.FC<ItemProps> = (props) => {
  const { quantitySelected, quantity } = props
  return <Button onPress={() => quantitySelected(quantity)} style={{ marginVertical: 10 }} title={props.quantity} />
}
