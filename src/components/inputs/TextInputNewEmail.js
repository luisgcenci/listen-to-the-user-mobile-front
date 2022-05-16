import React, {useState, useEffect} from 'react';
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { updateEmail } from '@store/features/accRegistrationSlice'
import TextInputCustom from '@components/inputs/TextInputCustom'

const TextInputNewEmail = ( props ) => {

  const [email, setEmail] = useState(useAppSelector((state) => state.accRegistration.email));

  const dispatch = useAppDispatch();

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { email },
    deviceLocale: 'ptBR',
  });

  const handleFormValidation = () => {
    if (validate({
      email: {required: true, email: true}
    })){
      props.setIsValid(true);
    }
    else{
      props.setIsValid(false);
    }
    dispatch(updateEmail(email));
  }

  const propsToInput = {
    label: 'E-mail',
    placeholder: 'email@example.com',
    value: email,
    onChangeText: setEmail,
    handleValidation: handleFormValidation,
    autoCapitalize: 'none',
    textContentType: 'emailAddress',
    errorField: 'email',
    isFieldInError: isFieldInError('email'),
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

export default TextInputNewEmail;