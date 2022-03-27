import { CommonActions, NavigationContext } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Title } from "react-native-paper";
import Theme from "../../lib/Theme";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export const LoginSignupSelector: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useContext(NavigationContext);

  const InnerComponent = () => {
    if (isSigningUp) {
      return <SignupForm />;
    } else {
      return <LoginForm />;
    }
  };

  const title = isSigningUp ? "Sign Up" : "Log In";
  const cta = isSigningUp ? "Already have an account?" : "Need an account?";

  return (
    <>
      <ScrollView>
        <Title style={{ marginBottom: 15, textDecorationLine: "underline" }}>
          {title}
        </Title>
        <InnerComponent />
        <Button
          style={{ marginTop: 15 }}
          color={Theme.colors.accent}
          onPress={() => setIsSigningUp(!isSigningUp)}
        >
          {cta}
        </Button>
        <Button
          style={{ marginTop: 15 }}
          color={Theme.colors.accent}
          onPress={() =>
            navigate?.dispatch(
              CommonActions.navigate({ name: "ForgotPassword" })
            )
          }
        >
          Forgot Password?
        </Button>
        <View style={{ height: 150 }} />
      </ScrollView>
    </>
  );
};
