import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'

const BinaryQuestion = ({question, onChange, optionOneText, optionTwoText}) => {

    const [optionOne, setOptionOne] = useState(false);
    const [optionTwo, setOptionTwo] = useState(false);

    const handleOptionOnePress = () => {
        setOptionOne(true);
        setOptionTwo(false);
        let response = optionOneText ? optionOneText : true
        onChange(response);
    }

    const handleOptionTwoPress = () => {
        setOptionOne(false);
        setOptionTwo(true);
        let response = optionTwoText ? optionTwoText : false
        onChange(response);
    }

    return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={{textAlign: 'center'}}>{question}</Text>
        </View>
        <View style={styles.options}>
            <Pressable 
                style={optionOne ? styles.buttonActive : styles.buttonInactive} 
                onPress={handleOptionOnePress}
                >
                <Text style={optionOne ? styles.textActive : styles.textInactive}>
                    {optionOneText ? optionOneText : 'Yes'}
                </Text>
            </Pressable>            
            <Pressable 
                style={optionTwo ? styles.buttonActive : styles.buttonInactive} 
                onPress={handleOptionTwoPress}
                >
                <Text style={optionTwo ? styles.textActive : styles.textInactive}>
                    {optionTwoText ? optionTwoText: 'No'}
                </Text>
            </Pressable>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20
    },
    buttonInactive: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        marginHorizontal: 5,
        padding: 10
    },
    buttonActive: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#ADAFB0',
        borderColor: '#D1D5DB',
    },
    textActive: {
        color: '#FFFFFF',
    },
    textInactive: {
        color: '#000000'
    }
})

export default BinaryQuestion