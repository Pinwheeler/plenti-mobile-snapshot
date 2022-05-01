import database from "@react-native-firebase/database"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { Button, Overlay, Text, useTheme } from "@rneui/themed"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { AccountEntity } from "../../api/models/Account"
import { IconButton } from "../../components/IconButton"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import LoggedInGate from "../../components/LoggedInGate"
import { ProduceGrid } from "../../components/produce_grid/ProduceGrid"
import { AccountContext } from "../../contexts/AccountContext"
import { ChatContext } from "../../contexts/ChatContext"
import { LocationContext } from "../../contexts/LocationContext"
import { PremiumContext } from "../../contexts/PremiumContext"
import { HomeNavProp } from "../../nav/HomeStack"
import { ConfirmNearbyRequest } from "./ConfirmNearbyRequest"
import { NearMeContext } from "./NearMeContext"
import { NearMeGridItem } from "./NearMeGridItem"

export const NearMeSelector: React.FC = () => {
  const { selectedItem, setSelectedItem } = useContext(NearMeContext)
  const { createConnection } = useContext(ChatContext)
  const { hasPremium } = useContext(PremiumContext)
  const [removeUpgradeAdRequested, setRemoveUpgradeAdRequested] = useState(false)
  const { distanceInPreferredUnits } = useContext(LocationContext)
  const { loggedInAccount } = useContext(AccountContext)
  const navigation = useNavigation<HomeNavProp>()
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
      createConnection(selectedItem.inventoryItem).then((connection) => {
        database()
          .ref(`/accounts/${connection.partnerUid}`)
          .once("value", (snapshot) => {
            const partnerAccount = new AccountEntity(snapshot.val())
            navigation.navigate("Chat", { connection, partnerAccount })
          })
      })
    }
  }

  return (
    <>
      <InnerComponent />
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

const InnerComponent: React.FC = () => {
  const { items, loading, calculatedMaxDistance } = useContext(NearMeContext)
  const { lastKnownPosition } = useContext(LocationContext)
  const { loggedInAccount } = useContext(AccountContext)
  const navigation = useNavigation<HomeNavProp>()
  const { theme } = useTheme()

  if (!items || (items.length === 0 && loading)) {
    return (
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <LoadingIndicator thingThatIsLoading="items near you" />
      </View>
    )
  }

  if (items.length === 0) {
    const maxDistanceString =
      loggedInAccount?.maxDistance === -1
        ? "within max radius (1000 km)"
        : `within ${calculatedMaxDistance} ${loggedInAccount?.prefersMetric || !loggedInAccount ? "km" : "mi"}`

    return (
      <View
        style={{
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text style={{ textAlign: "center" }}>Couldn't find any items</Text>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.success,
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          {maxDistanceString}
        </Text>
        <Text style={{ textAlign: "center" }}>Try one of the following:</Text>
        {loggedInAccount?.maxDistance && loggedInAccount.maxDistance > -1 && (
          <View>
            <Button
              type="outline"
              onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Profile" }))}
              buttonStyle={{ margin: 20 }}
              title="Increase your max search range to look farther afield"
            />
          </View>
        )}
        <Button
          type="outline"
          onPress={() => navigation.navigate("AddInventoryItem")}
          buttonStyle={{ marginHorizontal: 20 }}
          title="Be the first by adding to your inventory"
        />
      </View>
    )
  }

  return (
    <ProduceGrid>
      {items.map((item) => (
        <NearMeGridItem item={item} key={`near-me-item-${item.inventoryItem.uid}`} />
      ))}
    </ProduceGrid>
  )
}
