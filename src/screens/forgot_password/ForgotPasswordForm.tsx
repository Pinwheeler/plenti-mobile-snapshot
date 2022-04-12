import { Formik } from "formik"
import React, { useState } from "react"
import { View } from "react-native"
import * as yup from "yup"
import auth from "@react-native-firebase/auth"
import { Button, Text } from "@rneui/themed"
import { TextField } from "../../components/TextField"
import { ReactNativeFirebase } from "@react-native-firebase/app"

export const ForgotPasswordForm: React.FC = () => {
  const [serverError, setServerError] = useState<string>()
  const [emailSent, setEmailSent] = useState<string>()
  const [loading, setLoading] = useState(false)
  const handleSendEmailPressed = (form: { email: string }) => {
    setServerError(undefined)
    setLoading(true)
    auth()
      .sendPasswordResetEmail(form.email)
      .then(() => setEmailSent(form.email))
      .catch((reason: ReactNativeFirebase.NativeFirebaseError) => setServerError(reason.message))
      .finally(() => setLoading(false))
  }

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
              Enter the email you used to create your account and we'll send you an email you can use to reset your
              password.
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
            <Button onPress={handleSubmit} title="Submit" loading={loading} />
          </View>
        )}
      </Formik>
    )
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ paddingBottom: 15, textAlign: "center" }}>Password reset email successfully sent to</Text>
      <Text style={{ marginBottom: 15 }} h4>
        {emailSent}
      </Text>
      <Text style={{ paddingBottom: 15, textAlign: "center" }}>
        Please follow the instructions in the email to reset your password
      </Text>
    </View>
  )
}
