import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

//navigation
import { 
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterPersonalDataScreen from './screens/RegisterPersonalDataScreen';
import RegisterAccessDataScreen from './screens/RegisterAccessDataScreen'
import AccountValidationScreen from './screens/AccountValidationScreen';
import AccountPhoneVerificationScreen from './screens/AccountPhoneVerificationScreen';
import { lightTheme } from '@src/enums/Themes';

//linking
import * as Linking from 'expo-linking'

const AuthApp = () => {

  const Stack = createStackNavigator();
  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        SignInScreen: 'welcome',
        RegisterNameScreen: 'name',
        RegisterBirthdayScreen: 'birthday',
        RegisterEmailScreen: 'email',
        RegisterPasswordScreen: 'password',
        ValidatePhoneScreen: 'validatephone',
        VerifyPhoneScreen: 'verifyphone'
      }
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle = 'dark-content'
        />
        <NavigationContainer linking={linking} theme={lightTheme}>
          <Stack.Navigator
            initialRouteName='WelcomeScreen'
            screenOptions={{
              headerTitleAlign: 'center',
              headerShown: true,
              headerTintColor: '#000000',
              headerTitleStyle: {
                fontSize: 16,
              },
              headerBackTitleVisible: false,
              headerStyle:{
                shadowColor: 'transparent'
              }
            }}
          >
            <Stack.Screen
              name='WelcomeScreen'
              component={WelcomeScreen}
              options={{
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name='SignInScreen'
              component={SignInScreen}
              options={{
                headerTitle: 'Boas-vindas!',
              }}
            />
            <Stack.Screen
              name='RegisterPersonalDataScreen'
              component={RegisterPersonalDataScreen}
              options={{
                headerTitle:'Cadastro',
              }}
            />
            <Stack.Screen
              name='RegisterAccessDataScreen'
              component={RegisterAccessDataScreen}
              options={{
                headerTitle:'Cadastro',
              }}
            />
            <Stack.Screen
              name='AccountValidationScreen'
              component={AccountValidationScreen}
              options={{
                headerTitle:'Valide sua conta',
              }}
            />
            <Stack.Screen
              name='AccountPhoneVerificationScreen'
              component={AccountPhoneVerificationScreen}
              options={{
                headerTitle:'Verifique sua conta',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <SafeAreaView 
        style={
          {
            backgroundColor: lightTheme.colors.background
          }
        }
      />
    </>
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#FFFFFF'
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export default AuthApp;