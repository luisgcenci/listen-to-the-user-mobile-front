import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  Button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  Pressable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    backgroundColor: '#818C99',
    borderRadius: 21
  },
  invalidPressable:{
    opacity: 0.2,
  },
  ScreenContent:{
    flex: 9,
  }
});

const FeedBackTemplate = ({screenContent, onPress, buttonText, valid}) => {

  return (
    <View style={styles.container}>
      <View style={styles.ScreenContent}>
        {screenContent}
      </View>
      <View style={styles.Button}>
        <Pressable 
          onPress={onPress}
          style={[styles.Pressable, !valid && styles.invalidPressable]}
          disabled={!valid}
        >
          <Text style={{color:'#FFFFFF', fontSize: 16, fontWeight: '500'}}>
            {buttonText ? buttonText : 'Avançar' }
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

//Como foi a sua experiência?

export default FeedBackTemplate;