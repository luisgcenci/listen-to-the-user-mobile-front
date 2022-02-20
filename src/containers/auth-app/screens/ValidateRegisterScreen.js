import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import PhoneInput, { isValidNumber } from 'react-native-phone-number-input';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../../firebase/config';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.ts';
import Errormessage from '../../../components/atoms/ErrorMessage';
import {
  updatePhoneNumber,
  updateVerificationId,
  clearPhoneNumber
} from '../../../store/features/phoneAuthSlice.ts';
import {
  registerNumber
} from '../../../store/features/accRegistrationSlice.ts'

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

const ValidateRegisterScreen = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const phoneNumber = useAppSelector((state) => state.phoneAuth.phoneNumber);
  const dispatch = useAppDispatch();

  const sendVerificationCode = () => {
    if (isValidNumber(phoneNumber)) {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current,
      ).then((verificationId) => {
        dispatch(updateVerificationId(verificationId));
        dispatch(registerNumber(phoneNumber));
        navigation.navigate('VerifyScreen');
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
          onPress={sendVerificationCode}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Validate! </Text>
        </Pressable>
        <Pressable
          onPress={() => dispatch(clearPhoneNumber()) && navigation.navigate('RegisterInfoScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Back! </Text>
        </Pressable>
        <Errormessage
          message={errorMessage}
        />
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

ValidateRegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ValidateRegisterScreen;