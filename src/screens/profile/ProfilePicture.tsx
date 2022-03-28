import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AccountEntity } from "../../api/models/Account";
import { LoggedInAccountEntity } from "../../api/models/LoggedInAccount";
import { ImageContext } from "../../contexts/ImageContext";
import Theme from "../../lib/Theme";
import { InnerProfilePicture } from "./InnerProfilePicture";

interface Props {
  updatable?: boolean;
  account: AccountEntity | LoggedInAccountEntity;
  loading?: boolean;
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
  const { updatable, account, loading } = props;
  const { imageUriForAccount } = useContext(ImageContext);

  return (
    <View style={styles.circle}>
      <InnerProfilePicture
        loading={loading}
        updatable={updatable}
        pictureUriPromise={imageUriForAccount(account)}
      />
    </View>
  );
};
