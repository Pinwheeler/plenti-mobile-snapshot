import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import React, { useContext, useState } from "react"
import { Text, View } from "react-native"
import * as yup from "yup"
import auth from "@react-native-firebase/auth"
import { Button, useTheme } from "@rneui/themed"
import { TextField } from "../../components/TextField"

export const ForgotPasswordForm: React.FC = () => {
  const [serverError, setServerError] = useState<string>()
  const [emailSent, setEmailSent] = useState<string>()
  const [loadig, setLoading] = useState(false)
  const navigation = useNavigation()
  const { theme } = useTheme()
  const handleSendEmailPressed = (form: { email: string }) => {
    setServerError(undefined)
    setLoading(true)
    auth()
      .sendPasswordResetEmail(form.email)
      .then(() => setEmailSent(form.email))
      .catch((reason) => setServerError(reason))
      .finally(() => setLoading(false))
  }
  const handleSubmitReset = (form: { code: string; newPassword: string; newPasswordConfirm: string }) => {}

  if (!emailSent) {
    return (
      <Formik
        onSubmit={handleSendEmailPressed}
        initialValues={{ email: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
        })}
      >
        {({ handleSubmit }) => (
          <View style={{ padding: 15 }}>
            <Text style={{ paddingBottom: 15 }}>
              Enter the email you used to create your account and we'll send you a code you can use to reset your
              password on the app.
            </Text>
            <TextField
              textContentType="emailAddress"
              name="email"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={serverError}
            />
            <View style={{ height: 15 }} />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    )
  }

  return (
    <Formik
      onSubmit={handleSubmitReset}
      initialValues={{ code: "", newPassword: "", newPasswordConfirm: "" }}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      validationSchema={yup.object().shape({
        code: yup.string().required(),
        newPassword: yup.string().required(),
        newPasswordConfirm: yup.string().required(),
      })}
    >
      {({ handleSubmit }) => (
        <View style={{ padding: 15 }}>
          <Text style={{ paddingBottom: 15 }}>{`Enter the code sent to\n ${emailSent}`}</Text>
          <TextField name="code" label="Code" autoCapitalize="none" error={serverError} />
          <View style={{ height: 15 }} />
          <TextField
            textContentType="password"
            label="New Password"
            name="newPassword"
            secureTextEntry={true}
            blurOnSubmit={false}
          />
          <View style={{ height: 15 }} />
          <TextField label="Confirm Password" name="newPasswordConfirm" secureTextEntry={true} blurOnSubmit={false} />
          <View style={{ height: 15 }} />
          <Button onPress={handleSubmit} title="Reset Password" />
        </View>
      )}
    </Formik>
  )
}
