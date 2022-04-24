import React from 'react'
import {
    StyleSheet,
    Text,
    Pressable,
    Image
} from 'react-native'

const LogInWithFacebook = () => {

    return (
        <Pressable
            style={styles.button}
        >
            <Image source={require('../../assets/icons/facebook_icon.png')} style={styles.image}/>   
            <Text style={styles.text}>Entrar com facebook</Text>
        </Pressable>
    )
}

export default LogInWithFacebook

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B5998',
        height: 45,
        padding: 10,
        opacity: 0.4,
        borderRadius: 40,
    },
    text: {
        color: '#FFFFFF',
        paddingHorizontal: 80,
    },
    image: {
        marginLeft: 10
    }
})