import { useNavigation } from "@react-navigation/native"
import { Button, Overlay, Text, useTheme } from "@rneui/themed"
import { Formik } from "formik"
import React, { useContext, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import * as yup from "yup"
import { AccountUpdateForm } from "../../api/forms/AccountUpdateForm"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { TextField } from "../../components/TextField"
import { AccountContext } from "../../contexts/AccountContext"
import { GeocodingContext } from "../../contexts/GeocodingContext"
import { InventoryContext } from "../../contexts/InventoryContext"
import { Logger } from "../../lib/Logger"
import { MaxDistanceAdjustor } from "./MaxDistanceAdjustor"
import { PreferredDistanceUnitSelector } from "./PreferredDistanceUnitSelector"
import { UpdateProfilePicture } from "./UpdateProfilePicture"

export const UpdateProfileScreen = () => {
  const { loggedInAccount, updateAccount } = useContext(AccountContext)
  const { myInventory } = useContext(InventoryContext)
  const [pickupAddressEntered, setPickupAddressEntered] = useState(false)
  const [editsMade, setEditsMade] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [geocodeFailModalVisible, setGeocodeFailModalVisible] = useState(false)
  const navigation = useNavigation()
  const { theme } = useTheme()

  const { geocode } = useContext(GeocodingContext)

  if (!loggedInAccount) {
    return <LoadingIndicator thingThatIsLoading="loggedInAccount" />
  }

  const changeLocationDefault: AccountUpdateForm = {
    username: loggedInAccount.username,
    firstname: loggedInAccount.firstname || "",
    pickupAddress: myInventory?.address ?? "",
    latitude: myInventory?.latitude ? `${myInventory.latitude}` : "",
    longitude: myInventory?.longitude ? `${myInventory.longitude}` : "",
    prefersMetric: loggedInAccount.prefersMetric,
    maxDistance: loggedInAccount.maxDistance ?? -1,
  }

  const handleDismiss = () => {
    setSuccessModalVisible(false)
    setGeocodeFailModalVisible(false)
    setLoading(false)
  }

  const submitUpdate = async (form: AccountUpdateForm) => {
    const localForm = { ...form }
    setLoading(true)
    const geocoordinates = localForm.pickupAddress ? await geocode(localForm.pickupAddress) : undefined
    if (geocoordinates) {
      localForm.latitude = geocoordinates.position.coords.latitude.toString()
      localForm.longitude = geocoordinates.position.coords.longitude.toString()
    }
    updateAccount(localForm)
      .then(() => setSuccessModalVisible(true))
      .catch((reason) => {
        setGeocodeFailModalVisible(true)
        Logger.error(reason)
      })
      .finally(() => setEditsMade(false))
  }

  return (
    <>
      <Formik
        onSubmit={submitUpdate}
        initialValues={changeLocationDefault}
        validationSchema={yup.object().shape({
          username: yup.string().required(),
          firstname: yup.string(),
          pickupAddress: yup.string(),
          prefersMetric: yup.bool().required(),
          maxDistance: yup.number(),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ values, handleSubmit }) => (
          <ScrollView style={{ padding: 15 }}>
            <UpdateProfilePicture />
            <TextField
              textContentType="username"
              onChange={() => setEditsMade(true)}
              name="username"
              label="Username"
              style={{ marginBottom: 10 }}
            />
            <TextField
              textContentType="givenName"
              onChange={() => setEditsMade(true)}
              name="firstname"
              label="First Name (optional)"
              style={{ marginBottom: 10 }}
            />
            <TextField
              textContentType="familyName"
              onChange={() => setEditsMade(true)}
              name="pickupAddress"
              label="Pickup Address"
              style={{ marginBottom: 15 }}
              onFocus={() => setPickupAddressEntered(true)}
              multiline
            />
            {pickupAddressEntered && (
              <View>
                <Text style={{ marginBottom: 15, fontWeight: "bold" }}>
                  Plenti would like to remind you to be safe and not give out your home address.
                </Text>
                <Text style={{ fontWeight: "bold", marginBottom: 30 }}>
                  Consider instead using a nearby parking lot or public space.
                </Text>
              </View>
            )}

            <View style={{ marginBottom: 15 }}>
              <Text h3>Distance Unit</Text>
              <PreferredDistanceUnitSelector onChange={() => setEditsMade(true)} />
            </View>
            <MaxDistanceAdjustor prefersMetric={values.prefersMetric ?? true} onChange={() => setEditsMade(true)} />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button disabled={!editsMade} buttonStyle={{ marginBottom: 20 }} onPress={handleSubmit} title="Submit" />
            )}
            <View style={{ height: 40 }} />
          </ScrollView>
        )}
      </Formik>
      <Overlay
        isVisible={successModalVisible}
        onBackdropPress={handleDismiss}
        style={{ backgroundColor: theme.colors.background, padding: 15, margin: 15 }}
      >
        <Text
          h2
          style={{
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          Update Successful
        </Text>
        <Button
          onPress={() => {
            handleDismiss()
            navigation.goBack()
          }}
          title="Okay"
        />
      </Overlay>
      <Overlay
        isVisible={geocodeFailModalVisible}
        onBackdropPress={handleDismiss}
        style={{
          backgroundColor: theme.colors.background,
          padding: 15,
          margin: 15,
        }}
      >
        <Text
          h2
          style={{
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          Update Failed
        </Text>
        <Text
          style={{
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          We couldn't validate that the input address resulted in a physical location. Please check your address and try
          again. You can also try being more generic. Just a city/state should do.
        </Text>
        <Button title="Okay" onPress={handleDismiss} />
      </Overlay>
    </>
  )
}

UpdateProfileScreen.navigationOptions = {
  title: "Change Pickup Address",
}
