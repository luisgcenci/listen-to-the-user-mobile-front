import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  Text
} from 'react-native';
import { updateCPF } from '../store/features/accRegistrationSlice'
import TextInputCustom from './atoms/TextInputCustom'

const TextInputCPF = () => {
  const [cpf, setCPF] = useState('');

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { cpf },
  });

  const handleFormValidation = () => {
    if (validate({
      cpf: {required: true}
    })){
      dispatch(updateCPF(cpf))
    }
  }

  const props = {
    label:'CPF',
    placeholder: 'Seu CPF',
    onEndEditing: handleFormValidation,
    value: cpf,
    onChangeText: setCPF,
  }

  return ( 
    <>
      <TextInputCustom
        {...props}
      />
      {isFieldInError('cpf') && getErrorsInField('cpf').map(Errormessage => (
        <Text key={Errormessage} style={styles.errorMessage}>
          {Errormessage}
        </Text>
      ))}
    </>
  )
}

const styles = {
  errorMessage: {
    color: 'red'
  }
}

export default TextInputCPF;