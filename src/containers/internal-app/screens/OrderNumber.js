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

const OrderNumber = ({ route, navigation }) => {
  const [number, setNumber] = useState("");

  const { data } = route.params;

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { number },
  });

  const handleFormValidation = () => {
    if  (validate({
      number: {required: true}
    })){
      // dispatch(updateName(name))
      // navigation.navigate('RegisterBirthdayScreen')
    }
  }

  return ( 
    <View style={styles.container}>
        <Text> Data: </Text>
        <Text> Por favor, qual o número do Pedido?</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          autoCapitalize='words'
          autoCorrect={false}
        />
        {isFieldInError('number') && getErrorsInField('number').map(Errormessage => (
          <Text key={Errormessage} style={styles.errorMessage}>
              {Errormessage}
          </Text>
        ))}
        <Pressable style={styles.button}
          onPress={() => handleFormValidation()}
        >
          <Text>Avançar</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('HomeTabs')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Voltar </Text>
        </Pressable>
    </View>
  )
}

export default OrderNumber;