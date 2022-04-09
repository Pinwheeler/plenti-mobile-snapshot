import { Button, Text } from "@rneui/themed"
import React from "react"

import { View } from "react-native"
import { LoggedInAccountEntity } from "../api/models/LoggedInAccount"

interface Props {
  onClose(): void
  goToAccount(): void
  account?: LoggedInAccountEntity
}

const LoggedInGate: React.FC<Props> = (props) => {
  const { onClose, goToAccount, account } = props

  if (account !== undefined) {
    return <>{props.children}</>
  }

  return (
    <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
      <Text h1>Error</Text>
      <Text style={{ marginVertical: 20, textAlign: "center" }}>You have to log in before you can do this</Text>
      <Button onPress={goToAccount} title="Go To Login" />
      <Button onPress={onClose} style={{ marginTop: 20 }} title="Close" />
    </View>
  )
}

export default LoggedInGate
