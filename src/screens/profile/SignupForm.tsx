import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import * as yup from "yup";
import { AccountSignupForm } from "../../api/forms";
import { TextField } from "../../components/TextField";
import { AuthContext } from "../../contexts/AuthContext";
import Theme from "../../lib/Theme";

const SignupForm: React.FC = () => {
  const { signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined
  );
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const signupFormDefaults: AccountSignupForm = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  const clearErrors = () => {
    setUsernameError(undefined);
    setEmailError(undefined);
  };

  const signupFormSubmit = (value: AccountSignupForm) => {
    clearErrors();
    setLoading(true);
    signup(value)
      .catch((error) => {
        setNetworkErrors(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setNetworkErrors = (error: any) => {
    console.error("setNetworkErrors not yet implemented", error);
    // switch (error.response.status) {
    //   case 409:
    //     setEmailError("Email already in use");
    //     break;
    // }
  };

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
          <TextField
            textContentType="username"
            label="Username"
            name="username"
            error={usernameError}
          />
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
          <TextField
            label="Confirm Password"
            name="confirm"
            secureTextEntry={true}
            blurOnSubmit={false}
          />
          <View style={{ height: 15 }} />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              style={{ backgroundColor: Theme.colors.accent, marginTop: 15 }}
              mode="contained"
              onPress={() => {
                handleSubmit();
              }}
            >
              Sign Up
            </Button>
          )}
        </>
      )}
    </Formik>
  );
};

export default SignupForm;
