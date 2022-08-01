import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
// import Icon2 from 'react-native-vector-icons/FontAwesome';

const Close = ({onPress, color}) => {
  return (
    <Icon name="close" onPress={onPress} size={25} color={color} borderWidth={1} />
  )
}

export { Close }