import { CommonActions, NavigationContext } from "@react-navigation/native"
import { Button, Text, useTheme } from "@rneui/themed"
import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import openMap, { ShowOptions } from "react-native-open-maps"

import { IconButton } from "../../components/IconButton"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { AccountContext } from "../../contexts/AccountContext"
import { AuthContext } from "../../contexts/AuthContext"
import { InventoryContext } from "../../contexts/InventoryContext"
import { ProfilePicture } from "./ProfilePicture"

export const ProfileInformation: React.FC = () => {
  const { logout } = useContext(AuthContext)
  const { loggedInAccount } = useContext(AccountContext)
  const { myInventory } = useContext(InventoryContext)
  const navigate = useContext(NavigationContext)
  const { theme } = useTheme()

  if (!loggedInAccount) {
    return <LoadingIndicator thingThatIsLoading="Account Information" />
  }

  return (
    <ScrollView style={{ paddingTop: 15 }}>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <View style={{ flex: 1.2 }}>
          <ProfilePicture account={loggedInAccount} />
        </View>
        <View style={{ flex: 2, flexDirection: "column", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{loggedInAccount.username}</Text>
          {!!loggedInAccount.firstname && <Text style={{ fontSize: 16 }}>{loggedInAccount.firstname}</Text>}
        </View>
        <View
          style={{
            flex: 0.75,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            size={40}
            type={"cog"}
            onPress={() => navigate?.dispatch(CommonActions.navigate({ name: "UpdateProfile" }))}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: theme.colors.secondary,
          paddingHorizontal: 8,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingTop: 8, flex: 2 }}>Pickup Location</Text>
          {myInventory?.address && (
            <Button
              onPress={() => {
                const options: ShowOptions = {
                  end: myInventory?.address,
                }
                openMap(options)
              }}
              title="OPEN IN MAPS"
              titleStyle={{ fontSize: 12 }}
              type="clear"
            />
          )}
        </View>
        <Text style={{ paddingBottom: 8 }}>{myInventory?.address}</Text>
      </View>
      <Button onPress={logout} title="Logout" />
      <View style={{ height: 50 }} />
    </ScrollView>
  )
}

interface ProfileLineProps {
  title: string
  value: string
}

const ProfileLine: React.FC<ProfileLineProps> = (props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text h3>{props.title}</Text>
      <Text>{props.value}</Text>
    </View>
  )
}
