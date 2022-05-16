import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

//components imports
import Errormessage from './atoms/ErrorMessage';

//phone auth imports
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider } from 'firebase/auth';

//redux imports
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.ts';
import {
  updateVerificationId,
} from '../../../store/features/phoneAuthSlice.ts';
import {
  updateNumber
} from '../../../store/features/accRegistrationSlice.ts'
import { isValidNumber } from 'react-native-phone-number-input';

const axios = require('axios');

// Firebase references
const app = getApp();
const auth = getAuth();

if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

const ValidatePhoneScreen = ({ navigation }) => {

  //hooks variables
  const recaptchaVerifier = useRef(null);

  //redux variables
  const phoneNumber = useAppSelector((state) => state.phoneAuth.phoneNumber);

  const dispatch = useAppDispatch();

  //phone auth references
  const firebaseConfig = app ? app.options : undefined;
  const attemptInvisibleVerification = false;

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
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ValidatePhoneScreen;