import React, { useContext, useMemo } from "react"
import { View } from "react-native"
import openMap, { ShowOptions } from "react-native-open-maps"
import { ConversationContext } from "./ConversationContext"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { IconButton } from "../../components/IconButton"
import { Button, Text, useTheme } from "@rneui/themed"

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
    const { theme } = useTheme()
    return (
      <View style={{ flexDirection: "row" }}>
        <IconButton size={24} type={"flag"} onPress={() => setOffendingAccount(partnerAccount)} />
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
              title="Copy to Clipboard"
            />
          )}
        </View>
        <IconButton
          size={24}
          type="gps-fixed"
          onPress={() => {
            console.log("location buttin pressed")
            if (!iHaveSharedPickupLocation) {
              setShareLocationOpen(true)
            } else {
              shareLocation(false)
            }
          }}
          style={{ backgroundColor: iHaveSharedPickupLocation ? theme.colors.primary : "transparent" }}
        />
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
