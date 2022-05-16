import React, {useState, useEffect} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { updateCPF } from '@store/features/accRegistrationSlice'
import TextInputCustom from '@components/inputs/TextInputCustom'
import FormErrorMessages from '@enums/FormErrorMessages';
import FormRules from '@enums/FormRules'

const TextInputCPF = ( props ) => {

  const [keyPressed, setKeyPressed] = useState('');
  const [cpf, setCPF] = useState('');

  const dispatch = useAppDispatch();

  const labels = {'cpf': 'CPF'};
  const { validate, isFieldInError, getErrorsInField } =
  useValidation({
    state: { cpf },
    messages: FormErrorMessages,
    rules: FormRules,
    deviceLocale: 'ptBR',
    labels: labels
  });

  const handleFormValidation = () => {
    if (validate({
      cpf: {required: true, cpf:true}
    })){
      props.setIsValid(true);
    }
    else{
      props.setIsValid(false);
    }
    dispatch(updateCPF(cpf));
  }

  useEffect(() => {
    if (keyPressed !== 'Backspace') {

      const cpfClean = cpf.replace(/[^\d]/g, "");

      switch(cpfClean.length){
        case 4:
          setCPF(
            cpfClean.slice(0,3) + '.' + 
            cpfClean.slice(3)
          );
          break;
        case 6:
          setCPF(
            cpfClean.slice(0,3) + '.' + 
            cpfClean.slice(3,6) + '.' +
            cpfClean.slice(6)
          );
          break;
        case 10:
          setCPF(
            cpfClean.slice(0,3) + '.' + 
            cpfClean.slice(3,6) + '.' + 
            cpfClean.slice(6,9) + '-' +
            cpfClean.slice(9)
          );
          break;
      }
    }

    setKeyPressed('');
  }, [cpf])

  const propsToInput = {
    label:'CPF',
    placeholder: 'Seu CPF',
    onEndEditing: handleFormValidation,
    value: cpf,
    onKeyPress: (e) => setKeyPressed(e.nativeEvent.key),
    handleValidation: handleFormValidation,
    onChangeText: setCPF,
    keyboardType: 'numeric',
    maxLength: 14,
    errorField: 'cpf',
    isFieldInError: isFieldInError('cpf'),
    getErrorsInField: getErrorsInField,
    showFormErrors: props.showFormErrors,
    showRegistrationError: props.showRegistrationError
  }

  useEffect(() => {
    handleFormValidation();
  },[])

  return ( 
    <>
      <TextInputCustom
        {...propsToInput}
      />
    </>
  )
}

export default TextInputCPF;