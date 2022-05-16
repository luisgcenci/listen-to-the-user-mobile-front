import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

//form validation
import { useValidation } from 'react-native-form-validator';

//redux
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { updateNumber, updateCountryCode } from '@store/features/accRegistrationSlice';

//components
import TextInputCustom from '@components/inputs/TextInputCustom';
import CountryCodePicker from '@components/CountryCodePicker';

//enums
import FormErrorMessages from '@enums/FormErrorMessages';
import FormRules from '@enums/FormRules';

const TextInputPhoneNumber = ( props ) => {

  const [countryCode, setCountryCode] = useState(useAppSelector((state) => state.accRegistration.countryCode))
  const [phoneNumber, setPhoneNumber] = useState(useAppSelector((state) => state.accRegistration.number));;

  const dispatch = useAppDispatch();

  const labels = {'phoneNumber': 'Celular'};
  const { validate, isFieldInError, getErrorsInField } =
  useValidation({
    state: { phoneNumber },
    messages: FormErrorMessages,
    rules: FormRules,
    deviceLocale: 'ptBR',
    labels: labels
  });

  const handleFormValidation = () => {
    if (validate({
      phoneNumber: {required: true}
    })){
      props.setIsValid(true);
    }
    else {
      props.setIsValid(false);
    }

    let clearPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    dispatch(updateNumber(clearPhoneNumber));
    dispatch(updateCountryCode(countryCode));
  }

  const propsToInput = {
    label:'Celular',
    placeholder: '',
    onEndEditing: handleFormValidation,
    value: phoneNumber,
    onChangeText: setPhoneNumber,
    handleValidation: handleFormValidation,
    textContentType: 'telephoneNumber',
    keyboardType: 'phone-pad',
    maxLength: 15,
    errorField: 'phoneNumber',
    isFieldInError: isFieldInError('phoneNumber'),
    getErrorsInField: getErrorsInField,
    showFormErrors: props.showFormErrors,
    showRegistrationError: props.showRegistrationError
  }

  useEffect(() => {
    handleFormValidation();
  },[countryCode])

  return (
    <View style={styles.phoneInput}>
      <CountryCodePicker
        defaultValue={countryCode}
        setVaule={setCountryCode}
      />
      <View style={styles.input}>
        <TextInputCustom
          {...propsToInput}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  phoneInput: {
    width: '90%',
    flexDirection: 'row',

  },
  input:{
    width: '75%',
    alignItems: 'flex-end',
  }
})

export default TextInputPhoneNumber;