import { 
  View,
  StyleSheet,
} from 'react-native'
import 
  React, 
  {
    useState,
    useRef
  } 
from 'react'

//components
import UserInfoView from '@components/UserInfoView'
import SeparatorStraightLine from '@components/atoms/SeparatorStraightLine'
import SelectCustomButton from '@components/atoms/SelectCustomButton'
import ButtonOne from '@components/atoms/ButtonOne'
import ErrorMessage from '@components/atoms/ErrorMessage'
import CustomRecaptcha from '@src/components/CustomRecaptcha'

//Firebase
import { 
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification 
} from 'firebase/auth';

//redux
import {
  updateVerificationId,
} from '@store/features/phoneAuthSlice';
import { useAppSelector, useAppDispatch } from '@hooks/hooks';

// Firebase references
const auth = getAuth();

//helpers
import { saveObjectUserToDB, updateUserInDb } from '@helpers/DbHelper'
import { validatePhone, createUserWithEmail } from '@src/helpers/FirebaseHelper'

const AccountValidationScreen = ({navigation}) => {

  //redux
  const accRegistration = useAppSelector((state) => state.accRegistration);
  const verificationId = useAppSelector((state) => state.phoneAuth.verificationId);
  const dispatch = useAppDispatch();

  //validation
  const [phoneValidation, setPhoneValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //phone auth
  const recaptchaVerifier = useRef(null);


  //email auth
  const handleDataEditing = () => {
    navigation.navigate('RegisterPersonalDataScreen')
  }

  const handlePhoneValidationSelection = () => {
    setPhoneValidation(true);
    setEmailValidation(false);
  }

  const handleEmailValidationSelection = () => {
    setEmailValidation(true);
    setPhoneValidation(false);
  }

  const handleOnEditPhoneNumber = () => {
    navigation.navigate('RegisterPersonalDataScreen')
  }

  const handleOnEditEmail = () => {
    navigation.navigate('RegisterAccessDataScreen')
  }

  const handleVerification = async () => {

    if(phoneValidation){

      const verificationCodeSent = await validatePhone(
        recaptchaVerifier,
        accRegistration.countryCode,
        accRegistration.number,
      );

      if (verificationCodeSent.verificationId){
        setErrorMessage('');
        dispatch(updateVerificationId(verificationCodeSent.verificationId));
        navigation.navigate('AccountPhoneVerificationScreen');
      }
      else if (verificationCodeSent.errorMessage){
        setErrorMessage(verificationCodeSent.errorMessage);
      }
    }
    else if (emailValidation){

      const userCreated = await createUserWithEmail(accRegistration.email, accRegistration.newPassword);
      
      if (userCreated.error){
        setErrorMessage(userCreated.error)
        return
      }

      const authProvider = {
        provider: 'EMAIL',
        info: {
          firebaseUid: auth.currentUser.uid
        }
      }

      if (accRegistration.authProvidersRegistered.length > 0){
        updateUserInDb(accRegistration, authProvider);
      }
      else{
        saveObjectUserToDB(accRegistration, authProvider);
      }
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <UserInfoView
          editData={handleDataEditing}
        />
      </View>
      <View style={styles.separator}>
        <SeparatorStraightLine />
      </View>
      <View style={styles.validate}>
        <SelectCustomButton
          title='Celular'
          value={accRegistration.countryCode + accRegistration.number}
          active={phoneValidation}
          setActive={handlePhoneValidationSelection}
          onEdit={handleOnEditPhoneNumber}
        />
        <SelectCustomButton
          title='E-mail'
          value={accRegistration.email}
          active={emailValidation}
          setActive={handleEmailValidationSelection}
          onEdit={handleOnEditEmail}
        />
        <ErrorMessage
          message={errorMessage}
        />
        <CustomRecaptcha 
          recaptchaVerifierReference={recaptchaVerifier}
        />
      </View>
      <View style={styles.button}>
        <ButtonOne 
          text='Continuar'
          buttonAction={handleVerification}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  userInfo: {
    flex: 1,
    paddingHorizontal: 50,
  },
  validate:{
    flex: 2,
    flexDirection: 'column',
    paddingHorizontal: 50,
    top: 100
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20
  },
  separator: {
    top: 20
  }
})

export default AccountValidationScreen;