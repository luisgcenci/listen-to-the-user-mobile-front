import { StyleSheet, Appearance } from 'react-native'
import React from 'react'

//screens imports
import Home from '@internal-app/screens/home/Home';
import Settings from '@internal-app/screens/home/Settings';
import Scanner from '@internal-app/screens/home/Scanner';

//navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//components imports
import Icon from '@components/atoms/Icon';

//theme
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
                    shadowColor: 'transparent'
                },
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused, color, size }) => (
                    returnIcon(route, focused, color, size)
                ),
                tabBarStyle:{
                    height: 60,
                },
            })}
            >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Scanner"
                component={Scanner}
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