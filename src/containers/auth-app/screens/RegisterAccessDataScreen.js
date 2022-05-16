import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

//text input fields
import TextInputNewEmail from '@components/inputs/TextInputNewEmail'
import CreatePasswordInputs from '@components/CreatePasswordInputs';

//components
import ButtonOne from '@components/atoms/ButtonOne';
import Breadcrumb from '@components/Breadcrumb';

//icons
import personalDataIcon from '@assets/icons/personaldata_icon.png'
import AccessDataIcon from '@assets/icons/accessdata_icon.png'

//redux
import { useAppSelector } from '@hooks/hooks';

//helpers
import { checkIfEmailIsRegistered } from '@helpers/DbHelper';

const axios = require('axios');

const RegisterAccessDataScreen = ({navigation}) => {

  //form validation
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [newPasswordIsValid, setNewPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);

  //db validation
  const email = useAppSelector((state) => state.accRegistration.email);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleButtonAction = async () => {
    if (formIsValid){

      const emailCheck = await checkIfEmailIsRegistered(email);

      // if (emailCheck && emailCheck.includes('EMAIL')){
      //   setEmailErrorMessage('Esse Email já está registrado com uma conta.');
      // }
      // else{
      //   setEmailErrorMessage('');
      //   navigation.navigate('AccountValidationScreen');
      // }

      if (emailCheck){
        setEmailErrorMessage('Esse Email já está registrado com uma conta.');
      }else{
        setEmailErrorMessage('');
        navigation.navigate('AccountValidationScreen');
      }
    }else{
      setShowFormErrors(true);
    }
  }

  useEffect(() => {
    if (
      emailIsValid && 
      newPasswordIsValid
    ){
      setFormIsValid(true);
    }
    else{
      setFormIsValid(false);
    }

  },[emailIsValid, newPasswordIsValid])

return (
    <View style={styles.container}>
      <View style={styles.breadcrumb}>
        <Breadcrumb
          text='Dados Pessoais'
          icon={personalDataIcon}
          greyout={false}
        />
        <Breadcrumb
          text='Dados de Acesso'
          icon={AccessDataIcon}
          greyout={false}
        />
      </View>
      <View style={styles.inputFields}>
        <Text style={styles.title}>Queremos te conhecer!</Text>
        <View style={styles.inputView}>
          <TextInputNewEmail
            setIsValid={setEmailIsValid}
            showFormErrors={showFormErrors}
            showRegistrationError={emailErrorMessage}
          />
        </View>
        <CreatePasswordInputs 
          showFormErrors={showFormErrors}
          setNewPasswordIsValid={setNewPasswordIsValid}
        />
      </View>
      <View style={styles.buttonArea}>
        <ButtonOne
          text='Continuar'
          buttonAction={handleButtonAction}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFields: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
  },
  breadcrumb: {
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    top: 40
  },
  buttonArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20
  }
});

export default RegisterAccessDataScreen;