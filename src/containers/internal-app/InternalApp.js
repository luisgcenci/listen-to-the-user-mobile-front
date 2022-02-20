import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from '../../components/atoms/Icon';

// import * as serviceWorker from './src/serviceWorker';

const Tab = createBottomTabNavigator();

const returnIcon = (route, focused, color, size) => (
  <Icon
    route={route}
    focused={focused}
    color={color}
    size={size}
  />
);

const InternalApp = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: 'lightblue',
        },
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => (
          returnIcon(route, focused, color, size)
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export default InternalApp;