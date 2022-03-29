import React from "react"
import { Text, Button, Title } from "react-native-paper"
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
      <Title>Error</Title>
      <Text style={{ marginVertical: 20, textAlign: "center" }}>You have to log in before you can do this</Text>
      <Button onPress={goToAccount} mode="contained">
        Go To Login
      </Button>
      <Button onPress={onClose} mode="outlined" style={{ marginTop: 20 }}>
        Close
      </Button>
    </View>
  )
}

export default LoggedInGate
