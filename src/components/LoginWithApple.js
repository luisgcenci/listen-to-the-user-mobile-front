import React from 'react'
import {
    StyleSheet,
    Text,
    Pressable,
    Image
} from 'react-native'

//apple auth imports
import { getAuth } from 'firebase/auth';
import { useSignInWithApple } from 'react-firebase-hooks/auth';

//back-end import
import { saveClientUserToDB } from '../helpers'

const axios = require('axios');

const LogInWithApple = () => {

    const auth = getAuth();

    const [signInWithApple, user, loading, error] = useSignInWithApple(auth);

    if (error){
        console.log(error.message);
    }
    else if (loading){
        return (
            <SafeAreaView>
                <Text> Loading... </Text>
            </SafeAreaView>
        )
    }
    else if (user){
        console.log(user);
    }

    // const saveAccountToDB = async (googleUser) => {
    //     const accessToken = googleUser.accessToken;
    //     const name = googleUser.user.name;
    //     const email = googleUser.user.email;
    //     const password = '';
    //     const [dateOfBirth, number] = await getMoreGoogleUserInfo(accessToken);

    //     saveClientUserToDB(
    //         name,
    //         dateOfBirth,
    //         email,
    //         password,
    //         number
    //     );
    // }

    return (
        <Pressable
            onPress={() => signInWithApple()}
            style={styles.button}
        >
            <Image source={require('../../assets/icons/apple_icon.png')} style={styles.image}/>   
            <Text style={styles.text}>Entrar com Apple</Text>
        </Pressable>
    )
}

export default LogInWithApple

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        height: 45,
        padding: 10,
        borderRadius: 40,
        opacity: 0.4,
    },
    text: {
        color: '#FFFFFF',
        paddingHorizontal: 80,
    },
    image: {
        marginLeft: 10
    }
})