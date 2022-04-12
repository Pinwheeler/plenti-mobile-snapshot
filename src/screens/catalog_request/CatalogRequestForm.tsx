import { NavigationContext, useNavigation } from "@react-navigation/native"
import { Button, useTheme } from "@rneui/themed"
import { Formik } from "formik"
import React, { useContext, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import * as Yup from "yup"
import { CreateCatalogRequestForm } from "../../api/forms/CatalogRequestForm"
import { TextField } from "../../components/TextField"
import { CatalogRequestContext } from "./CatalogRequestContext"

const CatalogRequestForm = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { submitCatalogRequest } = useContext(CatalogRequestContext)
  const [loading, setLoading] = useState(false)

  const submitRequestFormDefaults: CreateCatalogRequestForm = {
    itemName: "",
    itemDescription: "",
  }

  const submitForm = (form: CreateCatalogRequestForm) => {
    setLoading(true)
    submitCatalogRequest(form)
      .then(() => {
        navigation.goBack()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required(),
    itemDescription: Yup.string().required(),
  })

  return (
    <View style={{ padding: 15 }}>
      <Formik
        onSubmit={submitForm}
        initialValues={submitRequestFormDefaults}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ handleSubmit }) => (
          <>
            <TextField name="itemName" label="Item Name" autoCapitalize="words" />
            <View style={{ height: 15 }} />
            <TextField name="itemDescription" label="Item Description" autoCapitalize="none" />
            <View style={{ height: 15 }} />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                style={{ backgroundColor: theme.colors.secondary }}
                onPress={() => {
                  handleSubmit()
                }}
                title="Submit"
              />
            )}
          </>
        )}
      </Formik>
    </View>
  )
}

export default CatalogRequestForm
