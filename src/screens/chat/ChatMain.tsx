import { useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { Keyboard, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native"
import { Button, Modal, Portal, TextInput } from "react-native-paper"
import ConnectContext from "src/connect/ConnectContext"
import { ConnectionContext } from "src/conversation/ConnectionContext"
import Theme from "src/lib/Theme"
import DeviceContext from "src/shared/DeviceContext"
import { IconType } from "src/shared/icons/Icon"
import { IconButton } from "src/shared/icons/IconButton"
import ChatContext from "./ChatContext"
import ChatItem from "./ChatItem"

const ChatMain = () => {
  const { messages, sendMessage, refresh, shareLocation } = useContext(ConnectionContext)
  const { shareLocationModalOpen, setShareLocationModalOpen } = useContext(ChatContext)
  const { offendingAccount, setOffendingAccount, reportOffendingAccount } = useContext(ConnectContext)
  const [reportReason, setReportReason] = useState("")
  const { deviceType } = useContext(DeviceContext)
  const [refreshing, setRefreshing] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const navigation = useNavigation()
  let scrollView: ScrollView | undefined

  const send = () => {
    sendMessage(chatMessage)
    setChatMessage("")
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  useEffect(() => {
    scrollView?.scrollToEnd()
  }, [messages])

  const handleKeyboardWillShow = (event) => {
    const keyboardHeight = event.endCoordinates.height
    setKeyboardOffset(keyboardHeight)
  }

  const handleKeyboardWillHide = () => {
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
          ref={(scroll) => (scrollView = scroll)}
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
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        >
          <>
            {messages.map((message) => {
              return <ChatItem message={message} key={message.socketString()} />
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
        <Portal>
          <Modal
            visible={shareLocationModalOpen}
            onDismiss={() => setShareLocationModalOpen(false)}
            contentContainerStyle={{ backgroundColor: Theme.colors.surface, padding: 15, margin: 15 }}
          >
            <Text style={{ textAlign: "center" }}>Are you sure you want to share your pickup location?</Text>
            <View style={{ height: 18 }} />
            <Text style={{ textAlign: "center" }}>You can adjust your pickup location on your profile page</Text>
            <View style={{ height: 18 }} />
            <View>
              <View style={{ flexDirection: "row", alignContent: "space-between" }}>
                <View style={{ width: "40%" }}>
                  <Button mode="outlined" color={Theme.colors.error} onPress={() => setShareLocationModalOpen(false)}>
                    Cancel
                  </Button>
                </View>
                <View style={{ width: "20%" }} />
                <View style={{ width: "40%" }}>
                  <Button
                    mode="contained"
                    onPress={() => {
                      shareLocation(true)
                      setShareLocationModalOpen(false)
                    }}
                  >
                    Confirm
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={offendingAccount !== undefined}
            onDismiss={() => setOffendingAccount(undefined)}
            contentContainerStyle={{ backgroundColor: Theme.colors.surface, padding: 15, margin: 15 }}
          >
            <Text style={{ textAlign: "center" }}>{`Report ${offendingAccount?.username ?? "chat partner"}?`}</Text>
            <View style={{ height: 18 }} />

            <Text style={{ fontStyle: "italic", marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Warning: </Text>After your report you will no longer see content from
              this user, nor will you be able to chat with them.
            </Text>
            <TextInput
              mode="outlined"
              onChangeText={(text) => setReportReason(text)}
              value={reportReason}
              placeholder="Reson for report"
              multiline={true}
            />
            <View style={{ height: 18 }} />
            <View>
              <View style={{ flexDirection: "row", alignContent: "space-between" }}>
                <View style={{ width: "40%" }}>
                  <Button mode="outlined" color={Theme.colors.error} onPress={() => setOffendingAccount(undefined)}>
                    Cancel
                  </Button>
                </View>
                <View style={{ width: "20%" }} />
                <View style={{ width: "40%" }}>
                  <Button
                    mode="contained"
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
          </Modal>
        </Portal>
      </SafeAreaView>
    </>
  )
}

interface InputBarProps {
  onChangeText: (text: string) => void
  onPress: VoidFunction
  value: string
}

const InputBar: React.FC<InputBarProps> = (props) => {
  const { onChangeText, value, onPress } = props
  return (
    <>
      <TextInput
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
        underlineColor="transparent"
        underlineColorAndroid="transparent"
      />
      <IconButton
        type={IconType.play}
        onPress={onPress}
        color={"white"}
        size={24}
        style={{ position: "absolute", right: 0, bottom: 10, backgroundColor: Theme.colors.primary }}
      />
    </>
  )
}

export default ChatMain
