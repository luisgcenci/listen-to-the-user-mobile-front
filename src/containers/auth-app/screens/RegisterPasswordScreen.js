import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch } from '../../../hooks/hooks.ts';
import {
    Text,
    View,
    Pressable,
    StyleSheet,
    TextInput,
} from 'react-native';
import { updatePassword } from '../../../store/features/accRegistrationSlice'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'lightpink',
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  errorMessage: {
    color: 'red'
  }
});

const RegisterBirthdayScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { password, confirmPassword },
  });

  const handleFormValidation = () => {
    if (validate({
        password: {equalPassword: confirmPassword, required: true},
        confirmPassword: {equalPassword: password, required: true}
    })){
      dispatch(updatePassword(password))
      navigation.navigate('ValidateScreen', {register: false});
    }
  }

  return ( 
    <View style={styles.container}>
        <Text>Escolha uma senha</Text>
        <TextInput 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
        {isFieldInError('password') && getErrorsInField('password').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
        <Text>Confirme sua senha</Text>
        <TextInput 
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
        {isFieldInError('confirmPassword') && getErrorsInField('confirmPassword').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
        <Pressable style={styles.button}
          onPress={() => handleFormValidation()}
        >
          <Text>Avançar</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('RegisterEmailScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Voltar </Text>
        </Pressable>
    </View>
  )
}

export default RegisterBirthdayScreen;