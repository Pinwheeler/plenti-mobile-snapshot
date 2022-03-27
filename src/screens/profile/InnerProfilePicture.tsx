import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Icon } from "../../components/Icon";
import Theme from "../../lib/Theme";

const ICON_SIZE = 70;

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
      pictureUriPromise.then((uri) => {
        Image.prefetch(uri).then(() => {
          setUserImageUri(uri);
          setLoading(false);
        });
      });
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
          type={"user_solid"}
          size={ICON_SIZE}
          color={Theme.colors.background}
        />
      );
    }
  }
};
