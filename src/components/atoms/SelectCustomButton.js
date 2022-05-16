import { View, Text, Pressable } from 'react-native'
import React from 'react'

const SelectCustomButton = ({title, value, onEdit, active, setActive}) => {

    return (
        <View style={styles.container}>
            <View>
                <Pressable
                    style={active? styles.buttonSelected : styles.buttonNotSelected}
                    onPress={setActive}
                >
                </Pressable>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <View>
                <Pressable
                    onPress={onEdit}
                >
                    <Text style={styles.editData}>Editar</Text>
                </Pressable>
            </View>
        </View>
  )
}

const styles = {
    container: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'space-around',
        justifyContent: 'space-between',
    },
    editData: {
        color: '#253FCA',
        textDecorationLine: 'underline',
        fontSize: 12,

    },
    info: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        left: 20
    },
    title: {
        color: '#374151',
        fontSize: 12
    },
    value: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonNotSelected:{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#6F7985'
    },
    buttonSelected: {
        backgroundColor: '#FFFFFF',
        padding: 6,
        borderRadius: 50,
        borderWidth: 12,
        borderColor: '#6F7985'
    }
}

export default SelectCustomButton