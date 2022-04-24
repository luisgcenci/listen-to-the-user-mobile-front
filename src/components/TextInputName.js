import React, {useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  Text
} from 'react-native';
import { updateName } from '../store/features/accRegistrationSlice'
import TextInputCustom from './atoms/TextInputCustom'
const TextInputName = ({ navigation }) => {
  const [name, setName] = useState(useAppSelector((state) => state.accRegistration.name));

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
    }
  }

  const props = {
    label:'Nome',
    placeholder: 'Seu nome',
    onEndEditing: handleFormValidation,
    value: name,
    onChangeText: setName,
    autoCapitalize: 'words',
    textContentType: 'name'
  }

  return ( 
    <>
      <TextInputCustom
        {...props}
      />
      {isFieldInError('name') && getErrorsInField('name').map(Errormessage => (
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
  }
}

export default TextInputName;