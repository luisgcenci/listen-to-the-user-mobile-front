// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAlkpotVbqxbyidX-jRkFkZnAdSDroet6M',
  authDomain: 'theprocess-e6284.firebaseapp.com',
  projectId: 'theprocess-e6284',
  storageBucket: 'theprocess-e6284.appspot.com',
  messagingSenderId: '249009651457',
  appId: '1:249009651457:web:91409c31936fece8282500',
  measurementId: 'G-GY7P5RZMBP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };


