import { 
  View,
  Text, 
  StyleSheet,
  TextInput,
} from 'react-native'
import React, {useEffect, useState, useRef} from 'react'

//components
import ButtonThree from '@components/atoms/ButtonThree'
import ButtonOne from '@components/atoms/ButtonOne'
import ErrorMessage from '@components/atoms/ErrorMessage'

//recaptcha for phone auth
import CustomRecaptcha from '@src/components/CustomRecaptcha'

//helpers
import { saveObjectUserToDB, updateUserInDb } from '@helpers/DbHelper'
import { validatePhone } from '@src/helpers/FirebaseHelper'
import { 
  signUserWithCredential,
  linkPhoneWithEmailCredential
} from '@src/helpers/FirebaseHelper'

//firebase
import { getAuth } from 'firebase/auth'

//redux
import { useAppSelector, useAppDispatch } from '@hooks/hooks'
import { updateVerificationId } from '@src/store/features/phoneAuthSlice'

const AccountPhoneVerificationScreen = () => {

  //timer
  const [timer, setTimer] = useState(5);

  //errors
  const [errorMessage, setErrorMessage] = useState('');

  //handle code input
  const [fullCodeInput, setFullCodeInput] = useState('');
  const [codeInputOne, setCodeInputOne] = useState('');
  const [codeInputTwo, setCodeInputTwo] = useState('');
  const [codeInputThree, setCodeInputThree] = useState('');
  const [codeInputFour, setCodeInputFour] = useState('');
  const [codeInputFive, setCodeInputFive] = useState('');
  const [codeInputSix, setCodeInputSix] = useState('');

  const refCodeInputTwo = useRef();
  const refCodeInputThree = useRef();
  const refCodeInputFour = useRef();
  const refCodeInputFive = useRef();
  const refCodeInputSix = useRef();

  //phone verification
  const dispatch = useAppDispatch();
  const accRegistration = useAppSelector((state) => state.accRegistration);
  const verificationId = useAppSelector((state) => state.phoneAuth.verificationId);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [timer])

  useEffect(() => {

    setFullCodeInput(
      codeInputOne + codeInputTwo + 
      codeInputThree + codeInputFour +
      codeInputFive + codeInputSix  
    );
  }, [codeInputOne, codeInputTwo, codeInputThree, codeInputFour, codeInputFive, codeInputSix]);

  const handleInputChange = (text, nextInput) => {

    text.length > 0 && nextInput.current.focus();
  }
  
  const handleResendCodeVerification = async () => {

    const verificationCodeSent = await validatePhone(
      recaptchaVerifier,
      accRegistration.countryCode,
      accRegistration.number,
    );

    if (verificationCodeSent.verificationId){
      setErrorMessage('');
      dispatch(updateVerificationId(verificationCodeSent.verificationId));
      setTimer(5);
    }
    else if (verificationCodeSent.errorMessage){
      setErrorMessage(verificationCodeSent.errorMessage);
    }
  }

  const handleCodeVerification = async () => {

    //code expired
    if (timer <= 0){
      setErrorMessage('Seu código de verificação expirou, por favor re-enviar código.');
      return 
    }

    //sign user with phone
    const signedWithPhoneCredential = await signUserWithCredential(verificationId, fullCodeInput);
    
    if (signedWithPhoneCredential.error){
      setErrorMessage(signedWithPhoneCredential.error);
      return
    }

    //link phone with email
    const credentialsLinked = await linkPhoneWithEmailCredential(accRegistration.email, accRegistration.newPassword);

    if (credentialsLinked.error){
      setErrorMessage(credentialsLinked.error);
      return
    }

    const auth = getAuth();

    const authProvider = [
      {
        provider: 'EMAIL',
        info: {
          firebaseUid: auth.currentUser.uid
        }
      },
      {
        provider: 'PHONE',
        info: {
          firebaseUid: auth.currentUser.uid
        }
      }
    ]

    if (accRegistration.authProvidersRegistered.length > 0){
      updateUserInDb(accRegistration, authProvider);
    }
    else{
      saveObjectUserToDB(accRegistration, authProvider);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.boldText}>Enviamos o código de validação</Text>
        <Text style={styles.boldText}>para seu {accRegistration.countryCode + accRegistration.number}</Text>
      </View>
      <View style={styles.code}>
        <View style={styles.retrieveCode}>
          <Text style={styles.retrieveCodeTitle}>Não recebeu o código?</Text>
          <ButtonThree
            buttonAction={handleResendCodeVerification}
            text='Reenviar código'
          />
        </View>
        <View style={styles.codeTitle}>
          <Text style={styles.boldText}>Por favor, informe abaixo o código</Text>
          <Text style={styles.boldText}>enviado para validação</Text>
        </View>
        <View style={styles.codeTimer}>
          <Text style={styles.timerTitle}>O código expira em:</Text>
          <Text style={styles.timerValue}>
            {parseInt(timer / 60) + ':'}
            {timer % 60 < 10 && timer % 60 > 0 ? '0' + timer % 60: timer % 60}
            {timer % 60 === 0? '0' : ''}
          </Text>
        </View>
        <View style={styles.codeInputView}>
          <TextInput
            style={styles.codeInput}
            maxLength={1}
            onChangeText={
              (text) => {
                setCodeInputOne(text);
                handleInputChange(text, refCodeInputTwo);
              }
            }
            keyboardType='phone-pad'
          />
          <TextInput
            ref={refCodeInputTwo}
            style={styles.codeInput}
            maxLength={1}
            onChangeText={
              (text) => {
                setCodeInputTwo(text);
                handleInputChange(text, refCodeInputThree);
              }
            }
            keyboardType='phone-pad'
          />
          <TextInput
            ref={refCodeInputThree}
            style={styles.codeInput}
            maxLength={1}
            onChangeText={
              (text) => {
                setCodeInputThree(text);
                handleInputChange(text, refCodeInputFour);
              }
            }
            keyboardType='phone-pad'
          />
          <TextInput
            ref={refCodeInputFour}
            style={styles.codeInput}
            maxLength={1}
            onChangeText={
              (text) => {
                setCodeInputFour(text);
                handleInputChange(text, refCodeInputFive);
              }
            }
            keyboardType='phone-pad'
          />
          <TextInput
            ref={refCodeInputFive}
            style={styles.codeInput}
            maxLength={1}
            onChangeText={
              (text) => {
                setCodeInputFive(text);
                handleInputChange(text, refCodeInputSix);
              }
            }
            keyboardType='phone-pad'
          />
          <TextInput
            ref={refCodeInputSix}
            style={styles.codeInput}
            maxLength={1}
            onChangeText={
              (text) => {
                setCodeInputSix(text);
                text.length > 0 && refCodeInputSix.current.blur();
              }
            }
            keyboardType='phone-pad'
          />
        </View>
        <ErrorMessage
          message={errorMessage}
        />
      </View>
      <View style={styles.nextButton}>
        <ButtonOne
          buttonAction={handleCodeVerification}
          text='Registrar Conta'
        />
      </View>
      <CustomRecaptcha 
        recaptchaVerifierReference={recaptchaVerifier}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  intro: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  code: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
  },
  retrieveCode: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  retrieveCodeTitle: {
    paddingBottom: 20
  },
  codeTitle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  codeTimer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  timerTitle: {
    color: 'red',
    fontSize: 12,
    paddingBottom: 10
  },
  timerValue: {
    color: 'red',
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold'
  },
  codeInputView: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    textAlign: 'center',
    fontSize: 36,
    width: 45
  },
  recaptcha: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})

export default AccountPhoneVerificationScreen;