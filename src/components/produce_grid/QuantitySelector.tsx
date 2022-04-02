import React from "react"
import { View } from "react-native"
import { Button, Text, Title } from "react-native-paper"
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
      <Title style={{ marginBottom: 15, textDecorationLine: "underline" }}>{`How many ${displayName}?`}</Title>
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
  return (
    <Button onPress={() => quantitySelected(quantity)} mode="contained" style={{ marginVertical: 10 }}>
      <Text>{props.quantity}</Text>
    </Button>
  )
}
