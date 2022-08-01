import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import FeedBackTemplate from '@src/components/FeedBackTemplate'
import Stars from '@src/components/Stars';
import { updateOrderNumber, updateRating } from '@src/store/features/feedBackSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';

const Experience = ({ navigation }) => {

    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(0);
    const [orderNumber, setOrderNumber] = useState('');

    const handleOnPress = () => {
        dispatch(updateOrderNumber(orderNumber));
        dispatch(updateRating(rating));
        rating <= 3 ?
        navigation.navigate('Filters')
        :
        navigation.navigate('Details');
    }

    return (
        <FeedBackTemplate
            onPress={handleOnPress}
            screenContent={
                <View style={styles.container}>
                    <View style={styles.InputSection}>
                        <View style={styles.InputTitle}>
                            <Text style={{fontWeight: 'bold'}}>
                                Por favor, qual o número do pedido?
                            </Text>
                        </View>
                        <View style={styles.InputSubTitle}>
                            <Text> Número do Pedido </Text>
                        </View>
                        <TextInput
                            keyboardType='number-pad'
                            returnKeyType='done'
                            placeholder='000000'
                            style={styles.Input}
                            value={orderNumber}
                            onChangeText={setOrderNumber}
                        />
                    </View>
                    <View style={styles.Stars}>
                        <View style={styles.StarsTitle}>
                            <Text style={{fontWeight: 'bold'}}>
                                Como foi a sua experiência?
                            </Text>
                        </View>
                        <View style ={styles.StarsInput}>
                            <Stars
                                rating={rating}
                                setRating={setRating}
                            />
                        </View>
                    </View>
                </View>
            }
        />
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    InputSection: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },
        InputTitle:{
        flex: 1,
        justifyContent: 'center',
    },
        InputSubTitle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        width: '100%',
        paddingBottom: 5
    },
    Input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 20,
    },
    Stars: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
        StarsTitle:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
        StarsInput:{
        flex: 4
    },
})

export default Experience