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
import { updateBday } from '../../../store/features/accRegistrationSlice'

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
  const [bday, setBday] = useState("");

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { bday },
  });

  const handleFormValidation = () => {
    if (validate({
      bday: {date: 'DD-MM-YYYY', required: true},
    })){
      dispatch(updateBday(bday))
      navigation.navigate('RegisterEmailScreen')
    }
  }

  return ( 
    <View style={styles.container}>
        <Text>Qual sua data de Nascimento?</Text>
        <TextInput 
          style={styles.input}
          value={bday}
          onChangeText={setBday}
        />
        {isFieldInError('bday') && getErrorsInField('bday').map(Errormessage => (
          <Text style={styles.errorMessage}>{Errormessage}</Text>
        ))}
        <Pressable style={styles.button}
          onPress={() => handleFormValidation()}
        >
          <Text>Avançar</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('RegisterNameScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Voltar </Text>
        </Pressable>
    </View>
  )
}

export default RegisterBirthdayScreen;