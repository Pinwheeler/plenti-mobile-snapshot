import React, { useState } from "react";
import { RadioButton } from "./RadioButton";

export interface RadioOption<T> {
  value: T;
  label: string;
}

interface Props<T> {
  onSelect: (value: T[]) => void;
  options: RadioOption<T>[];
  multiSelect?: boolean;
  selectedIndices?: number[];
}

export interface IRadioGroupContext {
  selectIndex: (index: number) => void;
  isIndexSelected: (index: number) => boolean;
  unselectIndex: (index: number) => void;
}

export const RadioGroupContext = React.createContext({} as IRadioGroupContext);

export function RadioGroup<T>(props: Props<T>) {
  const { options, onSelect, multiSelect } = props;
  const initialSelectedIndicies = props.selectedIndices ?? [];
  const [selectedIndicies, setSelectedIndicies] = useState<number[]>(
    initialSelectedIndicies
  );

  const handleSelectIndex = (index?: number) => {
    let newSelections: number[] = [];
    if (multiSelect) {
      newSelections = [...selectedIndicies];
    }
    if (index) {
      newSelections.push(index);
    }
    onSelect(newSelections.map((idx) => props.options[idx].value));
    setSelectedIndicies(newSelections);
  };

  const handleUnselectIndex = (index: number) => {
    setSelectedIndicies((oldVal) => {
      const copy = [...oldVal];
      return copy.filter((val) => val !== index);
    });
  };

  const isIndexSelected = (index: number) => selectedIndicies.includes(index);

  const value = {
    selectIndex: handleSelectIndex,
    unselectIndex: handleUnselectIndex,
    isIndexSelected,
  };

  return (
    <RadioGroupContext.Provider value={value}>
      {options.map((option, index) => (
        <RadioButton
          index={index}
          option={option}
          key={`radio-button-${option.label}`}
        />
      ))}
    </RadioGroupContext.Provider>
  );
}
