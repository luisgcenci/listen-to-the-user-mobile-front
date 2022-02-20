import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const Errormessage = ({ message }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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

Errormessage.propTypes = {

  message: PropTypes.string.isRequired,
};

export default Errormessage;