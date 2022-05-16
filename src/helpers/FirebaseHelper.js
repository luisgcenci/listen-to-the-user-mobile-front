
//firebase
import { 
    getAuth,
    PhoneAuthProvider,
    signInWithCredential,
    linkWithCredential,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    EmailAuthProvider
} from 'firebase/auth';
import { getApp } from 'firebase/app';

//firebase references
const app = getApp();
const auth = getAuth();

if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

export const validatePhone = async (_recaptchaVerifier, _countryCode, _number) => {

    return new Promise((resolve, reject) => {
        const phoneProvider = new PhoneAuthProvider(auth);
        let fullNumber = _countryCode + _number;

        phoneProvider.verifyPhoneNumber(
            fullNumber,
            _recaptchaVerifier.current,
        ).then((verificationId) => {
            resolve({verificationId: verificationId});
        }).catch((e) => {
        switch (e.code) {
            case 'ERR_FIREBASE_RECAPTCHA_CANCEL':
                resolve({errorMessage: 'Recaptcha Verification Cancelled.'})
                break;
            default:
            resolve({errorMessage: e});
        }
        });
    });
}

export const signUserWithCredential = async (_verificationId, _fullCodeInput) => {

    return new Promise ((resolve, reject) => {

        const phoneCredential = PhoneAuthProvider.credential(
            _verificationId,
            _fullCodeInput
        );

        signInWithCredential(auth, phoneCredential).then(() => {

            resolve(true);
      
        }).catch((e) => {
            switch (e.code) {
                case 'auth/invalid-verification-code':
                    resolve({error: 'Invalid Code'})
                    break;
                default:
                    resolve({error: e.code})
            }
        });
    });
}

export const linkPhoneWithEmailCredential = async ( _email, _password) => {

    return new Promise ((resolve, reject) => {

        const emailCredential = EmailAuthProvider.credential(_email, _password);

        linkWithCredential(auth.currentUser, emailCredential).then((_user) => {
            resolve(true);
        }).catch((error) => {
            resolve({error: 'Account linking error', error})
        })
    })
}