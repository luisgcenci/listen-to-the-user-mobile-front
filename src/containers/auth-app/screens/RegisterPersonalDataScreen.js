import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//text input fields
import TextInputName from '@components/inputs/TextInputName'
import TextInputCPF from '@components/inputs/TextInputCPF';
import TextInputBirthday from '@components/inputs/TextInputBirthday';
import TextInputPhoneNumber from '@components/inputs/TextInputPhoneNumber';

//components
import ButtonOne from '@components/atoms/ButtonOne';
import Breadcrumb from '@components/Breadcrumb';

//icons
import personalDataIcon from '../../../../assets/icons/personaldata_icon.png'
import GreyedOutAccessDataIcon from '../../../../assets/icons/accessdatagrayedout_icon.png'

//redux
import { useAppDispatch, useAppSelector } from '@hooks/hooks';

//helpers
import { checkIfPhoneIsRegistered, checkIfCpfIsRegistered } from '@helpers/DbHelper';

const axios = require('axios');

const RegisterPersonalDataScreen = ({ navigation }) => {

  const dispatch = useAppDispatch();

  //used for form validation
  const [nameIsValid, setNameIsValid] = useState(false);
  const [cpfIsValid, setCpfIsValid] = useState(false);
  const [birthdayIsValid, setBirthdayIsValid] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  //used for database validation
  const cpf = useAppSelector((state) => state.accRegistration.cpf);
  const countryCode = useAppSelector((state) => state.accRegistration.countryCode);
  const phoneNumber = useAppSelector((state) => state.accRegistration.number);

  //error related to database validation
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [cpfErrorMessage, setCpfErrorMessage] = useState('');
  const [showFormErrors, setShowFormErrors] = useState(false);


  const handleButtonAction = async () => {
    
    if (formIsValid){

      const phoneIsRegistered = await checkIfPhoneIsRegistered(countryCode, phoneNumber);
      const cpfIsRegistered = await checkIfCpfIsRegistered(cpf);
      
      if (cpfIsRegistered){
        setCpfErrorMessage('Esse CPF já está registrado com uma conta.');
      }
      else if (phoneIsRegistered){
        setPhoneErrorMessage('Esse Número já está registrado com uma conta.');
      }else{
        setShowFormErrors(false);
        setPhoneErrorMessage('');
        setCpfErrorMessage('');
        navigation.navigate('RegisterAccessDataScreen');
      }
    }else{
      setShowFormErrors(true);
    }
  }

  useEffect(() => {
    if (
      nameIsValid && 
      cpfIsValid && 
      birthdayIsValid &&
      phoneIsValid
    ){
      setFormIsValid(true);
    }
    else{
      setFormIsValid(false);
    }

  },[nameIsValid, cpfIsValid, birthdayIsValid, phoneIsValid])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1}}
      keyboardOpeningTime={0}
    >
      <View style={styles.container}>
        <View style={styles.breadcrumb}>
          <Breadcrumb
            text='Dados Pessoais'
            icon={personalDataIcon}
            greyout={false}
          />
          <Breadcrumb
            text='Dados de Acesso'
            icon={GreyedOutAccessDataIcon}
            greyout={true}
          />
        </View>
        <View style={styles.inputFields}>
          <Text style={styles.title}>Queremos te Conhecer!</Text>
          <TextInputName 
            setIsValid={setNameIsValid}
            showFormErrors={showFormErrors}
          />
          <TextInputCPF 
            setIsValid={setCpfIsValid}
            showFormErrors={showFormErrors}
            showRegistrationError={cpfErrorMessage}
          />
          <TextInputBirthday 
            setIsValid={setBirthdayIsValid}
            showFormErrors={showFormErrors}
          />
          <TextInputPhoneNumber 
            setIsValid={setPhoneIsValid}
            showFormErrors={showFormErrors}
            showRegistrationError={phoneErrorMessage}
          />
        </View>
        <View style={styles.buttonArea}>
          <ButtonOne
            buttonAction={handleButtonAction}
            text='Continuar'
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  breadcrumb: {
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    top: 40,
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

export default RegisterPersonalDataScreen;