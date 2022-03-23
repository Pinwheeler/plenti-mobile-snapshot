import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ErrorBoundary } from "./src/components/misc/ErrorBoundary";
import { ContextStack } from "./src/contexts/ContextStack";
import { LoadingScreen } from "./src/screens/LoadingScreen";

export default function App() {
  return (
    <NavigationContainer>
      <LoadingScreen loading={true}>
        <ErrorBoundary>
          <ContextStack></ContextStack>
        </ErrorBoundary>
      </LoadingScreen>
    </NavigationContainer>
  );
}
