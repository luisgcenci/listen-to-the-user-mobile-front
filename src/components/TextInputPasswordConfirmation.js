import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  Text,
  Pressable,
  Image
} from 'react-native';
import { updatePassword } from '../store/features/accRegistrationSlice'
import TextInputCustom from './atoms/TextInputCustom'

const TextInputPasswordConfirmation = ({ navigation }) => {
  const password = useAppSelector((state) => state.accRegistration.password);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { password, passwordCheck },
  });

  const handleFormValidation = () => {
    if (validate({
      password: {equalPassword: passwordCheck, required: true},
      passwordCheck: {equalPassword: password, required: true}
    })){
      dispatch(updatePassword(password))
    }
  }

  const props = {
    label:'Confirme sua senha',
    placeholder: 'Confirme sua senha',
    onEndEditing: handleFormValidation,
    value: passwordCheck,
    onChangeText: setPasswordCheck,
    secureTextEntry: !showPassword,
    autoCapitalize: 'none',
    textContentType: 'newPassword'
  }

  return ( 
    <>
      <TextInputCustom
        {...props}
      />
      <Pressable style={styles.hidePasswordIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Image
          source={
            showPassword? 
            require('../../assets/icons/hide-password_icon.png')
            :
            require('../../assets/icons/show-password_icon.png')
          } 
        />
      </Pressable>
      {isFieldInError('passwordCheck') && getErrorsInField('passwordCheck').map(Errormessage => (
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
  },
  hidePasswordIcon: {
    position: 'absolute',
    top: 20,
    right: 30,
  }
}

export default TextInputPasswordConfirmation;