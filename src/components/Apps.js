import React from 'react'
import { Text, SafeAreaView } from 'react-native';

//apps imports
import AuthApp from '@auth-app/AuthApp';
import InternalApp from '@internal-app/InternalApp';

//firebase imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@src/containers/firebase/config';

const Apps = () => {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <SafeAreaView>
        <Text> Loading... </Text>
      </SafeAreaView>
    );
  }
  
  else if (user) {
    return (
      <InternalApp/>
    );
  }
  
  return (
    <AuthApp />
  )
};

export default Apps;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();