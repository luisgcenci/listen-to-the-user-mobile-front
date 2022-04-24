import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ButtonTwo = ({ text, buttonAction }) => {

    return (
        <Pressable
          onPress={buttonAction}
          style={styles.button}
        >
          <Text style={{color:'#000000'}}>{ text }</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    height: 45,
    width: '90%',
    padding: 10,
    borderRadius: 40,
  }
});

export default ButtonTwo;