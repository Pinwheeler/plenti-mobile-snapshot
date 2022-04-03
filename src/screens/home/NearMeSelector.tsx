import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Modal, Paragraph, Portal } from "react-native-paper"
import { IconButton } from "../../components/IconButton"
import LoggedInGate from "../../components/LoggedInGate"
import { ProduceGrid } from "../../components/produce_grid/ProduceGrid"
import { AccountContext } from "../../contexts/AccountContext"
import { AppContext } from "../../contexts/AppContext"
import { ChatContext } from "../../contexts/ChatContext"
import { LocationContext } from "../../contexts/LocationContext"
import { PremiumContext } from "../../contexts/PremiumContext"
import Theme from "../../lib/Theme"
import { ConfirmNearbyRequest } from "./ConfirmNearbyRequest"
import { NearMeContext } from "./NearMeContext"
import { NearMeGridItem } from "./NearMeGridItem"

export const NearMeSelector: React.FC = () => {
  const { items, selectedItem, setSelectedItem } = useContext(NearMeContext)
  const { createConnection } = useContext(ChatContext)
  const { hasPremium } = useContext(PremiumContext)
  const [removeUpgradeAdRequested, setRemoveUpgradeAdRequested] = useState(false)
  const { distanceInPreferredUnits } = useContext(LocationContext)
  const { loggedInAccount } = useContext(AccountContext)
  const navigation = useNavigation()
  const { appwideError } = useContext(AppContext)

  useEffect(() => {
    setRemoveUpgradeAdRequested(false)
  }, [])

  const showUpgradeAd = useMemo(() => {
    return !hasPremium && !removeUpgradeAdRequested
  }, [hasPremium, removeUpgradeAdRequested])

  const goToAccount = () => {
    setSelectedItem(undefined)
    navigation.dispatch(CommonActions.navigate({ name: "Profile" }))
  }

  const onCancel = () => {
    setSelectedItem(undefined)
  }

  const onConnect = () => {
    if (selectedItem) {
      createConnection(selectedItem.inventoryItem).then(() =>
        navigation.dispatch(CommonActions.navigate({ name: "Chat" })),
      )
    }
  }

  return (
    <>
      <ProduceGrid>
        {items.map((item) => (
          <NearMeGridItem item={item} key={`near-me-item-${item.inventoryItem.uid}`} />
        ))}
      </ProduceGrid>
      <Portal>
        <Modal visible={!!selectedItem} onDismiss={() => setSelectedItem(undefined)}>
          {!!selectedItem && (
            <LoggedInGate
              onClose={() => setSelectedItem(undefined)}
              account={loggedInAccount}
              goToAccount={goToAccount}
            >
              {loggedInAccount && (
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
            onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Store" }))}
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
                type={"times"}
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
