import React, { useState } from "react"
import { Text, View } from "react-native"
import { Button, Title } from "react-native-paper"
import { PlentiRequestEntity } from "../../api/models/PlentiRequest"

interface Props {
  promise: Promise<PlentiRequestEntity>
  clearRequest: () => void
  goToWants: () => void
}

const WantStatusModal: React.FC<Props> = (props) => {
  const { promise, clearRequest, goToWants } = props
  const [titleText, setTitleText] = useState("Searching...")
  const [detailText, setDetailText] = useState("")
  const [isSuccessful, setIsSuccessful] = useState(false)

  if (promise === undefined) {
    return null // this should only happen when the modal isn't rendered
  }

  promise.then((request) => {
    if (request.matches.length > 0) {
      setTitleText("Success!")
      setIsSuccessful(true)
    } else {
      setTitleText("Sorry")
    }

    setDetailText(`${request.matches.length} users have the ${request.plentiItemName} you want.`)
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
