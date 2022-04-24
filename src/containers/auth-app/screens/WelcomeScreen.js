import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TextInput
} from 'react-native';

//redux imports
import { useAppDispatch } from '../../../hooks/hooks';
import { 
  updateRegisteringAccount,
} from '../../../store/features/AuthAppSlice';

//social media auth imports
import LogInWithGoogle from '../../../components/LogInWithGoogle';
import LogInWithApple from '../../../components/LoginWithApple';
import LogInWithFacebook from '../../../components/LoginWithFacebook';

//buttons
import ButtonOne from '../../../components/atoms/ButtonOne';
import ButtonTwo from '../../../components/atoms/ButtonTwo';

//input fields
import TextInputEmail from '../../../components/TextInputEmail';
import TextInputPassword from '../../../components/TextInputPassword';

//other components
import Separator from '../../../components/atoms/Separator';

const WelcomeScreen = ({ navigation }) => {
  
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = () => {
    dispatch(updateRegisteringAccount(false));
    navigation.navigate("RegisterPersonalDataScreen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.socialAuth}>
        <LogInWithFacebook />
        <LogInWithGoogle />
        <LogInWithApple />
      </View>
      <Separator />
      <View style={styles.emailAuth}>
        <View style={styles.inputView}>
          <TextInputEmail />
        </View>
        <View style={styles.inputView}>
          <TextInputPassword />
        </View>
        <Text style={styles.forgotPasswordText}>
          Esqueci a minha senha
        </Text>
        <ButtonTwo 
          text='Entrar'
        />
        <ButtonOne 
          text='Criar Conta'
          buttonAction={handleCreateAccount}
        />
        {/* <Pressable
          onPress={ () => dispatch(updateRegisteringAccount(false)) && navigation.navigate("ValidatePhoneScreen")}
          style={styles.button}
        >
          <Text>Log in with Phone Number</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialAuth: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  emailAuth: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    paddingVertical: 50
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPasswordText: {
    textDecorationLine:'underline',
    opacity: 0.4
  }
});

export default WelcomeScreen;