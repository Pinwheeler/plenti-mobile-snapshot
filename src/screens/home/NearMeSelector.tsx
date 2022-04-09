import { CommonActions, useNavigation } from "@react-navigation/native"
import { Overlay, Text, useTheme } from "@rneui/themed"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { TouchableOpacity, View } from "react-native"

import { IconButton } from "../../components/IconButton"
import LoggedInGate from "../../components/LoggedInGate"
import { ProduceGrid } from "../../components/produce_grid/ProduceGrid"
import { AccountContext } from "../../contexts/AccountContext"
import { AppContext } from "../../contexts/AppContext"
import { ChatContext } from "../../contexts/ChatContext"
import { LocationContext } from "../../contexts/LocationContext"
import { PremiumContext } from "../../contexts/PremiumContext"
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
  const { theme } = useTheme()

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
      <Overlay
        overlayStyle={{ marginHorizontal: 15, paddingHorizontal: 15 }}
        isVisible={!!selectedItem}
        onDismiss={() => setSelectedItem(undefined)}
      >
        {!!selectedItem && (
          <LoggedInGate onClose={() => setSelectedItem(undefined)} account={loggedInAccount} goToAccount={goToAccount}>
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
      </Overlay>
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
              backgroundColor: theme.colors.secondary,
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
              <Text style={{ fontSize: 17, position: "absolute", left: 15 }}>Seeking something else?</Text>
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
