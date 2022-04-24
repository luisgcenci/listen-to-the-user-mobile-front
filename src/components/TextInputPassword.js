import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch } from '../hooks/hooks';
import {
  Text,
  Pressable,
  Image
} from 'react-native';
import { updatePassword } from '../store/features/accRegistrationSlice'
import TextInputCustom from './atoms/TextInputCustom'

const TextInputPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { password },
  });

  const handleFormValidation = () => {
    if (validate({
      password: {required: true}
    })){
      dispatch(updatePassword(password))
    }
  }

  const props = {
    label:'Senha',
    placeholder: 'Digite sua senha',
    onEndEditing: handleFormValidation,
    value: password,
    onChangeText: setPassword,
    secureTextEntry: !showPassword,
    autoCapitalize: 'none',
    textContentType: 'password'
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
      {isFieldInError('password') && getErrorsInField('password').map(Errormessage => (
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

export default TextInputPassword;