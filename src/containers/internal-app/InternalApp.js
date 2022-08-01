import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Appearance,
  StatusBar
} from 'react-native';

//react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking'

//screen imports
import HomeTabs from '@internal-app/HomeTabs';
import FeedbackTabs from '@internal-app/FeedbackTabs';

//themes
import { lightTheme, darkTheme } from '@src/enums/Themes';
import { useAppSelector } from '@src/hooks/hooks';

const InternalApp = () => {

  const darkMode = useAppSelector((state) => state.user.darkMode);

  const prefix = Linking.createURL('/');
  const Stack = createStackNavigator();
  const styles = getStyles(darkMode);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        HomeTabs: "home",
        FeedbackTabs: "feedback",
      }
    }
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle = {darkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer linking={linking} theme={darkMode ? darkTheme : lightTheme}>
        <Stack.Navigator
          initialRouteName="HomeTabs"
          screenOptions={{
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
          />
          <Stack.Screen
            name="FeedbackTabs"
            component={FeedbackTabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    <SafeAreaView 
      style={
        {
          backgroundColor: darkMode ? 
          darkTheme.colors.background 
          : 
          lightTheme.colors.background
        }
      }
    />
    </>
  );    
};

const getStyles = (darkMode) => StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: darkMode ? '#000000' : '#FFFFFF',
  },
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export default InternalApp;