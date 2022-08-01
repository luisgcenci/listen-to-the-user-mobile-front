import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Star = ({id, active, size, selectedColor, unselectedColor, onStartSelected}) => {

    const styles = StyleSheet.create({
        starUnselected: {
            fontSize: size ? size : 45,
            color: unselectedColor ? unselectedColor : '#D1D1D1'
        },
        starSelected: {
            fontSize: size ? size : 45,
            color: selectedColor ? selectedColor : '#FDCC00'
        }
    })
    
    return (
    <View style={styles.container}>
        <Text style={active ? styles.starSelected : styles.starUnselected} onPress={() => onStartSelected(id)}>
            &#9733;
        </Text>
    </View>
    )
}

export default Star