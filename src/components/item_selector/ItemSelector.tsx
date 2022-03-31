import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useContext, useMemo, useState } from "react"
import { ScrollView, View } from "react-native"
import { List, Modal, Portal, Searchbar } from "react-native-paper"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem, ProduceType } from "../../assets/PlentiItemsIndex"
import { AccountContext } from "../../contexts/AccountContext"
import { ImageContext } from "../../contexts/ImageContext"
import { PlentiItemContext } from "../../contexts/PlentiItemContext"
import Theme from "../../lib/Theme"
import LoggedInGate from "../LoggedInGate"
import { ProduceGrid } from "../produce_grid/ProduceGrid"
import { ProduceGridItem } from "../produce_grid/ProduceGridItem"
import { ProduceItemDetails } from "../produce_grid/ProduceItemDetails"
import { ItemSelectorContext } from "./ItemSelectorContext"

interface Props {
  itemAndQuantitySelected: (itemName: string, quantity: Quantity) => void
}

const ItemSelector: React.FC<Props> = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const { plentiItems } = useContext(PlentiItemContext)
  const { selectedItem, setSelectedItem } = useContext(ItemSelectorContext)
  const { uploadNewProduceImage } = useContext(ImageContext)
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
      return item.name.toLowerCase().match(searchText.toLowerCase())
    })
  }, [searchText, plentiItems])

  const quantitySelected = (quantity: Quantity) => {
    if (selectedItem) {
      props.itemAndQuantitySelected(selectedItem.name, quantity)
    }
    setSelectedItem(undefined)
  }

  const goToAccount = () => {
    setSelectedItem(undefined)
    navigation.dispatch(CommonActions.navigate({ name: "Profile" }))
  }

  const InnerContent = () => {
    if (searchText.length > 0) {
      return (
        <ProduceGrid>
          {filteredItems.map((item) => (
            <ProduceGridItem
              plentiItem={item}
              key={`selector-grid-item-${item.name}`}
              onPress={() => setSelectedItem(item)}
            />
          ))}
        </ProduceGrid>
      )
    } else {
      const categoryArray = Array.from(categories)
      return (
        <ScrollView>
          <List.Section>
            {categoryArray.map(([type, items]) => (
              <List.Accordion title={type.charAt(0).toUpperCase() + type.slice(1)} key={`list_accordion_${type}`}>
                <ProduceGrid>
                  {items.map((item) => (
                    <ProduceGridItem
                      onPress={() => setSelectedItem(item)}
                      plentiItem={item}
                      key={`selector-grid-item-${item.name}`}
                    />
                  ))}
                </ProduceGrid>
              </List.Accordion>
            ))}
            <View style={{ height: 300 }} />
          </List.Section>
        </ScrollView>
      )
    }
  }

  return (
    <View>
      <Searchbar
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
            <ProduceItemDetails
              uploadNewProduceImage={uploadNewProduceImage}
              loggedInAccount={loggedInAccount!}
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
