import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonOne from '@src/components/atoms/ButtonOne'
import ButtonTwo from '@src/components/atoms/ButtonTwo'

const WelcomeScreen = ({ navigation }) => {

    const handleSignIn = () => {
        navigation.navigate('SignInScreen');
    }

    const handleSignUp = () => {
        navigation.navigate('RegisterPersonalDataScreen');
    }

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('@assets/Welcome.png')}/>
            </View>
            <View style={styles.buttons}>
                <ButtonOne 
                    text='Criar Conta'
                    buttonAction={handleSignUp}
                    marginVertical={10}
                />
                <ButtonOne
                    text='Entrar'
                    buttonAction={handleSignIn}
                    backgroundColor='#FFFFFF'
                    borderColor='#000000'
                    textColor='#000000'
                    marginVertical={10}
                />
            </View>
        </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    image: {
        flex: 2
    },
    buttons: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    }
})