import { AccountEntity, LoggedInAccountEntity } from "plenti-api";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ImageContext } from "../../contexts/ImageContext";
import Theme from "../../lib/Theme";
import { InnerProfilePicture } from "./InnerProfilePicture";

interface Props {
  updatable?: boolean;
  account: AccountEntity | LoggedInAccountEntity;
}

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: Theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ProfilePicture: React.FC<Props> = (props) => {
  const { updatable, account } = props;
  const { imageUriForUser } = useContext(ImageContext);

  return (
    <View style={styles.circle}>
      <InnerProfilePicture
        updatable={updatable}
        pictureUriPromise={imageUriForUser("GET", account)}
      />
    </View>
  );
};
