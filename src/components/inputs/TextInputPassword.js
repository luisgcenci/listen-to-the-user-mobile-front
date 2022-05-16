import React, { useState, useEffect } from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch } from '@hooks/hooks';
import {
  Pressable,
  Image
} from 'react-native';
import { updatePassword } from '@store/features/accLogInSlice'
import TextInputCustom from '@components/inputs/TextInputCustom'

const TextInputPassword = ({ setIsValid, showFormErrors }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField } =
  useValidation({
    state: { password },
  });

  const handleFormValidation = () => {
    if (validate({
      password: {required: true}
    })){
      setIsValid(true);
    }
    else{
      setIsValid(false);
    }
    dispatch(updatePassword(password));
  }

  const props = {
    label:'Senha',
    placeholder: 'Digite sua senha',
    value: password,
    onChangeText: setPassword,
    handleValidation: handleFormValidation,
    secureTextEntry: !showPassword,
    autoCapitalize: 'none',
    textContentType: 'password',
    errorField: 'password',
    isFieldInError: isFieldInError('password'),
    getErrorsInField: getErrorsInField,
    showFormErrors: showFormErrors
  }

  useEffect(() => {
    handleFormValidation();
  },[])

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
            require('../../../assets/icons/hide-password_icon.png')
            :
            require('../../../assets/icons/show-password_icon.png')
          } 
        />
      </Pressable>
    </>
  )
}

const styles = {
  hidePasswordIcon: {
    position: 'absolute',
    top: 20,
    right: 30,
  }
}

export default TextInputPassword;