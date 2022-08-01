import { Pressable, StyleSheet, Appearance } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Breadcrumb2 from '@components/Breadcrumb2';
import { Close } from '@src/components/atoms/Icons';
import Filters from './screens/feedback/Filters';
import Experience from './screens/feedback/Experience';
import Details from './screens/feedback/Details';
import End from './screens/feedback/End';

import React from 'react'

const FeedbackTabs = ({navigation}) => {

const Stack = createStackNavigator();


  const dark = Appearance.getColorScheme() == 'dark';

  return (
    <Stack.Navigator
      initialRouteName="Experience"
      screenOptions={{
        
        headerMode:'screen',
        headerTitleAlign: 'center',
        headerShown: true,
        headerTintColor: dark ? '#FFFFFF' : '#000000',
        headerStyle: {
          backgroundColor: dark ? '#000000' : '#FFFFFF',
          shadowColor: 'transparent'
        },
        headerRightContainerStyle: {
          alignItems: 'flex-end',
          position: 'relative',
          right: 20,
        },
        headerBackTitleVisible: false,
        headerRight: () => (
          <Pressable>
            <Close 
              onPress={ () => navigation.goBack()}
              color={dark ? '#FFFFFF' : '#000000'}
            />
          </Pressable>
        )
      }}
    >
      <Stack.Screen
        name={"Experience"}
        component={Experience}
        options={{
          headerTitle: () => (
            <Breadcrumb2
              active={1}
            />
          )
        }}
      />
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={{
          headerTitle: () => (
            <Breadcrumb2
              active={2}
            />
          )
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: () => (
            <Breadcrumb2
              active={3}
            />
          )
        }}
      />
      <Stack.Screen
        name="End"
        component={End}
        options={{
          headerTitle: () => (
            <Breadcrumb2
              active={3}
            />
          ),
          headerLeft: null,
        }}
      />


    </Stack.Navigator>
  )
}

export default FeedbackTabs

const styles = StyleSheet.create({})