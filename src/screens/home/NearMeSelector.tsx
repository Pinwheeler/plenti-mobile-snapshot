import { NavigationContext, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { RefreshControl, TouchableOpacity, View } from "react-native"
import { IconButton, Modal, Paragraph, Portal } from "react-native-paper"
import LoggedInGate from "../../components/LoggedInGate"
import { ProduceGrid } from "../../components/produce_grid/ProduceGrid"
import { AccountContext } from "../../contexts/AccountContext"
import { PremiumContext } from "../../contexts/PremiumContext"
import Theme from "../../lib/Theme"
import { NearMeContext } from "./NearMeContext"

export const NearMeSelector: React.FC = () => {
  const { items, refresh, selectedItem, setSelectedItem } = useContext(NearMeContext)
  const { hasPremium } = useContext(PremiumContext)
  const [refreshing, setRefreshing] = useState(false)
  const [removeUpgradeAdRequested, setRemoveUpgradeAdRequested] = useState(false)
  const { distanceInPreferredUnits } = useContext(LocationContext)
  const { account } = useContext(AccountContext)
  const { connectionService } = useContext(ApiContext)
  const { navigate } = useContext(NavigationContext)

  const navigation = useNavigation()

  const onRefresh = async () => {
    setRefreshing(true)
    refresh().finally(() => {
      setRefreshing(false)
      setRemoveUpgradeAdRequested(false)
    })
  }

  useEffect(() => {
    onRefresh()
  }, [account])

  const showUpgradeAd = useMemo(() => {
    return !hasPremium && !removeUpgradeAdRequested
  }, [hasPremium, removeUpgradeAdRequested])

  const goToAccount = () => {
    setSelectedItem(undefined)
    navigation.navigate("Profile")
  }

  const onCancel = () => {
    setSelectedItem(undefined)
  }

  const onConnect = () => {
    connectionService.createFromInventoryItem(selectedItem.inventoryItem).then((connection) => {
      setSelectedItem(undefined)
      navigation.navigate("Chat", { connection })
    })
  }

  return (
    <>
      <ProduceGrid refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {items.map((item) => (
          <NearMeGridItem item={item} key={`near-me-item-${item.inventoryItem.id}`} />
        ))}
      </ProduceGrid>
      <Portal>
        <Modal visible={!!selectedItem} onDismiss={() => setSelectedItem(undefined)}>
          {!!selectedItem && (
            <LoggedInGate onClose={() => setSelectedItem(undefined)} account={account} goToAccount={goToAccount}>
              {account && (
                <ConfirmNearbyRequest
                  selectedItem={selectedItem}
                  distanceString={distanceInPreferredUnits(selectedItem.distance)}
                  onCancel={onCancel}
                  onConnect={onConnect}
                />
              )}
            </LoggedInGate>
          )}
        </Modal>
      </Portal>
      {showUpgradeAd && (
        <View
          style={{
            width: "100%",
            height: 50,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            style={{
              width: "85%",
              height: "80%",
              backgroundColor: Theme.colors.accent,
              position: "relative",
              left: "10%",
              top: "5%",
              borderRadius: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigate("Store")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                borderRadius: 90,
                position: "relative",
              }}
            >
              <Paragraph style={{ fontSize: 17, position: "absolute", left: 15 }}>Seeking something else?</Paragraph>
              <IconButton
                style={{ position: "absolute", right: 5, height: 30, width: 30 }}
                type={IconType.close}
                size={20}
                onPress={() => setRemoveUpgradeAdRequested(true)}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}
