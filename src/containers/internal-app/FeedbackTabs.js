import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import OrderNumber from './screens/OrderNumber';
import Feedback from './screens/Feedback';

import React from 'react'

const FeedbackTabs = () => {

const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Feedback"
      screenOptions={{
      headerTitleAlign: 'center',
      headerShown: false,
      }}
    >
      <Stack.Screen
        name="Feedback"
        component={Feedback}
      />
      <Stack.Screen
        name="OrderNumber"
        component={OrderNumber}
      />
    </Stack.Navigator>
  )
}

export default FeedbackTabs

const styles = StyleSheet.create({})