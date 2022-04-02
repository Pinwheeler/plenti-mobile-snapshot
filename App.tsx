import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { Portal, Provider } from "react-native-paper"
import { ErrorBoundary } from "./src/components/ErrorBoundary"
import { ContextStack } from "./src/contexts/ContextStack"
import Theme from "./src/lib/Theme"
import RootNavigator from "./src/nav/RootNavigator"
import { LoadingScreen } from "./src/screens/LoadingScreen"

export default function App() {
  return (
    <NavigationContainer>
      <Provider theme={Theme}>
        <LoadingScreen loading={false}>
          <ErrorBoundary>
            <ContextStack>
              <Portal.Host>
                <RootNavigator />
              </Portal.Host>
            </ContextStack>
          </ErrorBoundary>
        </LoadingScreen>
      </Provider>
    </NavigationContainer>
  )
}
