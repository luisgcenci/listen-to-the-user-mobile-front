import React, {useState, useEffect} from 'react';
import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useAppSelector } from '../../../hooks/hooks.ts';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
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

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCodeOpen, setBarCodeOpen] = useState(false);

  const userInfo = useAppSelector((state) => state.authApp.userInfo);
  const name = userInfo.user.name;
  const familyName = userInfo.user.familyName;
  const givenName = userInfo.user.givenName;
  const id = userInfo.user.id;
  const email = userInfo.user.email;
  const photoUrl  = userInfo.user.photoUrl;

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
  <View style={styles.container}>
    <Text style={styles.outputText}>
      Welcome to the Home Page!
    </Text>
    <Image style={styles.perfilPic}
      source={{
        uri: photoUrl
      }}
    />
    <Text style={styles.outputText}>
      Full Name: {name}
    </Text>
    <Text style={styles.outputText}>
      Family Name: {familyName}
    </Text>
    <Text style={styles.outputText}>
      Given Name: {givenName}
    </Text>
    <Text style={styles.outputText}>
      Google ID: {id}
    </Text>
    <Text style={styles.outputText}>
      Email: {email}
    </Text>

    {barCodeOpen ?
    <>
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={styles.barcode}
    />
    <Pressable
      onPress={() => setBarCodeOpen(false)}
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
  </View>
  );
};

export default HomeScreen;