import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable
} from 'react-native';
import { updateRegisteringAccount } from '../../../store/features/AuthAppSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import firebase from '../../firebase/config';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const WelcomeScreen = ({ navigation }) => {

  const dispatch = useAppDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
    clientId: '286485084747-f2mvpk4i51pbnrn5k5u9r1jr9gdsfmd6.apps.googleusercontent.com',
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = provider.credential(id_token);

      firebase.auth().signInWithCredential(credential).then((result) => {
        console.log(result);
      }).catch((e) => {
        console.log(e.message);
      });
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome</Text>
      <Pressable
        onPress={ () => dispatch(updateRegisteringAccount(true)) && navigation.navigate("RegisterNameScreen")}
        style={styles.button}
      >
        <Text>Criar Contaa</Text>
      </Pressable>
      <Pressable
        onPress={ () => dispatch(updateRegisteringAccount(false)) && navigation.navigate("ValidatePhoneScreen")}
        style={styles.button}
      >
        <Text>Log in with Phone Number</Text>
      </Pressable>
      <Pressable
        disabled={!request}
        onPress={ () => dispatch(updateRegisteringAccount(false)) && promptAsync()}
        style={styles.button}
      >
        <Text>Log in with Google</Text>
      </Pressable>
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