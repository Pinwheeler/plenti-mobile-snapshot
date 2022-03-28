import React from "react";

export interface RadioOption<T> {
  value: T;
  label: string;
}

export interface IRadioGroupContext {
  selectIndex: (index: number) => void;
  isIndexSelected: (index: number) => boolean;
  unselectIndex: (index: number) => void;
}

export const RadioGroupContext = React.createContext({} as IRadioGroupContext);
