import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

//text input fields
import TextInputEmail from '../../../components/TextInputEmail'
import TextInputPassword from '../../../components/TextInputPassword';
import TextInputPasswordConfirmation from '../../../components/TextInputPasswordConfirmation';

//components
import ButtonOne from '../../../components/atoms/ButtonOne';
import Breadcrumb from '../../../components/Breadcrumb';

//icons
import personalDataIcon from '../../../../assets/icons/personaldata_icon.png'
import AccessDataIcon from '../../../../assets/icons/accessdata_icon.png'

const RegisterAccessDataScreen = ({navigation}) => {

  const handleButtonAction = () => {
    navigation.navigate('AccountValidationScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumb}>
        <Breadcrumb
          text='Dados Pessoais'
          icon={personalDataIcon}
          greyout={false}
        />
        <Breadcrumb
          text='Dados de Acesso'
          icon={AccessDataIcon}
          greyout={false}
        />
      </View>
      <View style={styles.inputFields}>
        <Text style={styles.title}>Queremos te conhecer!</Text>
        <View style={styles.inputView}>
          <TextInputEmail />
        </View>
        <View style={styles.inputView}>
          <TextInputPassword />
        </View>
        <View style={styles.inputView}>
          <TextInputPasswordConfirmation />
        </View>
        {/* <TextInputPasswordConfirmation /> */}
      </View>
      <View style={styles.buttonArea}>
        <ButtonOne
          text='Continuar'
          buttonAction={handleButtonAction}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFields: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
  },
  breadcrumb: {
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    top: 40
  },
  buttonArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20
  }
});

export default RegisterAccessDataScreen;