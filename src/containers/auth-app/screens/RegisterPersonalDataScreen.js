import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

//text input fields
import TextInputName from '../../../components/TextInputName'
import TextInputCPF from '../../../components/TextInputCPF';
import TextInputBirthday from '../../../components/TextInputBirthday';
import TextInputPhoneNumber from '../../../components/TextInputPhoneNumber';

//components
import ButtonOne from '../../../components/atoms/ButtonOne';
import Breadcrumb from '../../../components/Breadcrumb';

//icons
import personalDataIcon from '../../../../assets/icons/personaldata_icon.png'
import GreyedOutAccessDataIcon from '../../../../assets/icons/accessdatagrayedout_icon.png'

const RegisterPersonalDataScreen = ({ navigation }) => {

  const handleButtonAction = () => {
    navigation.navigate('RegisterAccessDataScreen');
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
          icon={GreyedOutAccessDataIcon}
          greyout={true}
        />
      </View>
      <View style={styles.inputFields}>
        <Text style={styles.title}>Queremos te Conhecer!</Text>
        <TextInputName />
        <TextInputCPF />
        <TextInputBirthday />
        <TextInputPhoneNumber />
      </View>
      <View style={styles.buttonArea}>
        <ButtonOne
          buttonAction={handleButtonAction}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFields: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
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

export default RegisterPersonalDataScreen;