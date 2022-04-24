import { View, Image, Text, StyleSheet } from 'react-native'
import React from 'react'

const Breadcrumb = ({text, icon, greyout}) => {
  return (
    <>  
        <View style={styles.container}>
            <Image
                source={icon}
            />
            <Text style={styles.text}>{text}</Text>
            <View style={greyout ? styles.barGreyout : styles.bar}></View>
        </View>
    </>
  )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        paddingVertical: 10
    },
    bar: {
        width: '90%',
        height: 5,
        backgroundColor: '#478F35'
    },
    barGreyout: {
        height: 5,
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: 1
    },
});


export default Breadcrumb