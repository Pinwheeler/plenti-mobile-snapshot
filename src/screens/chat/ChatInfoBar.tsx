import React, { useContext, useMemo } from "react"
import { View } from "react-native"
import openMap, { ShowOptions } from "react-native-open-maps"
import { ConversationContext } from "./ConversationContext"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import Theme from "../../lib/Theme"
import { IconButton } from "../../components/IconButton"
import { Button, Text } from "@rneui/themed"

const ChatInfoBar: React.FC = (props) => {
  const { setOffendingAccount } = useContext(ConversationContext)
  const { connection, shareLocation, setShareLocationOpen, partnerAccount } = useContext(ConversationContext)
  const iHaveSharedPickupLocation = connection.iHaveSharedLocation
  const theirPickupLocation = connection.theirPickupLocation

  if (!partnerAccount) {
    return <LoadingIndicator thingThatIsLoading="Partner information" />
  }

  const partnerNameLine = partnerAccount.username

  const locationLine = useMemo(() => {
    if (theirPickupLocation) {
      return `${theirPickupLocation.address} (${theirPickupLocation.latitude}, ${theirPickupLocation.longitude})`
    } else {
      return "They have not yet shared their pickup location with you"
    }
  }, [connection])

  const InnerComponent = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View>
          <IconButton size={24} type={"flag"} onPress={() => setOffendingAccount(partnerAccount)} />
        </View>
        <View style={{ flex: 9 }}>
          <Text style={{ textAlign: "center" }}>{partnerNameLine}</Text>
          <Text style={{ textAlign: "center", fontSize: 12 }}>{locationLine}</Text>
          {!!theirPickupLocation && (
            <Button
              style={{ marginTop: 15 }}
              onPress={() => {
                const options: ShowOptions = {
                  end: theirPickupLocation.address,
                }
                openMap(options)
              }}
            >
              Copy to Clipboard
            </Button>
          )}
        </View>
        <View>
          <IconButton
            size={24}
            type={"gps"}
            onPress={() => {
              if (!iHaveSharedPickupLocation) {
                setShareLocationOpen(true)
              } else {
                shareLocation(false)
              }
            }}
            style={{ backgroundColor: iHaveSharedPickupLocation ? Theme.colors.primary : "transparent" }}
          />
        </View>
      </View>
    )
  }

  return (
    <View
      style={{
        padding: 5,
        alignContent: "center",
        elevation: 2,
        // backgroundColor: Theme.colors.notification,
      }}
    >
      <InnerComponent />
    </View>
  )
}

export default ChatInfoBar
