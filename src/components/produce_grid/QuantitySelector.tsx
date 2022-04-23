import { Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { Quantity } from "../../api/models/Quantity"
import { QuantitySelectorItem } from "../QuantitySelectorItem"

interface Props {
  onQuantitySelect: (quantity: Quantity) => void
  currentQuantity?: Quantity
  itemName: string
}

export const QuantitySelector: React.FC<Props> = (props) => {
  const { onQuantitySelect, currentQuantity, itemName } = props

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text h3 style={{ marginBottom: 15 }}>{`How many ${itemName}?`}</Text>
      <QuantitySelectorItem
        currentQuantity={currentQuantity}
        quantity={"A Little"}
        quantitySelected={onQuantitySelect}
      />
      <QuantitySelectorItem currentQuantity={currentQuantity} quantity={"Some"} quantitySelected={onQuantitySelect} />
      <QuantitySelectorItem currentQuantity={currentQuantity} quantity={"A Lot"} quantitySelected={onQuantitySelect} />
    </View>
  )
}
