import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-paper";
import Theme from "../lib/Theme";

interface Props extends Omit<TextInputProps, "selectionColor"> {
  label: string;
  name: string;
  error?: string;
  selectionColor?: string;
}

export const TextField: React.FC<Props> = (props) => {
  const { values, setFieldValue, errors } = useFormikContext<any>();
  const { name, error, label, ...passedProps } = props;
  const formikError = errors[name];
  const value = values[name];
  const errorText: string | undefined = formikError
    ? (formikError as string)
    : error;
  const hasError = errorText !== undefined;
  const ref = useRef<typeof TextInput>();
  return (
    <>
      <TextInput
        {...passedProps}
        onChangeText={(text) => setFieldValue(name, text)}
        value={value}
        label={hasError ? errorText : label}
        error={hasError}
        mode="outlined"
        theme={Theme}
      />
    </>
  );
};
