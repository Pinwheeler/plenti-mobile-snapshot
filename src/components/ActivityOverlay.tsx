import React from 'react'
import {View} from 'react-native'
import {ActivityIndicator, Title} from 'react-native-paper'

interface Props {
  loadingMessage?: string
}

const ActivityOverlay: React.FC<Props> = props => {
  const {loadingMessage} = props
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
      {loadingMessage && <Title>{loadingMessage}</Title>}
    </View>
  )
}

export default ActivityOverlay
