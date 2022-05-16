import React, {useEffect, useState} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { updateName } from '@store/features/accRegistrationSlice'
import TextInputCustom from '@components/inputs/TextInputCustom'
import FormErrorMessages from '@enums/FormErrorMessages'

const TextInputName = ({ setIsValid, showFormErrors }) => {

  const [name, setName] = useState(useAppSelector((state) => state.accRegistration.name));

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField} =
  useValidation({
    state: { name },
    messages: FormErrorMessages,
    deviceLocale: 'ptBR',
    labels: {name: 'nome'}
  });

  const handleFormValidation = () => {

    if (validate({
      name: {required: true},
    })){
      setIsValid(true);
    }
    else{
      setIsValid(false);
    }
    dispatch(updateName(name));
  }

  const props = {
    label:'Nome',
    placeholder: 'Seu nome',
    value: name,
    onChangeText: setName,
    handleValidation: handleFormValidation,
    autoCapitalize: 'words',
    textContentType: 'name',
    maxLength: 265,
    errorField: 'name',
    isFieldInError: isFieldInError('name'),
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
    </>
  )
}

export default TextInputName;