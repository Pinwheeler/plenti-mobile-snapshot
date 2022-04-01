import * as ImagePicker from "expo-image-picker"
import React from "react"
import { Image, Pressable, Text, View } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { PlentiItem } from "../../../assets/PlentiItemsIndex"
import Theme from "../../../lib/Theme"
import { Icon } from "../../Icon"

interface Props {
  userImageUri?: string
  imageSize: number
  plentiItem: PlentiItem
  onLocalImageSelect(imageUri?: string): void
}

export const ProduceImageSelector: React.FC<Props> = (props) => {
  const { userImageUri, imageSize, plentiItem, onLocalImageSelect } = props

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      onLocalImageSelect(result.uri)
    }
  }

  if (userImageUri) {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: 10,
            marginVertical: 15,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Image
            source={{ uri: userImageUri }}
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: 10,
              borderWidth: 4,
              borderColor: Theme.colors.accent,
            }}
          />
          <Pressable
            onPress={() => onLocalImageSelect(undefined)}
            style={{
              backgroundColor: Theme.colors.accent,
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Icon type="times-circle" color="white" size={24} />
          </Pressable>
        </View>
      </View>
    )
  } else {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 15 }}>
        <Image
          source={plentiItem.localImage}
          style={{ width: imageSize, height: imageSize, borderRadius: 10 }}
          resizeMode="cover"
        />
        <TouchableRipple
          onPress={selectImage}
          style={{ width: imageSize, height: imageSize, alignItems: "center", justifyContent: "center" }}
        >
          <>
            <View
              style={{
                backgroundColor: Theme.colors.notification,
                width: "55%",
                height: "55%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                marginBottom: 10,
              }}
            >
              <Icon color="white" size={32} type="camera" />
            </View>
            <Text>Add Photo</Text>
            <Text>(Optional)</Text>
          </>
        </TouchableRipple>
      </View>
    )
  }
}
