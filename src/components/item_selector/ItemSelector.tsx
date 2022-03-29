import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useContext, useMemo, useState } from "react"
import { ScrollView, View } from "react-native"
import { Modal, Portal, Searchbar } from "react-native-paper"
import { Accordion } from "react-native-paper/lib/typescript/components/List/List"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem, ProduceType } from "../../assets/PlentiItemsIndex"
import { AccountContext } from "../../contexts/AccountContext"
import { PlentiItemContext } from "../../contexts/PlentiItemContext"
import Theme from "../../lib/Theme"
import LoggedInGate from "../LoggedInGate"
import { ProduceGrid } from "../produce_grid/ProduceGrid"
import { ProduceGridItem } from "../produce_grid/ProduceGridItem"
import QuantitySelector from "../produce_grid/QuantitySelector"
import { ItemSelectorContext } from "./ItemSelectorContext"


interface Props {
  itemAndQuantitySelected: (item: PlentiItem, quantity: Quantity) => void
}

const ItemSelector: React.FC<Props> = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const { plentiItems } = useContext(PlentiItemContext)
  const { selectedItem, setSelectedItem } = useContext(ItemSelectorContext)
  const [searchText, setSearchText] = useState("")
  const navigation = useNavigation()

  const categories: Map<ProduceType, PlentiItem[]> = useMemo(() => {
    const c = new Map()
    plentiItems.forEach((item) => {
      if (c.get(item.type) === undefined) {
        c.set(item.type, [])
      }
      const oldArray = c.get(item.type)
      const newArray = [...oldArray, item]
      c.set(item.type, newArray)
    })
    return c
  }, [plentiItems])

  const filteredItems = useMemo(() => {
    return plentiItems.filter((item) => {
      return item.name.match(searchText)
    })
  }, [searchText, plentiItems])

  const quantitySelected = (quantity: Quantity) => {
    if (selectedItem) {
      props.itemAndQuantitySelected(selectedItem, quantity)
    }
    setSelectedItem(undefined)
  }

  const goToAccount = () => {
    setSelectedItem(undefined)
    navigation.dispatch(CommonActions.navigate({name:"Profile"}))
  }

  const InnerContent = () => {
    if (searchText.length > 0) {
      return (
        <ProduceGrid>
          {filteredItems.map((item) => (
            <ProduceGridItem
              plentiItem={item}
              key={`selector-grid-item-${item.id}`}
              onPress={() => setSelectedItem(item)}
            />
          ))}
        </ProduceGrid>
      )
    } else {
      return (
        <ScrollView>
          <>
            {Array.from(categories, ([key]) => (
              <Accordion type={key} items={categories.get(key)} key={key} />
            ))}
            <View style={{ height: 300 }} />
          </>
        </ScrollView>
      )
    }
  }

  return (
    <View>
      <Searchbar
        icon={"search"}
        clearIcon={"close"}
        onChangeText={setSearchText}
        value={searchText}
        theme={Theme}
        style={{ marginVertical: 10, borderRadius: 30, marginHorizontal: 10 }}
      />
      <InnerContent />
      <Portal>
        <Modal visible={!!selectedItem} onDismiss={() => setSelectedItem(undefined)}>
          <LoggedInGate onClose={() => setSelectedItem(undefined)} account={loggedInAccount} goToAccount={goToAccount}>
            <QuantitySelector
              quantitySelected={quantitySelected}
              selectedItem={selectedItem}
              onClose={() => setSelectedItem(undefined)}
            />
          </LoggedInGate>
        </Modal>
      </Portal>
    </View>
  )
}

export default ItemSelector
