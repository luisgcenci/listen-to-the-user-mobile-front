import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//screens imports
import Home from '@internal-app/screens/Home';
import Settings from '@internal-app/screens/Settings';

//navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//components imports
import Icon from '@components/atoms/Icon';

const HomeTabs = () => {

    const returnIcon = (route, focused, color, size) => (
        <Icon
            route={route}
            focused={focused}
            color={color}
            size={size}
        />
    );
    
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused, color, size }) => (
                    returnIcon(route, focused, color, size)
                ),
            })}
            >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
            />
        </Tab.Navigator>
    );
};

export default HomeTabs

const styles = StyleSheet.create({})