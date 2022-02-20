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
import { registerAccount } from '../../../store/features/accRegistrationSlice'

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

const RegisterInfoScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bday, setBday] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { name, bday, email, confirmEmail, password, confirmPassword },
  });

  const handleFormValidation = () => {
    if (validate({
      name: {required: true},
      bday: {date: 'DD-MM-YYYY'},
      email: {email: true, equalPassword: confirmEmail},
      confirmEmail: {email: true, equalPassword: email},
      password: {equalPassword: confirmPassword},
      confirmPassword: {equalPassword: password}
    })){
      dispatch(registerAccount({name, bday, email, password}))
      navigation.navigate('ValidateRegisterScreen')
    }
  }

  return ( 
    <View style={styles.container}>
        <Text>Queremos te conhecer</Text>
        <Text>Como podemos te chamar?</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
          autoCapitalize='words'
          autoCorrect={false}
        />
        {isFieldInError('name') && getErrorsInField('name').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
        <Text>Qual sua data de Nascimento?</Text>
        <TextInput 
          style={styles.input}
          value={bday}
          onChangeText={setBday}
        />
        {isFieldInError('bday') && getErrorsInField('bday').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
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
          <Text>Submit</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('WelcomeScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Back! </Text>
        </Pressable>
    </View>
  )
}

export default RegisterInfoScreen;