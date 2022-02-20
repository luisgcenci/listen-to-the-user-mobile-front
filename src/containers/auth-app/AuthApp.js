import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ValidateRegisterScreen from './screens/ValidateRegisterScreen';
import ValidateLoginScreen from './screens/ValidateLoginScreen';
import VerifyScreen from './screens/VerifyScreen';
import RegisterInfoScreen from './screens/RegisterInfoScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

const Stack = createStackNavigator();

const AuthApp = () => (
  <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="RegisterInfoScreen"
          component={RegisterInfoScreen}
        />
        <Stack.Screen
          name="ValidateRegisterScreen"
          component={ValidateRegisterScreen}
        />
        <Stack.Screen
          name="ValidateLoginScreen"
          component={ValidateLoginScreen}
        />
        <Stack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export default AuthApp;