import React, { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, TouchableHighlight } from 'react-native';

const ButtonOne = ({ 
  text,
  buttonAction,
  backgroundColor,
  borderColor,
  textColor,
  marginVertical
}) =>
{

  const styles = getStyles(backgroundColor, borderColor, marginVertical);
  
  return (
    <TouchableHighlight
      onPress={buttonAction}
      style={styles.button}
    >
      <Text style={{color: textColor ? textColor : '#FFFFFF'}}>{ text }</Text>
    </TouchableHighlight>
  );
};

const getStyles = (backgroundColor, borderColor, marginVertical) => StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor ? backgroundColor : '#6F7985',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: borderColor ? borderColor : '#FFFFFF',
    height: 45,
    width: '90%',
    padding: 10,
    borderRadius: 40,
    marginVertical: marginVertical
  }
});

export default ButtonOne;