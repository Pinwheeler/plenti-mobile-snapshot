import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import * as Location from "expo-location"
import React from "react"

import { ErrorBoundary } from "./src/components/ErrorBoundary"
import { ContextStack } from "./src/contexts/ContextStack"
import Theme from "./src/lib/Theme"
import RootNavigator from "./src/nav/RootNavigator"

Location.installWebGeolocationPolyfill()

export default function App() {
  return (
    <NavigationContainer>
      <ErrorBoundary>
        <ContextStack>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </ContextStack>
      </ErrorBoundary>
    </NavigationContainer>
  )
}
