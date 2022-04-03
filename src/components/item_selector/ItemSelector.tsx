import React, { useContext, useMemo, useState } from "react"
import { ScrollView, View } from "react-native"
import { List, Searchbar } from "react-native-paper"
import { PlentiItem, plentiItems, ProduceType } from "../../assets/PlentiItemsIndex"
import { AccountContext } from "../../contexts/AccountContext"
import { ImageContext } from "../../contexts/ImageContext"
import Theme from "../../lib/Theme"
import { ProduceGrid } from "../produce_grid/ProduceGrid"
import { ProduceGridItem } from "../produce_grid/ProduceGridItem"

interface Props {
  onItemSelect(item: PlentiItem): void
}

const ItemSelector: React.FC<Props> = (props) => {
  const { onItemSelect } = props

  const [searchText, setSearchText] = useState("")
  // const navigation = useNavigation()

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
          <List.Section>
            {categoryArray.map(([type, items]) => (
              <List.Accordion title={type.charAt(0).toUpperCase() + type.slice(1)} key={`list_accordion_${type}`}>
                <ProduceGrid>
                  {items.map((item) => (
                    <ProduceGridItem
                      onPress={() => onItemSelect(item)}
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
    </View>
  )
}

export default ItemSelector
