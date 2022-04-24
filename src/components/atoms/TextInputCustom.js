import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const TextInputCustom = (props) => {

    return (
        <View style={styles.inputView}>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor='#6B7280'
                onEndEditing={props.onEndEditing}
                secureTextEntry={props.secureTextEntry}
                autoCapitalize={props.autoCapitalize}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        alignItems: 'center',
    },
    inputLabel: {
        position: 'absolute',
        top: 5,
        left: 30,
        color: '#374151',
        fontSize: 12
    },
    input: {
        width: '90%',
        height: 60,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        paddingTop: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 50,
        fontSize: 16
    },
});

export default TextInputCustom;