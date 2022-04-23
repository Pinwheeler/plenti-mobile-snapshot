import { Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { QuantitySelectorItem } from "../QuantitySelectorItem"

interface Props {
  onQuantitySelect: (quantity: Quantity) => void
  currentQuantity?: Quantity
  item: PlentiItem
}

export const QuantitySelector: React.FC<Props> = (props) => {
  const { onQuantitySelect, currentQuantity, item } = props

  const displayName = item.name

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text h3 style={{ marginBottom: 15 }}>{`How many ${displayName}?`}</Text>
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
