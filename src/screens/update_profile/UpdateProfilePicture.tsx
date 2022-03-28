import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import { TouchableRipple } from "react-native-paper";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { H2 } from "../../components/typography";
import { AccountContext } from "../../contexts/AccountContext";
import { ImageContext } from "../../contexts/ImageContext";
import { ProfilePicture } from "../profile/ProfilePicture";

export const UpdateProfilePicture: React.FC = () => {
  const { loggedInAccount } = useContext(AccountContext);
  const { uploadNewProfilePicture } = useContext(ImageContext);
  const [image, setImage] = useState<ImagePicker.ImageInfo>();

  if (!loggedInAccount) {
    return <LoadingIndicator thingThatIsLoading="Account information" />;
  }

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      uploadNewProfilePicture(result, loggedInAccount);
    }
  };

  return (
    <TouchableRipple
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      onPress={selectImage}
    >
      <>
        <ProfilePicture account={loggedInAccount} updatable />
        <H2 style={{ marginLeft: 15 }}>Edit profile photo</H2>
      </>
    </TouchableRipple>
  );
};
