import crashlytics from "@react-native-firebase/crashlytics";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Icon } from "../../components/Icon";
import Theme from "../../lib/Theme";

const ICON_SIZE = 45;

interface Props {
  pictureUriPromise?: Promise<string>;
  updatable?: boolean;
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 80 / 2,
    backgroundColor: Theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const InnerProfilePicture: React.FC<Props> = (props) => {
  const { pictureUriPromise, updatable } = props;
  const [isUploadingNewProfilePicture, setIsUploadingNewProfilePicture] =
    useState(false);
  const [userImageUri, setUserImageUri] = useState<string>();
  const [loading, setLoading] = useState(!!pictureUriPromise);

  useEffect(() => {
    if (pictureUriPromise) {
      pictureUriPromise
        .then((uri) => {
          Image.prefetch(uri)
            .then(() => {
              setUserImageUri(uri);
            })
            .finally(() => setLoading(false));
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break; //do nothing, this is not weird
            default:
              crashlytics().recordError(error);
              break;
          }
        })
        .finally(() => setLoading(false));
    }
  }, [pictureUriPromise]);

  if (loading || isUploadingNewProfilePicture) {
    return <ActivityIndicator />;
  }

  if (userImageUri) {
    return (
      <Image source={{ uri: userImageUri }} style={styles.profilePicture} />
    );
  } else {
    if (updatable) {
      return (
        <Icon type={"plus"} size={ICON_SIZE} color={Theme.colors.background} />
      );
    } else {
      return (
        <Icon
          type={"user-alt"}
          size={ICON_SIZE}
          color={Theme.colors.background}
        />
      );
    }
  }
};
