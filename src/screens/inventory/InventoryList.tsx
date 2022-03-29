import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, FAB, Modal, Portal, Text, Title } from "react-native-paper";
import { AccountContext } from "../../contexts/AccountContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import Theme from "../../lib/Theme";

export const InventoryList = () => {
  const { loggedInAccount } = useContext(AccountContext);
  const { myInventory } = useContext(InventoryContext);
  const [locationGateVisible, setLocationGateVisible] = useState(false);
  const [loginGateVisible, setLoginGateVisible] = useState(false);
  const navigation = useNavigation();

  const goToAccount = () => {
    navigation.navigate({ key: "Profile" });
    onClose();
  };

  const onClose = () => {
    setLocationGateVisible(false);
    setLoginGateVisible(false);
  };

  const goToProfile = () => {
    setLocationGateVisible(false);
    setLoginGateVisible(false);
    navigation.navigate({ key: "Profile" });
  };

  const onAdd = () => {
    if (loggedInAccount === undefined) {
      setLoginGateVisible(true);
    } else {
      if (loggedInAccount.pickupAddress) {
        navigation.navigate({ key: "AddInventoryItem" });
      } else {
        setLocationGateVisible(true);
      }
    }
  };

  const Content = () => {
    if (myInventory && myInventory.size > 0) {
      return (
        <ProduceGrid
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {inventoryItems.map((item) => (
            <InventoryItemGridItem inventoryItem={item} key={item.id} />
          ))}
        </ProduceGrid>
      );
    } else {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={{ textAlign: "center", color: Theme.colors.disabled }}>
            ↓↓ No Inventory Items Found. Pull down to Refresh ↓↓
          </Text>
          <Text style={{ textAlign: "center", color: Theme.colors.disabled }}>
            Use the button on this page to add an Inventory Item
          </Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Content />
      <FAB
        icon={IconType.plus}
        onPress={onAdd}
        style={{ position: "absolute", right: 15, bottom: 15 }}
      />
      <Portal>
        <>
          <Modal visible={locationGateVisible} onDismiss={onClose}>
            <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
              <Title>Error</Title>
              <Text style={{ marginVertical: 15, textAlign: "center" }}>
                You must have a Pickup Location (latitude/longitude) set before
                you can add to your inventory.
              </Text>
              <Button
                onPress={goToProfile}
                mode="contained"
                style={{ marginTop: 15 }}
              >
                Set One in the Profile Screen
              </Button>
              <Button
                style={{ marginTop: 20 }}
                onPress={onClose}
                mode="outlined"
              >
                Close
              </Button>
            </View>
          </Modal>
          <Modal visible={loginGateVisible} onDismiss={onClose}>
            <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
              <Title>Error</Title>
              <Text style={{ marginVertical: 15, textAlign: "center" }}>
                You must have an account to add to your Inventory.
              </Text>
              <Button
                onPress={goToAccount}
                mode="contained"
                style={{ marginBottom: 15 }}
              >
                Go To Login
              </Button>
              <Button onPress={onClose} mode="outlined">
                Close
              </Button>
            </View>
          </Modal>
        </>
      </Portal>
    </View>
  );
};
