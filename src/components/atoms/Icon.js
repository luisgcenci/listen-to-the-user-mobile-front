import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Icon = ({ route, focused, color, size }) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Settings') {
    iconName = focused ? 'settings' : 'settings';
  } else if (route.name === 'Scanner') {
    iconName = focused ? 'scan-outline' : 'scan-outline';
  }

  return (
    // You can return any component that you like here!
    <Ionicons name={iconName} size={size} color={color} />
  );
};

Icon.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  focused: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Icon;