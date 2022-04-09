import { ReactNativeFirebase } from "@react-native-firebase/app"
import { Button, useTheme } from "@rneui/themed"
import { Formik } from "formik"
import React, { useContext, useState } from "react"
import { ActivityIndicator, View } from "react-native"

import { AccountLoginForm } from "../../api/forms/AccountLoginForm"
import { TextField } from "../../components/TextField"
import { AuthContext } from "../../contexts/AuthContext"
import { Logger } from "../../lib/Logger"

const LoginForm: React.FC = () => {
  const { login } = useContext(AuthContext)
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState<string | undefined>(undefined)
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined)
  const loginFormDefaults: AccountLoginForm = {
    email: "",
    password: "",
  }

  const clearErrors = () => {
    setEmailError(undefined)
    setPasswordError(undefined)
  }

  const loginFormSubmit = (value: AccountLoginForm) => {
    clearErrors()
    setLoading(true)
    login(value).catch((error) => {
      setNetworkErrors(error)
      setLoading(false)
    })
  }

  const setNetworkErrors = (error: ReactNativeFirebase.NativeFirebaseError) => {
    switch (error.code) {
      case "auth/user-not-found":
        setEmailError("Email not found")
        break
      default:
        Logger.warn("Login error not handled")
        Logger.error(error)
    }
  }

  return (
    <Formik
      onSubmit={loginFormSubmit}
      initialValues={loginFormDefaults}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ handleSubmit }) => (
        <>
          <TextField
            textContentType="emailAddress"
            name="email"
            label="Email"
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={{ height: 15 }} />
          <TextField
            textContentType="password"
            name="password"
            label="Password"
            error={passwordError}
            secureTextEntry={true}
          />
          <View style={{ height: 15 }} />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              style={{ backgroundColor: theme.colors.secondary, marginTop: 15 }}
              onPress={() => {
                handleSubmit()
              }}
              title="Login"
            />
          )}
        </>
      )}
    </Formik>
  )
}

export default LoginForm
