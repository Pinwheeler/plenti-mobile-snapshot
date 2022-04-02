import React, { useContext, useState } from "react"
import { Text, View } from "react-native"
import { Button, Title } from "react-native-paper"
import { InventoryContext } from "../../contexts/InventoryContext"

const WantStatusModal: React.FC = () => {
  const { addWatcher, removeWatcher } = useContext(InventoryContext)
  const [detailText, setDetailText] = useState("")
  const [isSuccessful, setIsSuccessful] = useState(false)

  promise.then((request) => {
    if (request.matches.length > 0) {
      setTitleText("Success!")
      setIsSuccessful(true)
    } else {
      setTitleText("Sorry")
    }

    setDetailText(`${request.matches.length} users have the ${request.plentiItem.displayName} you want.`)
  })

  return (
    <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
      <Title style={{ marginBottom: 15, textDecorationLine: "underline" }}>{titleText}</Title>
      <Text style={{ paddingBottom: 30 }}>{detailText}</Text>
      {isSuccessful ? (
        <Button mode="contained" onPress={goToWants}>
          Take Me There
        </Button>
      ) : (
        <Button style={{ marginTop: 20 }} mode="outlined" onPress={clearRequest}>
          Close
        </Button>
      )}
    </View>
  )
}

export default WantStatusModal
