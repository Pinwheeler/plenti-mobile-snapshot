import { useTheme } from "@rneui/themed"
import React from "react"
import { Image, Pressable, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { launchImageLibrary } from "react-native-image-picker"
import { PlentiItem } from "../../../assets/PlentiItemsIndex"
import { Icon } from "../../Icon"

interface Props {
  userImageUri?: string
  imageSize: number
  plentiItem: PlentiItem
  onLocalImageSelect(imageUri?: string): void
}

export const ProduceImageSelector: React.FC<Props> = (props) => {
  const { userImageUri, imageSize, plentiItem, onLocalImageSelect } = props
  const { theme } = useTheme()

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibrary({
      mediaType: "photo",
    })

    if (!result.didCancel) {
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0]
        if (asset.uri) {
          onLocalImageSelect(asset.uri)
        }
      }
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
              borderColor: theme.colors.secondary,
            }}
          />
          <Pressable
            onPress={() => onLocalImageSelect(undefined)}
            style={{
              backgroundColor: theme.colors.secondary,
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
        <TouchableOpacity
          onPress={selectImage}
          style={{ width: imageSize, height: imageSize, alignItems: "center", justifyContent: "center" }}
        >
          <>
            <View
              style={{
                backgroundColor: theme.colors.success,
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
        </TouchableOpacity>
      </View>
    )
  }
}
