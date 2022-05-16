import React, { useRef } from 'react'
import { 
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard
} from 'react-native'
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';

const app = getApp();

if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

const CustomRecaptcha = (props) => {
    const firebaseConfig = app ? app.options : undefined;
    const attemptInvisibleVerification = false;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.recaptcha}>
                <FirebaseRecaptchaVerifierModal
                    ref={props.recaptchaVerifierReference}
                    firebaseConfig={firebaseConfig}
                />
                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  recaptcha: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})

export default CustomRecaptcha