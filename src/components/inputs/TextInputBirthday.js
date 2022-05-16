import React, {useState, useEffect} from 'react';
import { useValidation } from 'react-native-form-validator';

//redux
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { updateBday } from '@store/features/accRegistrationSlice'

import TextInputCustom from '@components/inputs/TextInputCustom'

//enums
import FormErrorMessages from '@enums/FormErrorMessages';
import FormRules from '@enums/FormRules';

const TextInputBirthday = ({ setIsValid, showFormErrors }) => {

  const [keyPressed, setKeyPressed] = useState('');
  const [birthday, setBirthday] = useState(useAppSelector((state) => state.accRegistration.bday));

  const dispatch = useAppDispatch();

  const labels = {'birthday': 'Data de Nascimento'};
  const { validate, isFieldInError, getErrorsInField } =
  useValidation({
    state: { birthday },
    messages: FormErrorMessages,
    rules: FormRules,
    deviceLocale: 'ptBR',
    labels: labels
  });

  const handleFormValidation = () => {
    if (validate({
      birthday: {birthday: birthday, required: true},
    })){
      setIsValid(true);
    }
    else{
      setIsValid(false);
    }
    dispatch(updateBday(birthday));
  }

  useEffect(() => {

    if (keyPressed !== 'Backspace') {

      const bday = birthday.replace(/[^\d]/g, "");

      switch(bday.length){
        case 3:
          setBirthday(bday.slice(0,2) + '/' + bday.slice(2));
          break;
        case 5:

          setBirthday(bday.slice(0,2) + '/' + bday.slice(2,4) + '/' + bday.slice(4));
          break;
      }
    }

    setKeyPressed('');
  }, [birthday])

  const props = {
    label:'Data de Nascimento',
    placeholder: 'DD/MM/YYYY',
    onEndEditing: handleFormValidation,
    value: birthday,
    onKeyPress: (e) => setKeyPressed(e.nativeEvent.key),
    handleValidation: handleFormValidation,
    onChangeText: setBirthday,
    keyboardType: 'numeric',
    maxLength: 10,
    errorField: 'birthday',
    isFieldInError: isFieldInError('birthday'),
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

export default TextInputBirthday;