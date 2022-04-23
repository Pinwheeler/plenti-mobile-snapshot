import { Overlay } from "@rneui/base"
import { Text, useTheme } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { ScrollView, View } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { PlentiWatcher } from "../../api/models/PlentiWatcher"
import { ProduceItemImage } from "../../components/ProduceItemImage"
import { TopInfoBar } from "../../components/TopInfoBar"
import { WatcherContext } from "../../contexts/WatcherContext"
import { capitalize } from "../../lib/StringHelpers"
import { EditWatcherModal } from "../home/EditWatcherModal"

export const WatchersList: React.FC = () => {
  const { myWatchers } = useContext(WatcherContext)
  const [selectedWatcher, setSelectedWatcher] = useState<PlentiWatcher>()

  const handleClose = () => {
    setSelectedWatcher(undefined)
  }

  return (
    <View>
      <TopInfoBar text="Your Watched Items" />
      <ScrollView style={{ marginTop: 5 }}>
        {myWatchers.map((watcher) => (
          <WatcherListItem
            watcher={watcher}
            onPress={() => setSelectedWatcher(watcher)}
            key={`my_watcher_${watcher.plentiItemName}`}
          />
        ))}
      </ScrollView>
      <Overlay
        overlayStyle={{ margin: 20 }}
        isVisible={!!selectedWatcher}
        onBackdropPress={() => setSelectedWatcher(undefined)}
      >
        {selectedWatcher ? <EditWatcherModal watcher={selectedWatcher} onClose={handleClose} /> : null}
      </Overlay>
    </View>
  )
}

interface ItemProps {
  watcher: PlentiWatcher
  onPress(): void
}

const WatcherListItem: React.FC<ItemProps> = (props) => {
  const { watcher, onPress } = props
  const { theme } = useTheme()

  return (
    <TouchableRipple onPress={onPress} style={{ backgroundColor: theme.colors.background }}>
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
