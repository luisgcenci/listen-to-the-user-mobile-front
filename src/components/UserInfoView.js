import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useAppSelector } from '../hooks/hooks'
import React from 'react'

const UserInfoView = ({editData}) => {

    const name = useAppSelector((state) => state.accRegistration.name)
    const bday = useAppSelector((state) => state.accRegistration.bday)

    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.infoValue}>{name}</Text>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <Text style={styles.infoValue}>{bday}</Text>
            </View>
            <Pressable
                onPress={editData}
            >
                <Text style={styles.editData}>Editar dados de acesso</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingTop: 20,
    },
    infoView: {
    },
    label: {
        fontSize: 12,
        color: '#6B7280',
        paddingVertical: 5,
    },
    infoValue: {
        fontSize: 16,
        color: '#6B7280'
    },
    editData: {
        color: '#253FCA',
        textDecorationLine: 'underline',
        fontSize: 12,
    }
})

export default UserInfoView