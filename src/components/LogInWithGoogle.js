import React from 'react'
import {
    StyleSheet,
    Text,
    Pressable,
    Image
} from 'react-native'

//google auth imports
import * as Google from 'expo-google-app-auth';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

//back-end import
import { saveClientUserToDB } from '../helpers'

const axios = require('axios');

const LogInWithGoogle = () => {

    const auth = getAuth();

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
            // androidClientId: 'YOUR_CLIENT_ID_HERE',
            behavior: 'web',
            iosClientId: '286485084747-hmeo477ukevgadkqdcdo2196bduod8c5.apps.googleusercontent.com',
            scopes: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/user.birthday.read',
                'https://www.googleapis.com/auth/user.phonenumbers.read'
            ],
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
                        saveAccountToDB(googleUser);
                    }).catch((error) => {
                    // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.email;
                        // The credential that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        // ...
                        console.log(errorMessage);
                    });
                }
            })
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

    const saveAccountToDB = async (googleUser) => {
        const accessToken = googleUser.accessToken;
        const name = googleUser.user.name;
        const email = googleUser.user.email;
        const password = '';
        const [dateOfBirth, number] = await getMoreGoogleUserInfo(accessToken);

        saveClientUserToDB(
            name,
            dateOfBirth,
            email,
            password,
            number
        );
    }

    const getMoreGoogleUserInfo = async (accessToken) => {

        const config = {
            headers: { Authorization: `Bearer ${accessToken}`},
            params: {
                key: 'AIzaSyAfJEyRoysCpGdD2zkEwsR_Dj9wM5Ya1gQ',
                personFields: 'birthdays,phoneNumbers'
            }
        }

        try{
            const response = await axios.get(
                'https://people.googleapis.com/v1/people/me',
                config
            )
            
            const test = 'birthdays' in response.data;

            const birthdays = 'birthdays' in response.data ? response.data.birthdays : null;
            const phoneNumbers = 'phoneNumbers' in response.data ? response.data.phoneNumbers : null;
            let bDay = null;
            let bMonth = null;
            let bYear = null;
            let phoneNumber = null;
            
            birthdays && birthdays.map( (bday) => {
                const date = bday.date;
                bDay = bDay? bDay : date.day;
                bMonth = bMonth? bMonth : date.month;
                bYear = bYear? bYear : date.year;
            })
    
            phoneNumbers && phoneNumbers.map ( (number) => {
                phoneNumber = phoneNumber ? phoneNumber : number.value;
            })
    
            return [`${bDay}/${bMonth}/${bYear}`, phoneNumber];

        } catch(e) {
            return [null, null];
        }
    }

    return (
        <Pressable
            onPress={() => signInWithGoogleAsync()}
            style={styles.button}
        >
            <Image source={require('../../assets/icons/google_icon.png')} style={styles.image}/>   
            <Text style={styles.text}>Entrar com Google</Text>
        </Pressable>
    )
}

export default LogInWithGoogle

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 45,
        padding: 10,
        borderRadius: 40,
        borderColor: '#CACACA',
        borderWidth: 1
    },
    text: {
        color: '#000000',
        paddingHorizontal: 80,
    },
    image: {
        marginLeft: 10
    }
})