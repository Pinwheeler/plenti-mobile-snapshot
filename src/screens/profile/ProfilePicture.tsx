import { useTheme } from "@rneui/themed"
import React, { useContext, useMemo } from "react"
import { View } from "react-native"
import { AccountEntity } from "../../api/models/Account"
import { LoggedInAccountEntity } from "../../api/models/LoggedInAccount"
import { ImageContext } from "../../contexts/ImageContext"
import { InnerProfilePicture } from "./InnerProfilePicture"

interface Props {
  updatable?: boolean
  account: AccountEntity | LoggedInAccountEntity
  loading?: boolean
}

export const ProfilePicture: React.FC<Props> = (props) => {
  const { updatable, account, loading } = props
  const { imageUriForAccount } = useContext(ImageContext)
  const { theme } = useTheme()

  const picturePromise = useMemo(() => imageUriForAccount(account), [account])

  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: theme.colors.secondary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InnerProfilePicture loading={loading} updatable={updatable} pictureUriPromise={picturePromise} />
    </View>
  )
}
