import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

//components imports
import Errormessage from '../../../components/atoms/ErrorMessage';

//phone auth imports
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider } from 'firebase/auth';
import PhoneInput, { isValidNumber } from 'react-native-phone-number-input';

//redux imports
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.ts';
import {
  updatePhoneNumber,
  updateVerificationId,
  clearPhoneNumber
} from '../../../store/features/phoneAuthSlice.ts';
import {
  updateNumber
} from '../../../store/features/accRegistrationSlice.ts'

const axios = require('axios');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'lightpink',
    marginVertical: 10,
  },
  buttonText: {
    padding: 10,
    textAlign: 'center',
  },
});

// Firebase references
const app = getApp();
const auth = getAuth();

if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

const ValidatePhoneScreen = ({ navigation }) => {

  //hooks variables
  const recaptchaVerifier = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  //redux variables
  const phoneNumber = useAppSelector((state) => state.phoneAuth.phoneNumber);
  const registeringAccount = useAppSelector((state) => state.authApp.registeringAccount);

  const dispatch = useAppDispatch();

  //phone auth references
  const firebaseConfig = app ? app.options : undefined;
  const attemptInvisibleVerification = false;

  const checkUserExists = () => {
    axios.post('http://192.168.0.134:5000/checkuserexists', {
      number: phoneNumber
    })
    .then( (response) => {

      const userExists = response.data ? true : false;

      if ( (registeringAccount && !userExists) || (!registeringAccount && userExists) ){
        sendVerificationCode();
      }
      else if (registeringAccount && userExists){
        setErrorMessage(
          'This number is already associated with an account. Please log in.'
        );
      }
      else if (!registeringAccount && !userExists){
        setErrorMessage(
          'This number is not associated with an account. Please create an account.'
        );
      }
    })
    .catch( (e) => {
      console.log('error: ' + e);
    })
  }

  const sendVerificationCode = () => {
    if (isValidNumber(phoneNumber)) {
      const phoneProvider = new PhoneAuthProvider(auth);
      phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current,
      ).then((verificationId) => {
        dispatch(updateVerificationId(verificationId));
        dispatch(updateNumber(phoneNumber));
        navigation.navigate('VerifyPhoneScreen');
      }).catch((e) => {
        switch (e.code) {
          case 'ERR_FIREBASE_RECAPTCHA_CANCEL':
            setErrorMessage('Recaptcha Verification Cancelled.');
            break;
          default:
            setErrorMessage(e.code);
        }
      });
    }
    else{
      setErrorMessage('Number not valid.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <PhoneInput
          value={phoneNumber}
          defaultCode="BR"
          onChangeFormattedText={(newNumber) => {
            dispatch(updatePhoneNumber(newNumber));
          }}
          textInputProps={{
            keyboardType: 'phone-pad',
          }}
          containerStyle={{
            marginVertical: 10,
          }}
        />
        <Pressable
          onPress={() => checkUserExists()}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Validate! </Text>
        </Pressable>
        <Pressable
          onPress={() => dispatch(clearPhoneNumber()) && navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Back! </Text>
        </Pressable>
        <Errormessage
          message={errorMessage}
        />
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </TouchableWithoutFeedback>
  );
};

ValidatePhoneScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ValidatePhoneScreen;