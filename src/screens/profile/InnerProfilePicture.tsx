import React, { useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet } from "react-native"

import { Icon } from "../../components/Icon"
import { Logger } from "../../lib/Logger"
import Theme from "../../lib/Theme"

const ICON_SIZE = 45

interface Props {
  pictureUriPromise?: Promise<string>
  updatable?: boolean
  loading?: boolean
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
})

export const InnerProfilePicture: React.FC<Props> = (props) => {
  const { pictureUriPromise, updatable, loading } = props
  const [userImageUri, setUserImageUri] = useState<string>()
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (pictureUriPromise) {
      setFetching(true)
      pictureUriPromise
        .then((uri) => {
          Image.prefetch(uri)
            .then(() => {
              setUserImageUri(uri)
            })
            .finally(() => setFetching(false))
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break //do nothing, this is not weird
            default:
              Logger.error(error)
              break
          }
        })
        .finally(() => setFetching(false))
    }
  }, [pictureUriPromise])

  if (loading || fetching) {
    return <ActivityIndicator />
  }

  if (userImageUri) {
    return <Image source={{ uri: userImageUri }} style={styles.profilePicture} />
  } else {
    if (updatable) {
      return <Icon type={"plus"} size={ICON_SIZE} color={Theme.colors.background} />
    } else {
      return <Icon type={"user-alt"} size={ICON_SIZE} color={Theme.colors.background} />
    }
  }
}
