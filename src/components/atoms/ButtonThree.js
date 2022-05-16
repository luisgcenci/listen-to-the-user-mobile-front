import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ButtonThree = ({ text, buttonAction }) => {

    return (
        <Pressable
          onPress={buttonAction}
          style={styles.button}
        >
          <Text style={{color:'#253FCA', fontSize: 12}}>{ text }</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#253FCA',
    height: 45,
    width: '50%',
    padding: 10,
    borderRadius: 40,
  }
});

export default ButtonThree;