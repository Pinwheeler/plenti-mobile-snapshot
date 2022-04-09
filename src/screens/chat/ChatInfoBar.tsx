import React, { useContext, useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import openMap, { ShowOptions } from "react-native-open-maps"
import { Button, Surface, Text } from "react-native-paper"
import { AccountEntity } from "../../api/models/Account"
import { ChatContext } from "../../contexts/ChatContext"
import { ConversationContext } from "./ConversationContext"
import database from "@react-native-firebase/database"
import { URLS } from "../../lib/DatabaseHelpers"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import Theme from "../../lib/Theme"
import { IconButton } from "../../components/IconButton"

const ChatInfoBar: React.FC = (props) => {
  const { refresh, shareLocation, setShareLocationModalOpen, setOffendingAccount } = useContext(ChatContext)
  const { conversation, connection } = useContext(ConversationContext)
  const iHaveSharedPickupLocation = connection.iHaveSharedLocation
  const [partnerAccount, setPartnerAccount] = useState<AccountEntity>()
  const theirPickupLocation = connection.theirPickupLocation

  useEffect(() => {
    const path = `/accounts/${connection.partnerUid}`
    const partnerChange = database()
      .ref(path)
      .on("value", (snapshot) => setPartnerAccount(new AccountEntity(snapshot.val())))
    return () => database().ref(path).off("value", partnerChange)
  }, [connection])

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
              mode="outlined"
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
                setShareLocationModalOpen(true)
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
    <Surface
      style={{
        padding: 5,
        alignContent: "center",
        elevation: 2,
        // backgroundColor: Theme.colors.notification,
      }}
    >
      <InnerComponent />
    </Surface>
  )
}

export default ChatInfoBar
