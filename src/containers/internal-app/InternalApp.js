import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

//react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking'

//screen imports
import HomeTabs from './HomeTabs';
import FeedbackTabs from './FeedbackTabs';

// import * as serviceWorker from './src/serviceWorker';

const Stack = createStackNavigator();

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

const InternalApp = () => {

  const prefix = Linking.createURL('/');

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
    <SafeAreaView style={styles.container}>
      <NavigationContainer linking={linking}>
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
  );    
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export default InternalApp;