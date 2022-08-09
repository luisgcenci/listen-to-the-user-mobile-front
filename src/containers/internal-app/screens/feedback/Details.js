import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import FeedBackTemplate from '@src/components/FeedBackTemplate'
import { TextInput } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks'
import { updateDetails } from '@src/store/features/feedBackSlice'

const Details = ({navigation}) => {

    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state) => state.feedback);
    const [details, setDetails] = useState('');
    const [title, setTitle] = useState(() => {
        let rating = feedback.rating;

        if (rating <= 3) return 'O que aconteceu?'
        else if (rating == 4) return 'O que faltou para a excelência?'
        else if (rating == 5) return 'O que você mais gostou?'
    });

    const handleOnPress = () => {
        dispatch(updateDetails(details));
        navigation.navigate('End');
    }

    return (
        <FeedBackTemplate

            valid={true}
            onPress={handleOnPress}
            buttonText='Enviar Availação'
            screenContent={
                <View style={styles.container}>
                    <Text style={[styles.mainTexts, {paddingVertical: 40}]}>
                        {title}
                    </Text>
                    <Text style={styles.mainTexts}>
                        Sua opnião é muito importante para que possamos melhorar o nosso serviço! 
                        Deixe um comentário :)  
                    </Text>
                <Image source={require('@assets/feedbackdetails.png')}/>
                <Text 
                    style={[styles.subTexts, {color: '#4E5966', fontSize: 16}]}>
                    Escreva aqui
                </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Use esse espaço para comentar sobre sua experiência...'
                    textAlignVertical='bottom'
                    multiline={true}
                    value={details}
                    onChangeText={setDetails}
                    maxLength={500}
                    returnKeyType='done'
                    blurOnSubmit={true}
                />
                <Text 
                    style={[styles.subTexts, {color: '#6B7280', fontSize: 12}]}>
                    Quanto mais detalhes, melhor!
                </Text>
            </View>
          }
        />
      )
}

export default Details

const styles = StyleSheet.create({
    mainTexts: {
        fontWeight: 'bold'
    },
    subTexts: {
        width: '100%',
        paddingVertical: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    input:{
        borderWidth: 1,
        borderColor: '#99A2AD',
        width: '100%',
        height: 150,
        borderRadius: 21,
        padding: 20,
        paddingTop: 20
    }
})