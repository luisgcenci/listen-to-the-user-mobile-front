import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {
  const styles = StyleSheet.create({
    container: {
      textAlign: 'center',
      color: 'red',
    },
  });

  return (
    <View>
      <Text style={styles.container}>
        { message }
      </Text>
    </View>
  );
};

ErrorMessage.propTypes = {

  message: PropTypes.string.isRequired,
};

export default ErrorMessage;