import React, { useState,useEffect} from 'react';
import {
  Pressable,
  Image
} from 'react-native';
import TextInputCustom from '@components/inputs/TextInputCustom'

const TextInputPasswordConfirmation = ( props ) => {

  const [showPassword, setShowPassword] = useState(false);

  const propsToInput = {
    label:'Confirme sua senha',
    placeholder: 'Confirme sua senha',
    value: props.confirmPassword,
    onChangeText: props.setConfirmPassword,
    handleValidation: props.handleFormValidation,
    secureTextEntry: !showPassword,
    autoCapitalize: 'none',
    textContentType: 'password',
    errorField: 'confirmPassword',
    isFieldInError: props.isFieldInError,
    getErrorsInField: props.getErrorsInField,
    showFormErrors: props.showFormErrors
  }

  useEffect(() => {
    props.handleFormValidation();
  },[])

  return ( 
    <>
      <TextInputCustom
        {...propsToInput}
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

export default TextInputPasswordConfirmation;