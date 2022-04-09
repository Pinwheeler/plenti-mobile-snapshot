import { CommonActions, NavigationContext } from "@react-navigation/native"
import { Button, Text, useTheme } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { ScrollView, View } from "react-native"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export const LoginSignupSelector: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false)
  const navigate = useContext(NavigationContext)
  const { theme } = useTheme()

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
        <Button
          title={cta}
          style={{ marginTop: 15, backgroundColor: theme.colors.secondary }}
          onPress={() => setIsSigningUp(!isSigningUp)}
        />
        <Button
          title="Forgot Password?"
          style={{ marginTop: 15, backgroundColor: theme.colors.secondary }}
          onPress={() => navigate?.dispatch(CommonActions.navigate({ name: "ForgotPassword" }))}
        />
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  )
}
