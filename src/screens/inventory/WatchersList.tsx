import { Text, useTheme } from "@rneui/themed"
import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { PlentiWatcher } from "../../api/models/PlentiWatcher"
import { ProduceItemImage } from "../../components/ProduceItemImage"
import { TopInfoBar } from "../../components/TopInfoBar"
import { WatcherContext } from "../../contexts/WatcherContext"
import { capitalize } from "../../lib/StringHelpers"

export const WatchersList: React.FC = () => {
  const { myWatchers } = useContext(WatcherContext)
  const { theme } = useTheme()

  return (
    <View>
      <TopInfoBar text="Your Watched Items" />
      <ScrollView style={{ marginTop: 5 }}>
        {myWatchers.map((watcher) => (
          <WatcherListItem watcher={watcher} key={`my_watcher_${watcher.plentiItemName}`} />
        ))}
      </ScrollView>
    </View>
  )
}

interface ItemProps {
  watcher: PlentiWatcher
}

const WatcherListItem: React.FC<ItemProps> = (props) => {
  const { watcher } = props
  const { theme } = useTheme()

  const handlePress = () => {}

  return (
    <TouchableRipple onPress={handlePress} style={{ backgroundColor: theme.colors.background }}>
      <View style={{ flexDirection: "row", padding: 12, alignItems: "center" }}>
        <ProduceItemImage item={watcher.plentiItemName} style={{ height: 50, width: 50 }} />
        <Text h4 style={{ marginLeft: 10, flex: 1 }}>
          {capitalize(watcher.plentiItemName)}
        </Text>
        <Text>{watcher.quantity}</Text>
      </View>
    </TouchableRipple>
  )
}
