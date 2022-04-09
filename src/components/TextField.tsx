import { Input } from "@rneui/themed"
import { useFormikContext } from "formik"
import React, { useRef } from "react"
import { TextInputProps } from "react-native"

interface Props extends TextInputProps {
  label: string
  name: string
  error?: string
  selectionColor?: string
}

export const TextField: React.FC<Props> = (props) => {
  const { values, setFieldValue, errors } = useFormikContext<any>()
  const { name, error, label, ...otherProps } = props
  const formikError = errors[name]
  const value = values[name]
  const errorText: string | undefined = formikError ? (formikError as string) : error
  const ref = useRef<typeof Input>()
  return (
    <>
      <Input
        shake={() => {}}
        {...otherProps}
        onChangeText={(text) => setFieldValue(name, text)}
        value={value}
        errorMessage={errorText}
        label={label}
      />
    </>
  )
}
