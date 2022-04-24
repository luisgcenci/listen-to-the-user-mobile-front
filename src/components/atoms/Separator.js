import { View, Text } from 'react-native'
import React from 'react'

const Separator = () => {
  return (
    <View style={styles.separator}>
      <View style={styles.separatorBorder}></View>
      <Text style={styles.separatorText}>OU</Text>
      <View style={styles.separatorBorder}></View>
  </View>
  )
}

const styles = {
  separator: {
    flexDirection: 'row',    
  },
  separatorBorder: {
    width: '35%',
    height: '50%',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#DADADA',
  },
  separatorText: {
    color: '#393939',
    fontWeight: 'bold'
  },
}

export default Separator