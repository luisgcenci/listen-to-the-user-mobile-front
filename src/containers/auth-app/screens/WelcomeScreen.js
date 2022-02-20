import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable
} from 'react-native';
const WelcomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome</Text>
      <Pressable
        onPress={ () => navigation.navigate("RegisterInfoScreen")}
        style={styles.button}
      >
        <Text>Criar Conta</Text>
      </Pressable>
      <Pressable
        onPress={ () => navigation.navigate("ValidateLoginScreen")}
        style={styles.button}
      >
        <Text>Entrar</Text>
      </Pressable>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
      backgroundColor: 'lightpink',
      marginVertical: 10,
  },
});

export default WelcomeScreen;