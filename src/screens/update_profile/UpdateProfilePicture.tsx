import { Text } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { launchImageLibrary } from "react-native-image-picker"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { AccountContext } from "../../contexts/AccountContext"
import { ImageContext } from "../../contexts/ImageContext"
import { ProfilePicture } from "../profile/ProfilePicture"

export const UpdateProfilePicture: React.FC = () => {
  const { loggedInAccount } = useContext(AccountContext)
  const { uploadNewProfilePicture } = useContext(ImageContext)
  const [loading, setLoading] = useState(false)

  if (!loggedInAccount) {
    return <LoadingIndicator thingThatIsLoading="Account information" />
  }

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibrary({
      mediaType: "photo",
    })

    if (!result.didCancel) {
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0]
        if (asset.uri) {
          setLoading(true)
          uploadNewProfilePicture(asset.uri, loggedInAccount).finally(() => setLoading(false))
        }
      }
    }
  }

  return (
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }} onPress={selectImage}>
      <>
        <ProfilePicture account={loggedInAccount} updatable loading={loading} />
        <Text h4 style={{ marginLeft: 15 }}>
          Edit profile photo
        </Text>
      </>
    </TouchableOpacity>
  )
}
