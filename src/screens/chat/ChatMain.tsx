import { useNavigation } from "@react-navigation/native"
import { Overlay } from "@rneui/base"
import { Button, Input } from "@rneui/themed"
import React, { useContext, useEffect, useState } from "react"
import { Keyboard, KeyboardEventListener, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native"
import { IconButton } from "../../components/IconButton"
import { ChatContext } from "../../contexts/ChatContext"
import { DeviceContext } from "../../contexts/DeviceContext"
import Theme from "../../lib/Theme"

import ChatItem from "./ChatItem"
import { ConversationContext } from "./ConversationContext"

const ChatMain = () => {
  const {
    shareLocation,
    setShareLocationOpen,
    shareLocationOpen,
    offendingAccount,
    setOffendingAccount,
    reportOffendingAccount,
  } = useContext(ConversationContext)
  const { messages, sendMessage } = useContext(ConversationContext)
  const [reportReason, setReportReason] = useState("")
  const { deviceType } = useContext(DeviceContext)
  const [chatMessage, setChatMessage] = useState("")
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const navigation = useNavigation()
  let scrollView: ScrollView | undefined

  const send = () => {
    sendMessage(chatMessage)
    setChatMessage("")
  }

  // const onRefresh = async () => {
  //   setRefreshing(true)
  //   await refresh()
  //   setRefreshing(false)
  // }

  useEffect(() => {
    scrollView?.scrollToEnd()
  }, [messages])

  const handleKeyboardWillShow: KeyboardEventListener = (event) => {
    const keyboardHeight = event.endCoordinates.height
    setKeyboardOffset(keyboardHeight)
  }

  const handleKeyboardWillHide: KeyboardEventListener = () => {
    setKeyboardOffset(0)
  }

  if (deviceType === "iOS") {
    useEffect(() => {
      const keyboardWillShowSub = Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow)
      const keyboardWillHideSub = Keyboard.addListener("keyboardWillHide", handleKeyboardWillHide)

      return () => {
        keyboardWillShowSub.remove()
        keyboardWillHideSub.remove()
      }
    })
  }

  const textAreaStyle = {
    backgroundColor: "white",
    marginHorizontal: 5,
    borderColor: "transparent",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 10,
          marginHorizontal: 5,
          marginTop: 5,
          backgroundColor: Theme.colors.background,
        }}
      >
        <ScrollView
          style={{
            ...textAreaStyle,
            marginTop: 10,
            padding: 10,
            borderTopWidth: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            flex: 9,
            backgroundColor: Theme.colors.background,
          }}
        >
          <>
            {Array.from(messages.entries()).map(([isoKey, message]) => {
              return <ChatItem message={message} key={`message_from_${isoKey}`} />
            })}
          </>
        </ScrollView>
        <View
          style={{
            ...textAreaStyle,
            borderBottomWidth: 1,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingHorizontal: 5,
            marginBottom: keyboardOffset,
            flex: 0.03,
            minHeight: 70,
            backgroundColor: Theme.colors.background,
          }}
        >
          <InputBar onChangeText={setChatMessage} value={chatMessage} onPress={send} />
        </View>
        <Overlay
          isVisible={shareLocationOpen}
          onBackdropPress={() => setShareLocationOpen(false)}
          style={{ backgroundColor: Theme.colors.surface, padding: 15, margin: 15 }}
        >
          <Text style={{ textAlign: "center" }}>Are you sure you want to share your pickup location?</Text>
          <View style={{ height: 18 }} />
          <Text style={{ textAlign: "center" }}>You can adjust your pickup location on your profile page</Text>
          <View style={{ height: 18 }} />
          <View>
            <View style={{ flexDirection: "row", alignContent: "space-between" }}>
              <View style={{ width: "40%" }}>
                <Button onPress={() => setShareLocationOpen(false)}>
                  {/**color={Theme.colors.error} */}
                  Cancel
                </Button>
              </View>
              <View style={{ width: "20%" }} />
              <View style={{ width: "40%" }}>
                <Button
                  onPress={() => {
                    shareLocation(true)
                    setShareLocationOpen(false)
                  }}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </View>
        </Overlay>
        <Overlay
          isVisible={offendingAccount !== undefined}
          onBackdropPress={() => setOffendingAccount(undefined)}
          style={{ backgroundColor: Theme.colors.surface, padding: 15, margin: 15 }}
        >
          <Text style={{ textAlign: "center" }}>{`Report ${offendingAccount?.username ?? "chat partner"}?`}</Text>
          <View style={{ height: 18 }} />

          <Text style={{ fontStyle: "italic", marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Warning: </Text>After your report you will no longer see content from
            this user, nor will you be able to chat with them.
          </Text>
          <Input
            onChangeText={(text) => setReportReason(text)}
            value={reportReason}
            placeholder="Reson for report"
            multiline={true}
          />
          <View style={{ height: 18 }} />
          <View>
            <View style={{ flexDirection: "row", alignContent: "space-between" }}>
              <View style={{ width: "40%" }}>
                <Button onPress={() => setOffendingAccount(undefined)}>
                  {/**color={Theme.colors.error}  */}
                  Cancel
                </Button>
              </View>
              <View style={{ width: "20%" }} />
              <View style={{ width: "40%" }}>
                <Button
                  onPress={() => {
                    reportOffendingAccount(reportReason)
                    setOffendingAccount(undefined)
                    setReportReason("")
                    navigation.goBack()
                  }}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </View>
        </Overlay>
      </SafeAreaView>
    </>
  )
}

interface InputBarProps {
  onChangeText: (text: string) => void
  onPress(): void
  value: string
}

const InputBar: React.FC<InputBarProps> = (props) => {
  const { onChangeText, value, onPress } = props
  return (
    <>
      <Input
        style={{
          position: "absolute",
          bottom: 0,
          left: 8,
          right: 58,
          backgroundColor: Theme.colors.background,
          borderBottomWidth: 0,
        }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder="Type chat message here..."
        multiline={true}
        underlineColorAndroid="transparent"
      />
      <IconButton
        type={"play"}
        onPress={onPress}
        color={"white"}
        size={24}
        style={{ position: "absolute", right: 0, bottom: 10, backgroundColor: Theme.colors.primary }}
      />
    </>
  )
}

export default ChatMain
