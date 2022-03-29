import React from "react"
import { View } from "react-native"
import { Text, Button, Title } from "react-native-paper"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"

interface Props {
  quantitySelected: (quantity: Quantity) => void
  selectedItem?: PlentiItem
  onClose(): void
}

const QuantitySelector: React.FC<Props> = (props) => {
  const { quantitySelected, selectedItem, onClose } = props

  const displayName = selectedItem ? selectedItem.name : ""

  return (
    <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
      <Title style={{ marginBottom: 15, textDecorationLine: "underline" }}>{`How many ${displayName}?`}</Title>
      <QuantitySelectorItem quantity={"A Little"} quantitySelected={quantitySelected} />
      <QuantitySelectorItem quantity={"Some"} quantitySelected={quantitySelected} />
      <QuantitySelectorItem quantity={"A Lot"} quantitySelected={quantitySelected} />
      <Button
        style={{ marginTop: 15 }}
        onPress={() => {
          onClose()
        }}
        mode="outlined"
      >
        Close
      </Button>
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

export default QuantitySelector
