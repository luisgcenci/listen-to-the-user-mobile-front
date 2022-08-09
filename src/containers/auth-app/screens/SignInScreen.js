import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

//redux imports
import { useAppSelector } from '@hooks/hooks';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//components
import ButtonOne from '@components/atoms/ButtonOne';
import ButtonTwo from '@components/atoms/ButtonTwo';
import Separator from '@components/atoms/Separator';
import ErrorMessage from '@components/atoms/ErrorMessage';

//input fields
import TextInputEmail from '@components/inputs/TextInputEmail';
import TextInputPassword from '@components/inputs/TextInputPassword';

//firebase
import { auth } from '@src/containers/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ({ navigation }) => {
  
  //form validation
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //redux
  const email = useAppSelector((state) => state.accLogIn.email);
  const password = useAppSelector((state) => state.accLogIn.password);

  const handleCreateAccount = () => {
    navigation.navigate('RegisterPersonalDataScreen');
  }

  const handleLogIn = () => {

    if (formIsValid){
      signInWithEmailAndPassword(auth, email, password).then((userCred) => {
        setErrorMessage('');
      }).catch((error) => {
        setErrorMessage(error.message);
      })
    }else{
      setShowFormErrors(true);
    }
  }

  useEffect(() => {
    if (
      emailIsValid && 
      passwordIsValid
    ){
      setFormIsValid(true);
    }
    else{
      setFormIsValid(false);
    }

    return () => {setFormIsValid()}
  },[emailIsValid, passwordIsValid])
  
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1}}
      keyboardOpeningTime={0}
    >
      <View style={styles.container}>
        <View style={styles.socialAuth}>
          <Text>Texttt</Text>
        </View>
        <Separator />
        <View style={styles.emailAuth}>
          <View style={styles.inputView}>
            <TextInputEmail 
              setIsValid={setEmailIsValid}
              showFormErrors={showFormErrors}
            />
          </View>
          <View style={styles.inputView}>
            <TextInputPassword 
              setIsValid={setPasswordIsValid}
              showFormErrors={showFormErrors}
            />
          </View>
          <ErrorMessage 
            message={errorMessage}
          />
          <Text style={styles.forgotPasswordText}>
            Esqueci a minha senha
          </Text>
          <ButtonTwo 
            text='Entrar'
            buttonAction={handleLogIn}
          />
          <ButtonOne 
            text='Criar Conta'
            buttonAction={handleCreateAccount}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialAuth: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  emailAuth: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    paddingVertical: 50
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPasswordText: {
    textDecorationLine:'underline',
    opacity: 0.4
  }
});

export default SignInScreen; 