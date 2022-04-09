import { CommonActions, NavigationContext } from "@react-navigation/native"
import { Button, Text } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { ScrollView, View } from "react-native"
import Theme from "../../lib/Theme"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export const LoginSignupSelector: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false)
  const navigate = useContext(NavigationContext)

  const InnerComponent = () => {
    if (isSigningUp) {
      return <SignupForm />
    } else {
      return <LoginForm />
    }
  }

  const title = isSigningUp ? "Sign Up" : "Log In"
  const cta = isSigningUp ? "Already have an account?" : "Need an account?"

  return (
    <>
      <ScrollView>
        <Text h1 style={{ marginBottom: 15, textDecorationLine: "underline" }}>
          {title}
        </Text>
        <InnerComponent />
        <Button style={{ marginTop: 15 }} onPress={() => setIsSigningUp(!isSigningUp)}>
          {/**color={Theme.colors.accent} */}
          {cta}
        </Button>
        <Button
          style={{ marginTop: 15 }}
          onPress={() => navigate?.dispatch(CommonActions.navigate({ name: "ForgotPassword" }))}
        >
          {/**color={Theme.colors.accent} */}
          Forgot Password?
        </Button>
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  )
}
