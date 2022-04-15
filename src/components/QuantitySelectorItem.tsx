import { Button, useTheme } from "@rneui/themed"
import React from "react"
import { Quantity } from "../api/models/Quantity"

interface Props {
  quantity: Quantity
  currentQuantity?: Quantity
  quantitySelected: (quantity: Quantity) => void
}

export const QuantitySelectorItem: React.FC<Props> = (props) => {
  const { quantitySelected, quantity, currentQuantity } = props
  const selected = quantity === currentQuantity
  const { theme } = useTheme()
  return (
    <Button
      onPress={() => quantitySelected(quantity)}
      buttonStyle={{ marginVertical: 5, backgroundColor: selected ? theme.colors.secondary : theme.colors.grey4 }}
      title={props.quantity}
    />
  )
}
