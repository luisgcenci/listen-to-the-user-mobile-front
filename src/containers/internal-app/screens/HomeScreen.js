import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
  },
  outputText: {
    textAlign: 'center',
    height: 40,
  },
});

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.outputText}>
      Welcome to the Home Page!
    </Text>
  </View>
);

export default HomeScreen;