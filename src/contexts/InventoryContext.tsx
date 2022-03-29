import crashlytics from "@react-native-firebase/crashlytics";
import database from "@react-native-firebase/database";
import React, { useContext, useEffect, useState } from "react";
import {
  InventoryItemEntity,
  InventoryItemModel,
} from "../api/models/InventoryItem";
import { PlentiItemEntity } from "../api/models/PlentiItem";
import { Quantity } from "../api/models/Quantity";
import { AccountContext } from "./AccountContext";

interface IInventoryContext {
  myInventory: Map<string, InventoryItemEntity>;
  addItem(item: PlentiItemEntity, quantity: Quantity): void;
  deleteItem(item: InventoryItemEntity): void;
}

export const InventoryContext = React.createContext<IInventoryContext>(
  {} as IInventoryContext
);

export const InventoryProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext);
  const [myInventory, setMyInventory] = useState(
    new Map<string, InventoryItemEntity>()
  );

  useEffect(() => {
    if (loggedInAccount !== undefined) {
      const path = `/inventories/${loggedInAccount.id}`;
      const onInventoryChange = database()
        .ref(path)
        .on("value", (snapshot) => {
          const val = snapshot.val() as { [key: string]: InventoryItemModel };
          const result: Map<string, InventoryItemEntity> = new Map();
          for (const key in val) {
            const model = val[key];
            result.set(key, new InventoryItemEntity(model));
          }
          setMyInventory(result);
        });

      return () => database().ref(path).off("value", onInventoryChange);
    }
  }, [loggedInAccount]);

  const addItem = (item: PlentiItemEntity, quantity: Quantity) => {
    if (loggedInAccount) {
      const model = InventoryItemEntity.modelFromUI(item, quantity);
      database()
        .ref(`/inventories/${loggedInAccount.id}/${model.id}`)
        .push(model);
    } else {
      crashlytics().log(
        "Call to addItem made without a logged in account. Something is fishy"
      );
    }
  };

  const deleteItem = (item: InventoryItemEntity) => {
    if (loggedInAccount) {
      database().ref(`/inventories/${loggedInAccount.id}/${item.id}`).remove();
    } else {
      crashlytics().log(
        "Call to deleteItem made without a logged in account. Something is fishy"
      );
    }
  };

  const value = {
    myInventory,
    addItem,
    deleteItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {props.children}
    </InventoryContext.Provider>
  );
};
