import React, {
  useState,
  useEffect
} from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Pressable 
} from 'react-native';

//qr code scanner imports
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking'

//firebase auth imports
import { getAuth, signOut } from 'firebase/auth';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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

const HomeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCodeOpen, setBarCodeOpen] = useState(false);
  
  const auth = getAuth();
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Linking.openURL(data);
    // WebBrowser.openBrowserAsync(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // const [data, setData] = useState(null);

  // const handleDeepLink = (_event) => {
  //   let data = Linking.parse(_event.url);
  //   setData(data);
  // }

  // useEffect(() => {

  //   const getInitialURL = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     if (initialUrl) {
  //       setData(Linking.parse(initialUrl));
  //     }
  //   }


  //   Linking.addEventListener('url', handleDeepLink);

  //   if (!data) {
  //     getInitialURL();
  //   }

  //   return () => {
  //     Linking.removeEventListener('url');
  //   }
  // }, [])

  // const url = Linking.createURL('/FeedbackScreen');
  // Linking.openURL(url);
  // console.log(url);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const signOutUser = () => {
    signOut(auth).then(() => {
      console.log('user signed out.');
    }).catch( (e) => {
      console.log(e);
    });
  }

  const closeScan = () => {

    setBarCodeOpen(false);
    setScanned(false);
  }

  return (
    <View style={styles.container}>
      {barCodeOpen ?
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.barcode}
          />
          <Pressable
            onPress={() => closeScan()}
            style={styles.button}
          >
            <Text style={styles.buttonText}> Fechar Scan </Text>
          </Pressable>
        </>
        :
        <Pressable
          onPress={() => setBarCodeOpen(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Scan QR Code </Text>
        </Pressable>
      }
      <Pressable
        onPress={signOutUser}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Sign Out </Text>
      </Pressable>
      {/* <Pressable
        onPress={() => navigation.navigate('FeedbackTabs')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Feedback App </Text>
      </Pressable> */}
    </View>
  );
};

export default HomeScreen;