import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import firebase from '../../firebase/config';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.ts';
import { updateAuthStatus, updateVerificationCode } from '../../../store/features/phoneAuthSlice.ts';
import Errormessage from '../../../components/atoms/ErrorMessage';
const axios = require('axios');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    backgroundColor: 'lightpink',
    marginHorizontal: 140,
    marginVertical: 10,
  },
  buttonText: {
    padding: 10,
    textAlign: 'center',
  },
  codeInput: {
    borderWidth: 1,
    width: 100,
    height: 50,
    textAlign: 'center',
    fontSize: 16,
  },
});

const VerifyScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const accRegistration = useAppSelector((state) => state.accRegistration);
  const verificationId = useAppSelector((state) => state.phoneAuth.verificationId);
  const verificationCode = useAppSelector((state) => state.phoneAuth.verificationCode);
  const dispatch = useAppDispatch();


  const saveAccRegistrationToDB = () => {

    axios.post('http://localhost:5000/addclientuser', {
      name: accRegistration.name,
      dateOfBirth: accRegistration.bday,
      email: accRegistration.email,
      password: accRegistration.password,
      number: accRegistration.number
    })
    .then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  const confirmVerificationCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode,
    );
    firebase.auth().signInWithCredential(credential).then(() => {
      saveAccRegistrationToDB();
      dispatch(updateAuthStatus(true));
    }).catch((e) => {
      switch (e.code) {
        case 'auth/invalid-verification-code':
          setErrorMessage('Invalid Code');
          break;
        default:
          setErrorMessage('Unkown Error.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.codeInput}
        onChangeText={(code) => {
          dispatch(updateVerificationCode(code));
        }}
      />
      <Pressable
        onPress={confirmVerificationCode}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Verify! </Text>
      </Pressable>
      <Pressable
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Back! </Text>
        </Pressable>
      <Errormessage
        message={errorMessage}
      />
    </View>
  );
};

VerifyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default VerifyScreen;