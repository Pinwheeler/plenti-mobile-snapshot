import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { AccountLoginForm } from "../../api/forms/AccountLoginForm";
import { TextField } from "../../components/TextField";
import { AuthContext } from "../../contexts/AuthContext";
import Theme from "../../lib/Theme";

const LoginForm: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const loginFormDefaults: AccountLoginForm = {
    email: "",
    password: "",
  };

  const clearErrors = () => {
    setEmailError(undefined);
    setPasswordError(undefined);
  };

  const loginFormSubmit = (value: AccountLoginForm) => {
    clearErrors();
    setLoading(true);
    login(value).catch((error) => {
      setNetworkErrors(error);
      setLoading(false);
    });
  };

  const setNetworkErrors = (error: any) => {
    console.error("setNetworkErrors not yet implemented", error);
    // switch (error.response.status) {
    //   case 404:
    //     setEmailError("Email not found");
    //     break;
    //   case 401:
    //     setPasswordError("Incorrect password");
    //     break;
    // }
  };

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
              style={{ backgroundColor: Theme.colors.accent, marginTop: 15 }}
              mode="contained"
              onPress={() => {
                handleSubmit();
              }}
            >
              Login
            </Button>
          )}
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
