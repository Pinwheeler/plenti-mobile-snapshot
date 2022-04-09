import React, { useMemo, useState } from "react"
import { ScrollView, View } from "react-native"

import { AllPlentiItems, PlentiItem, ProduceType } from "../../assets/PlentiItemsIndex"
import Theme from "../../lib/Theme"
import { Accordion } from "../Accordion"
import { ProduceGrid } from "../produce_grid/ProduceGrid"
import { ProduceGridItem } from "../produce_grid/ProduceGridItem"
import { SearchBar } from "@rneui/themed"

interface Props {
  onItemSelect(item: PlentiItem): void
}

const ItemSelector: React.FC<Props> = (props) => {
  const { onItemSelect } = props

  const [searchText, setSearchText] = useState("")
  // const navigation = useNavigation()

  const categories: Map<ProduceType, PlentiItem[]> = useMemo(() => {
    const c = new Map()
    AllPlentiItems.forEach((item) => {
      if (c.get(item.type) === undefined) {
        c.set(item.type, [])
      }
      const oldArray = c.get(item.type)
      const newArray = [...oldArray, item]
      c.set(item.type, newArray)
    })
    return c
  }, [AllPlentiItems])

  const filteredItems = useMemo(() => {
    return AllPlentiItems.filter((item) => {
      return item.name.toLowerCase().match(searchText.toLowerCase())
    })
  }, [searchText, AllPlentiItems])

  const InnerContent = () => {
    if (searchText.length > 0) {
      return (
        <ProduceGrid>
          {filteredItems.map((item) => (
            <ProduceGridItem
              plentiItem={item}
              key={`selector-grid-item-${item.name}`}
              onPress={() => onItemSelect(item)}
            />
          ))}
        </ProduceGrid>
      )
    } else {
      const categoryArray = Array.from(categories)
      return (
        <ScrollView>
          {categoryArray.map(([type, items]) => (
            <Accordion title={type} key={`list_accordion_${type}`}>
              <ProduceGrid>
                {items.map((item) => (
                  <ProduceGridItem
                    onPress={() => onItemSelect(item)}
                    plentiItem={item}
                    key={`selector-grid-item-${item.name}`}
                  />
                ))}
              </ProduceGrid>
            </Accordion>
          ))}
          <View style={{ height: 300 }} />
        </ScrollView>
      )
    }
  }

  return (
    <View>
      <SearchBar
        // cancelIcon={"close"}
        onChangeText={setSearchText}
        value={searchText}
        // theme={Theme}
        style={{ marginVertical: 10, borderRadius: 30, marginHorizontal: 10 }}
      />
      <InnerContent />
    </View>
  )
}

export default ItemSelector
