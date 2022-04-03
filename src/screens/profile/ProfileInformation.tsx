import { CommonActions, NavigationContext } from "@react-navigation/native"
import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import openMap, { ShowOptions } from "react-native-open-maps"
import { Button, Text } from "react-native-paper"
import { IconButton } from "../../components/IconButton"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { H3 } from "../../components/typography"
import { AccountContext } from "../../contexts/AccountContext"
import { AuthContext } from "../../contexts/AuthContext"
import Theme from "../../lib/Theme"
import { ProfilePicture } from "./ProfilePicture"

export const ProfileInformation: React.FC = () => {
  const { logout } = useContext(AuthContext)
  const { loggedInAccount } = useContext(AccountContext)
  const navigate = useContext(NavigationContext)

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
          backgroundColor: Theme.colors.accent,
          paddingHorizontal: 8,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingTop: 8, flex: 2 }}>Pickup Location</Text>
          <Button
            onPress={() => {
              const options: ShowOptions = {
                end: loggedInAccount.pickupLocation?.address,
              }
              openMap(options)
            }}
          >
            OPEN IN MAPS
          </Button>
        </View>
        <Text style={{ paddingBottom: 8 }}>{loggedInAccount.pickupLocation?.address}</Text>
      </View>
      <Button onPress={logout}>Logout</Button>
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
      <H3>{props.title}</H3>
      <Text>{props.value}</Text>
    </View>
  )
}
