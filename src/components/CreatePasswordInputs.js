import { View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import TextInputNewPassword from '@components/inputs/TextInputNewPassword'
import TextInputPasswordConfirmation from '@components/inputs/TextInputPasswordConfirmation'
import { updateNewPassword } from '@store/features/accRegistrationSlice'
import { useValidation } from 'react-native-form-validator';
import { useAppDispatch } from '@hooks/hooks';

const CreatePasswordInputs = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useAppDispatch();

    const labels = {
        'newPassword': 'Senha',
        'confirmPassword': 'Confirme sua senha'
    };

    const { validate, isFieldInError, getErrorsInField } =
    useValidation({
      state: { newPassword, confirmPassword },
      deviceLocale: 'ptBR',
      labels: labels
    });
  
    const handleFormValidation = () => {
      if (validate({
        newPassword: {required: true, equalPassword: confirmPassword, minlength: 6},
        confirmPassword: {required: true, equalPassword: newPassword, minlength: 6},
      })){
        props.setNewPasswordIsValid(true);
      }
      else{
        props.setNewPasswordIsValid(false);
      }
      dispatch(updateNewPassword(newPassword));
    }

    const propsNewPassword = {
        newPassword: newPassword,
        setNewPassword: setNewPassword,
        handleFormValidation: handleFormValidation,
        showFormErrors: props.showFormErrors,
        isFieldInError: isFieldInError('newPassword'),
        getErrorsInField: getErrorsInField
    }

    const propsConfirmPassword = {
        confirmPassword: confirmPassword,
        setConfirmPassword: setConfirmPassword,
        handleFormValidation: handleFormValidation,
        showFormErrors: props.showFormErrors,
        isFieldInError: isFieldInError('confirmPassword'),
        getErrorsInField: getErrorsInField
    }

    return (
    <>
        <View style={styles.inputView}>
            <TextInputNewPassword
                {...propsNewPassword}
            />
        </View>
        <View style={styles.inputView}>
            <TextInputPasswordConfirmation
                {...propsConfirmPassword}
            />
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        alignItems: 'center',
    }
})

export default CreatePasswordInputs