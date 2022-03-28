import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import Theme from "../../lib/Theme";
import { RadioGroupContext, RadioOption } from "./RadioGroup";

interface Props<T> {
  index: number;
  option: RadioOption<T>;
}

export function RadioButton<T>(props: Props<T>) {
  const { option, index } = props;
  const { selectIndex, unselectIndex, isIndexSelected } =
    useContext(RadioGroupContext);
  const selectedColor = Theme.colors.accent;
  const unselectedColor = Theme.colors.secondaryText;

  const selected = isIndexSelected(index);
  const color = selected ? selectedColor : unselectedColor;

  const handlePress = () => {
    if (selected) {
      unselectIndex(index);
    } else {
      selectIndex(index);
    }
  };

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      onPressOut={handlePress}
    >
      {({ pressed }) => (
        <>
          <View
            style={{
              borderColor: color,
              borderWidth: 1,
              width: 16,
              height: 16,
              borderRadius: 50,
              backgroundColor: pressed ? "#0002" : "#0000",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selected && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: color,
                  borderRadius: 50,
                }}
              />
            )}
          </View>
          <Text style={{ paddingLeft: 4 }}>{option.label}</Text>
        </>
      )}
    </Pressable>
  );
}
