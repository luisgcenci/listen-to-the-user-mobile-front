import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';

const TextInputCustom = (props) => {

    const firstRender = useRef(true);

    useEffect(() => {

        if(firstRender.current){
            firstRender.current = false;
        }
        else if (props.handleValidation && !firstRender.current){
            props.handleValidation();
        }
    },[props.value])

    return (
        <View 
            style={styles.inputView}
        >
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={props.value}
                onKeyPress={props.onKeyPress}
                onChange={props.onChange}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor='#6B7280'
                onEndEditing={props.onEndEditing}
                secureTextEntry={props.secureTextEntry}
                autoCapitalize={props.autoCapitalize}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                returnKeyType='done'
            />
            {
                props.showFormErrors &&
                props.isFieldInError && 
                props.getErrorsInField(props.errorField).map(Errormessage => (
                <Text key={Errormessage} style={styles.errorMessage}>
                    {Errormessage}
                </Text>
            ))}
            {
                props.showRegistrationError ?
                <Text style={styles.errorMessage}>
                    {props.showRegistrationError}
                </Text>
                :
                null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    inputView: {
        width: '90%',
        alignItems: 'center',
    },
    inputLabel: {
        position: 'absolute',
        top: 5,
        left: 10,
        color: '#374151',
        fontSize: 12
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        paddingTop: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 50,
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        width: '90%',
        textAlign: 'center',
        fontSize: 8
    },
});

export default TextInputCustom;