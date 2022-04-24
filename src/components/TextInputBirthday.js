import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  Text
} from 'react-native';
import { updateBday } from '../store/features/accRegistrationSlice'
import TextInputCustom from './atoms/TextInputCustom'

const TextInputBirthday = () => {
  const [birthday, setBirthday] = useState(useAppSelector((state) => state.accRegistration.bday));;

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { birthday },
  });

  const handleFormValidation = () => {
    if (validate({
      birthday: {date: 'DD-MM-YYYY', required: true},
    })){
      dispatch(updateBday(birthday))
    }
  }

  const props = {
    label:'Data de Nascimento',
    placeholder: '01/01/1990',
    onEndEditing: handleFormValidation,
    value: birthday,
    onChangeText: setBirthday,
  }

  return ( 
    <>
      <TextInputCustom
        {...props}
      />
      {isFieldInError('birthday') && getErrorsInField('birthday').map(Errormessage => (
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

export default TextInputBirthday;