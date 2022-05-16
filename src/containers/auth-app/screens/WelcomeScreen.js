import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';

//redux imports
import { useAppSelector } from '@hooks/hooks';

//social media auth imports
import LogInWithGoogle from '@components/auth-providers/LogInWithGoogle';
import LogInWithApple from '@components/auth-providers/LoginWithApple';
import LogInWithFacebook from '@components/auth-providers/LoginWithFacebook';

//components
import ButtonOne from '@components/atoms/ButtonOne';
import ButtonTwo from '@components/atoms/ButtonTwo';
import Separator from '@components/atoms/Separator';
import ErrorMessage from '@components/atoms/ErrorMessage';

//input fields
import TextInputEmail from '@components/inputs/TextInputEmail';
import TextInputPassword from '@components/inputs/TextInputPassword';

//firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const WelcomeScreen = ({ navigation }) => {
  
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

  },[emailIsValid, passwordIsValid])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.socialAuth}>
        <LogInWithFacebook />
        <LogInWithGoogle />
        <LogInWithApple />
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
    </SafeAreaView>
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

export default WelcomeScreen;