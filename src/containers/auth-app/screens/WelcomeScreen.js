import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable
} from 'react-native';

//redux imports
import { 
  updateRegisteringAccount,
} from '../../../store/features/AuthAppSlice';

import LogInWithGoogle from '../../../components/LogInWithGoogle';

const WelcomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome</Text>
      <Pressable
        onPress={ () => dispatch(updateRegisteringAccount(true)) && navigation.navigate("RegisterNameScreen")}
        style={styles.button}
      >
        <Text>Criar Conta</Text>
      </Pressable>
      <Pressable
        onPress={ () => dispatch(updateRegisteringAccount(false)) && navigation.navigate("ValidatePhoneScreen")}
        style={styles.button}
      >
        <Text>Log in with Phone Number</Text>
      </Pressable>
      <LogInWithGoogle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'lightpink',
    marginVertical: 10,
  },
});

export default WelcomeScreen;