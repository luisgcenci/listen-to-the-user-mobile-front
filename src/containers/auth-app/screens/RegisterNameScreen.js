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
import { updateName } from '../../../store/features/accRegistrationSlice'
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

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { name },
  });

  const handleFormValidation = () => {
    if (validate({
      name: {required: true}
    })){
      dispatch(updateName(name))
      navigation.navigate('RegisterBirthdayScreen')
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
        <Pressable style={styles.button}
          onPress={() => handleFormValidation()}
        >
          <Text>Avançar</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('WelcomeScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Voltar </Text>
        </Pressable>
    </View>
  )
}

export default RegisterInfoScreen;