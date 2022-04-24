import { View, Text } from 'react-native'
import React from 'react'

const SeparatorStraightLine = () => {
  return (
    <View style={styles.separatorBorder}></View>
  )
}

const styles = {
  separatorBorder: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#DADADA',
  },
}

export default SeparatorStraightLine