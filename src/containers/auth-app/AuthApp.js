import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Appearance
} from 'react-native';

//navigation
import { 
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterPersonalDataScreen from './screens/RegisterPersonalDataScreen';
import RegisterAccessDataScreen from './screens/RegisterAccessDataScreen'
import AccountValidationScreen from './screens/AccountValidationScreen';
import VerifyPhoneScreen from './screens/VerifyPhoneScreen';

//linking
import * as Linking from 'expo-linking'

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: Appearance.getColorScheme() === 'light' ? '#FFFFFF' : '#000000',
  },
});

const AuthApp = () => {

  const scheme = Appearance.getColorScheme();
  
  const Stack = createStackNavigator();
  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        WelcomeScreen: "welcome",
        RegisterNameScreen: "name",
        RegisterBirthdayScreen: "birthday",
        RegisterEmailScreen: "email",
        RegisterPasswordScreen: "password",
        ValidatePhoneScreen: "validatephone",
        VerifyPhoneScreen: "verifyphone"
      }
    }
  }

  const DefaultTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: 'white',
      text: 'white',
      border: 'white',
      notification: 'white',
    },
  }

  const DarkTheme = {
    dark: true,
    colors: {
      primary: 'white',
      background: 'white',
      card: 'white',
      text: 'white',
      border: 'white',
      notification: 'white',
    },
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer linking={linking} theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerTitleAlign: 'center',
            headerShown: true,
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontSize: 16
            },
            headerBackTitleVisible: false
          }}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerTitle: 'Boas-vindas!',
            }}
          />
          <Stack.Screen
            name="RegisterPersonalDataScreen"
            component={RegisterPersonalDataScreen}
            options={{
              headerTitle:'Cadastro',
            }}
          />
          <Stack.Screen
            name="RegisterAccessDataScreen"
            component={RegisterAccessDataScreen}
            options={{
              headerTitle:'Cadastro',
            }}
          />
          <Stack.Screen
            name="AccountValidationScreen"
            component={AccountValidationScreen}
            options={{
              headerTitle:'Valide sua conta',
            }}
          />
          <Stack.Screen
            name="VerifyPhoneScreen"
            component={VerifyPhoneScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export default AuthApp;