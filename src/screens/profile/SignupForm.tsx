import { ReactNativeFirebase } from "@react-native-firebase/app"
import { Button, useTheme } from "@rneui/themed"
import { Formik } from "formik"
import React, { useContext, useState } from "react"
import { ActivityIndicator, View } from "react-native"

import * as yup from "yup"
import { AccountSignupForm } from "../../api/forms/AccountSignupForm"
import { TextField } from "../../components/TextField"
import { AuthContext } from "../../contexts/AuthContext"
import { Logger } from "../../lib/Logger"

const SignupForm: React.FC = () => {
  const { signup } = useContext(AuthContext)
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState<string | undefined>(undefined)
  const [emailError, setEmailError] = useState<string | undefined>(undefined)

  const signupFormDefaults: AccountSignupForm = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  }

  const clearErrors = () => {
    setUsernameError(undefined)
    setEmailError(undefined)
  }

  const signupFormSubmit = (value: AccountSignupForm) => {
    clearErrors()
    setLoading(true)
    signup(value)
      .catch((error) => {
        setNetworkErrors(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const setNetworkErrors = (error: ReactNativeFirebase.NativeFirebaseError) => {
    switch (error.code) {
      default:
        Logger.warn("Signup error not handled")
        Logger.error(error)
    }
  }

  return (
    <Formik
      onSubmit={signupFormSubmit}
      initialValues={signupFormDefaults}
      validationSchema={yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirm: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords don't match")
          .required("Confirm Password is required"),
      })}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ handleSubmit, isValid }) => (
        <>
          <TextField textContentType="username" label="Username" name="username" error={usernameError} />
          <View style={{ height: 15 }} />
          <TextField
            textContentType="emailAddress"
            label="Email"
            name="email"
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={{ height: 15 }} />
          <TextField
            textContentType="password"
            label="Password"
            name="password"
            secureTextEntry={true}
            blurOnSubmit={false}
          />
          <View style={{ height: 15 }} />
          <TextField label="Confirm Password" name="confirm" secureTextEntry={true} blurOnSubmit={false} />
          <View style={{ height: 15 }} />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              style={{ backgroundColor: theme.colors.secondary, marginTop: 15 }}
              onPress={() => {
                handleSubmit()
              }}
              title="Sign Up"
            />
          )}
        </>
      )}
    </Formik>
  )
}

export default SignupForm
