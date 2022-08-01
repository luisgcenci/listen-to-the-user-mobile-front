import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { useAppDispatch } from '@src/hooks/hooks';
import FeedBackTemplate from '@src/components/FeedBackTemplate';
import BinaryQuestion from '@src/components/BinaryQuestion';
import { 
  updateProblem, 
  updateResolution, 
  updateContact 
} from '@src/store/features/feedBackSlice';

const Filters = ({ navigation }) => {

  const dispatch = useAppDispatch();
  const [questionOne, setQuestionOne] = useState(false);
  const [questionTwo, setQuestionTwo] = useState(true);
  const [questionThree, setQuestionThree] = useState(false);

  const handleOnPress = () => {
    dispatch(updateProblem(questionOne));
    dispatch(updateResolution(questionTwo));
    dispatch(updateContact(questionThree));
    navigation.navigate('Details');
  }

  const handleQuestionOne = (_status) => {
    setQuestionOne(_status);
    setQuestionTwo(true); //set it back to default
  }

  const handleQuestionTwo = (_status) => {
    setQuestionTwo(_status);
  }

  const handleQuestionThree = (_status) => {
    setQuestionThree(_status);
  }

  return (
    <FeedBackTemplate
      onPress={handleOnPress}
      screenContent={
        <View style={styles.container}>
          <BinaryQuestion 
            question='Ocorreu algum problema?'
            onChange={handleQuestionOne}
          />
          {questionOne ?
            <BinaryQuestion 
              question='O problema foi resolvido?'
              onChange={handleQuestionTwo}
            />
            :
            null
          }
          {!questionTwo ?
            <BinaryQuestion 
              question='Deseja ser contatado?'
              onChange={handleQuestionThree}
            />
            :
            null
          }
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40
  }
})

export default Filters;