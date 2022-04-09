import { Button, Text } from "@rneui/themed"
import React from "react"

import { Quantity } from "../../api/models/Quantity"

interface ItemProps {
  quantity: Quantity
  quantitySelected: (quantity: Quantity) => void
}

export const QuantitySelectorItem: React.FC<ItemProps> = (props) => {
  const { quantitySelected, quantity } = props
  return (
    <Button onPress={() => quantitySelected(quantity)} style={{ marginVertical: 10 }}>
      <Text>{props.quantity}</Text>
    </Button>
  )
}
