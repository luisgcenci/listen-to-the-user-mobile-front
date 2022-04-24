import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  Text
} from 'react-native';
import { updateEmail } from '../store/features/accRegistrationSlice'
import TextInputCustom from './atoms/TextInputCustom'

const TextInputEmail = ({ navigation }) => {

  const [email, setEmail] = useState(useAppSelector((state) => state.accRegistration.email));

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { email },
  });

  const handleFormValidation = () => {
    if (validate({
      email: {required: true}
    })){
      dispatch(updateEmail(email))
    }
  }

  const props = {

    label: 'E-mail',
    placeholder: 'email@example.com',
    onEndEditing: handleFormValidation,
    value: email,
    onChangeText: setEmail,
    autoCapitalize: 'none',
    textContentType: 'email'
  }

  return ( 
    <>
      <TextInputCustom
        {...props}
      />
      {isFieldInError('email') && getErrorsInField('email').map(Errormessage => (
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

export default TextInputEmail;