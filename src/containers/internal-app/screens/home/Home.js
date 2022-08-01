import React from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

//firebase auth imports
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { updateDarkMode } from '@src/store/features/UserSlice';

const HomeScreen = ({ navigation }) => {
  const darkMode = useAppSelector((state) => state.user.darkMode);
  const dispatch = useAppDispatch();
  
  const auth = getAuth();
  const theme = useTheme();
  const styles = getStyles(theme.colors);

  const signOutUser = () => {
    signOut(auth).then(() => {
      console.log('user signed out.');
    }).catch( (e) => {
      console.log(e);
    });
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Pressable
          onPress={signOutUser}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Sign Out </Text>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Pressable
          onPress={() => navigation.navigate('FeedbackTabs')}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Feedback App </Text>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Pressable
          onPress={() => dispatch(updateDarkMode(!darkMode))}
          style={styles.button}
        >
          <Text style={styles.buttonText}> {darkMode ? 'LIGHT' : 'DARK'} MODE </Text>
        </Pressable>
      </View>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  block: {
    marginVertical: 10,
    width: '100%',
  },
  button:{
    backgroundColor: '#818C99',
    padding: 20,
    borderRadius: 21,
  },
  buttonText:{
    color: colors.primary,
    textAlign: 'center'
  }
});

export default HomeScreen;