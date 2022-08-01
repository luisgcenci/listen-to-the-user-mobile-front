import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const SettingsScreen = () => {

  const theme = useTheme();
  const styles = getStyles(theme.colors);

  return (
    <View style={styles.container}>
      <Text style={styles.outputText}>
        Welcome to the Settings Page!
      </Text>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
  },
  outputText: {
    textAlign: 'center',
    height: 40,
    color: colors.primary
  },
});

export default SettingsScreen;