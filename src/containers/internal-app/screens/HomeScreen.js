import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
  }
});

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCodeOpen, setBarCodeOpen] = useState(false);

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