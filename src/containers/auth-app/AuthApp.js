import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ValidatePhoneScreen from './screens/ValidatePhoneScreen';
import VerifyPhoneScreen from './screens/VerifyPhoneScreen';
import RegisterNameScreen from './screens/RegisterNameScreen';
import RegisterBirthdayScreen from './screens/RegisterBirthdayScreen';
import RegisterEmailScreen from './screens/RegisterEmailScreen';
import RegisterPasswordScreen from './screens/RegisterPasswordScreen'

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
          name="RegisterNameScreen"
          component={RegisterNameScreen}
        />
        <Stack.Screen
          name="RegisterBirthdayScreen"
          component={RegisterBirthdayScreen}
        />
        <Stack.Screen
          name="RegisterEmailScreen"
          component={RegisterEmailScreen}
        />
        <Stack.Screen
          name="RegisterPasswordScreen"
          component={RegisterPasswordScreen}
        />
        <Stack.Screen
          name="ValidatePhoneScreen"
          component={ValidatePhoneScreen}
        />
        <Stack.Screen
          name="VerifyPhoneScreen"
          component={VerifyPhoneScreen}
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