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
import { updateEmail } from '../../../store/features/accRegistrationSlice'

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
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { email, confirmEmail },
  });

  const handleFormValidation = () => {
    if (validate({
        email: {email: true, equalPassword: confirmEmail, required: true},
        confirmEmail: {email: true, equalPassword: email, required: true},
    })){
      dispatch(updateEmail(email))
      navigation.navigate('RegisterPasswordScreen')
    }
  }

  return ( 
    <View style={styles.container}>
        <Text>Qual o seu e-mail?</Text>
        <Text>Seu e-mail</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          autoCorrect={false}
        />
        {isFieldInError('email') && getErrorsInField('email').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
        <Text>Confirme o e-mail</Text>
        <TextInput 
          style={styles.input}
          value={confirmEmail}
          onChangeText={setConfirmEmail}
          autoCapitalize='none'
          autoCorrect={false}
        />
        {isFieldInError('confirmEmail') && getErrorsInField('confirmEmail').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
        <Pressable style={styles.button}
          onPress={() => handleFormValidation()}
        >
          <Text>Avançar</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('RegisterBirthdayScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Voltar </Text>
        </Pressable>
    </View>
  )
}

export default RegisterBirthdayScreen;