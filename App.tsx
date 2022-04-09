import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import * as Location from "expo-location"
import React from "react"

import { ErrorBoundary } from "./src/components/ErrorBoundary"
import { ContextStack } from "./src/contexts/ContextStack"
import RootNavigator from "./src/nav/RootNavigator"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { myTheme } from "./src/lib/Theme"

Location.installWebGeolocationPolyfill()

export default function App() {
  return (
    <NavigationContainer>
      <ErrorBoundary>
        <ContextStack>
          <ThemeProvider theme={myTheme}>
            <SafeAreaProvider>
              <RootNavigator />
            </SafeAreaProvider>
          </ThemeProvider>
        </ContextStack>
      </ErrorBoundary>
    </NavigationContainer>
  )
}
