import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../Colors';

function Loading( props) {
  return (
    <View
      style={{
      margin:10,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}>
      <Icon
        name="activity-outline"
        width={40}
        height={40}
        fill={props.color}
        style={{
          position:"absolute", top: 13, left: -17 }}
      />
      <ActivityIndicator
        style={{
          top: 3,
          left: 3
        }}
        size={60}
        color={props.color}
      />
    </View>
  )
}

export default Loading;