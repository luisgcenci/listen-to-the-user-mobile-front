import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import BinaryQuestion from '@src/components/BinaryQuestion';
import FeedBackTemplate from '@src/components/FeedBackTemplate';

const End = ({navigation}) => {

    const [text, setText] = useState('Solicitação de recompensa enviada com sucesso!');
    //don't allow user to go back by swapping
    navigation.addListener('beforeRemove', (e) => {
        let type = e.data.action.type;
        if (type == 'POP') e.preventDefault();
        else if (type == 'GO_BACK') navigation.dispatch(e.data.action);
    });

    const handleOptionSelected = (option) => {

        let text = '';
        //navigate to route when time comes
        if (option == 'Fazer sugestão') {
            text = `Sugestões vão estar disponíveis no futuro. MUITO obrigado por participar <3. Você pode fechar o protótipo agora.`
        }else if (option == 'Ver recompensa'){
            text = `Recompensas vão estar disponíveis no futuro. MUITO obrigado por participar <3. Você pode fechar o protótipo agora.`
        }

        setText(text)
    }

    return (
        <View style={styles.container}>
            <BinaryQuestion
                question={text}
                onChange={handleOptionSelected}
                optionOneText='Fazer sugestão'
                optionTwoText='Ver recompensa'
            />
        </View>
    )
}

export default End

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    }
})