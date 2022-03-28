import { useField } from "formik";
import React from "react";
import { RadioGroup } from "../../components/radio/RadioGroup";
import { RadioOption } from "../../components/radio/RadioGroupContext";

interface Props {
  onChange: () => void;
}

export const PreferredDistanceUnitSelector: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [field, meta, helpers] = useField("prefersMetric");

  const options: RadioOption<string>[] = [
    { value: "kilometers", label: "kilometers" },
    { value: "miles", label: "miles" },
  ];

  const initialSelectedIndex = field.value ? 0 : 1;

  const handleSelect = (selectedOptions: string[]) => {
    onChange();
    if (selectedOptions.includes("kilometers")) {
      helpers.setValue(true);
    } else {
      helpers.setValue(false);
    }
  };

  return (
    <RadioGroup
      options={options}
      onSelect={handleSelect}
      selectedIndices={[initialSelectedIndex]}
    />
  );
};
