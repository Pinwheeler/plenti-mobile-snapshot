import React from "react"
import { Button, Text } from "react-native-paper"
import { Quantity } from "../../api/models/Quantity"

interface ItemProps {
  quantity: Quantity
  quantitySelected: (quantity: Quantity) => void
}

export const QuantitySelectorItem: React.FC<ItemProps> = (props) => {
  const { quantitySelected, quantity } = props
  return (
    <Button onPress={() => quantitySelected(quantity)} mode="contained" style={{ marginVertical: 10 }}>
      <Text>{props.quantity}</Text>
    </Button>
  )
}
