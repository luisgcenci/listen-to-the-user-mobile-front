import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  Text
} from 'react-native';
import { updateNumber } from '../store/features/accRegistrationSlice';
import { updatePhoneNumber } from '../store/features/phoneAuthSlice';
import TextInputCustom from './atoms/TextInputCustom';

const TextInputPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState(useAppSelector((state) => state.accRegistration.number));;

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { phoneNumber },
  });

  const handleFormValidation = () => {
    if (validate({
      phoneNumber: {required: true}
    })){
      dispatch(updateNumber(phoneNumber));
      dispatch(updatePhoneNumber(phoneNumber));
    }
  }

  const props = {
    label:'Celular',
    placeholder: '(00) 0 0000-0000',
    onEndEditing: handleFormValidation,
    value: phoneNumber,
    onChangeText: setPhoneNumber,
    textContentType: 'telephoneNumber'
  }

  return ( 
    <>
      <TextInputCustom
        {...props}
      />
      {isFieldInError('phoneNumber') && getErrorsInField('phoneNumber').map(Errormessage => (
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

export default TextInputPhoneNumber;