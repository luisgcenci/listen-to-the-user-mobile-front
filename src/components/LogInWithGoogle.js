import React from 'react'
import {
    StyleSheet,
    Text,
    Pressable 
} from 'react-native'

//redux imports
import { 
    updateRegisteringAccount,
    updateAuthStatus,
    updateUserInfo
} from '../store/features/AuthAppSlice';
import { useAppDispatch } from '../hooks/hooks';

//google auth imports
import * as Google from 'expo-google-app-auth';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

const axios = require('axios');

const LogInWithGoogle = () => {

    const auth = getAuth();

    const dispatch = useAppDispatch();

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
            // androidClientId: 'YOUR_CLIENT_ID_HERE',
            behavior: 'web',
            iosClientId: '286485084747-hmeo477ukevgadkqdcdo2196bduod8c5.apps.googleusercontent.com',
            scopes: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read'],
            });
            
            if (result.type === 'success') {
            onSignIn(result);
            } else {
            return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    const onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.

        try{
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                );

                // Sign in with credential from the Google user.
                signInWithCredential(auth, credential)
                .then(() => {
                dispatch(updateUserInfo(googleUser));
                dispatch(updateAuthStatus(true));
                }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The credential that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        
                console.log('error');
                });
            } 
            else {
                dispatch(updateUserInfo(googleUser));
                dispatch(updateAuthStatus(true));
                console.log('User already signed-in Firebase.');
            }
            });
        }catch(e){
            console.log(e);
        }
        
    }

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <Pressable
            onPress={ () => dispatch(updateRegisteringAccount(false)) && signInWithGoogleAsync()}
            style={styles.button}
        >
            <Text>Log in with Google</Text>
        </Pressable>
    )
}

export default LogInWithGoogle

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightpink',
        marginVertical: 10,
    },
})