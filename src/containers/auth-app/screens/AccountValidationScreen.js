import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useAppSelector } from '../../../hooks/hooks'

//components
import UserInfoView from '../../../components/UserInfoView'
import SeparatorStraightLine from '../../../components/atoms/SeparatorStraightLine'
import SelectCustomButton from '../../../components/atoms/SelectCustomButton'
import ButtonOne from '../../../components/atoms/ButtonOne'

const AccountValidationScreen = ({navigation}) => {

  const phoneNumber = useAppSelector((state) => state.accRegistration.number);
  const email = useAppSelector((state) => state.accRegistration.email);

  const [phoneValidation, setPhoneValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(false);

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
          value={phoneNumber}
          active={phoneValidation}
          setActive={handlePhoneValidationSelection}
          onEdit={handleOnEditPhoneNumber}
        />
        <SelectCustomButton
          title='E-mail'
          value={email}
          active={emailValidation}
          setActive={handleEmailValidationSelection}
          onEdit={handleOnEditEmail}
        />

      </View>
      <View style={styles.button}>
        <ButtonOne 
          text='Continuar'
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