import React, { 
  useState,
  useEffect
  }
from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking'

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  outputText: {
    textAlign: 'center',
    height: 40,
  },
  button: {
    backgroundColor: 'lightpink',
    marginVertical: 10,
  },
  barcode: {
    height: 250,
    width: 250
  },
  perfilPic: {
    paddingTop: 50,
    width:100,
    height: 100
  },
});

const Feedback = ({ navigation }) => {

  const [data, setData] = useState(null);

  const handleDeepLink = (_event) => {
    let data = Linking.parse(_event.url);
    setData(data);
  }

  useEffect(() => {

    Linking.addEventListener('url', handleDeepLink);

    const getInitialUrl = async () => {

      const initialUrl = await Linking.getInitialURL();

      if (initialUrl){
        setData(initialUrl);
      }
    }

    if (!data){
      getInitialUrl();
    }

    return () => {
      Linking.removeEventListener('url');
    }
  }, [])

  console.log(data);

  return (
    <Text> Feedback Form </Text>
    // <Text>
    //   { data? 
    //     navigation.navigate('OrderNumber', { data: data})
    //     :
    //     'No data'
    //   }
    // </Text> 
  );
};

export default Feedback;