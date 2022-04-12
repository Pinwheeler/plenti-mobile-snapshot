import React from "react"
import { ScrollView } from "react-native"
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { PremiumAdCopy } from "./PremiumAdCopy"

export const StorePageNotLoggedIn = () => {
  const navigation = useNavigation()

  const navigateToAccount = () => {
    navigation.navigate("Profile")
  }

  return (
    <ScrollView style={{ padding: 15 }}>
      <PremiumAdCopy />
      <Button mode="contained" style={{ width: "100%", marginTop: 60 }} onPress={navigateToAccount}>
        Log In to Sign Up Now
      </Button>
    </ScrollView>
  )
}
