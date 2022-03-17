import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';
import firebase from '../../firebase/config';

WebBrowser.maybeCompleteAuthSession();

const GoogleLogIn = () => {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '286485084747-f2mvpk4i51pbnrn5k5u9r1jr9gdsfmd6.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const auth = firebase.auth();
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = provider.credential(id_token);
      
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}

export default GoogleLogIn;