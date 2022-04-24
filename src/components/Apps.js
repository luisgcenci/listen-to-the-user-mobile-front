import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView } from 'react-native';
import AuthApp from '../containers/auth-app/AuthApp';
import InternalApp from '../containers/internal-app/InternalApp';

//firebase imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();

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