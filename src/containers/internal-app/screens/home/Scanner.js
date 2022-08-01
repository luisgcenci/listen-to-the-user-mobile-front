import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser';

const Scanner = ({}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const theme = useTheme();
    const styles = getStyles(theme.colors);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // Linking.openURL(data);
        // WebBrowser.openBrowserAsync(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

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

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null)  return <Text>Requesting for camera permission</Text>
       
    if (hasPermission === false) return <Text>No access to camera</Text>

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.barcode}
            />
            {scanned && 
                <Pressable 
                    style={styles.button} 
                    onPress={() => setScanned(false)} 
                >
                    <Text style={styles.buttonText}>Tap to Scan Again</Text>
                </Pressable>
            }
        </View>
    )
}

export default Scanner;

const getStyles = (colors) => StyleSheet.create({
    container:{
        flex: 1,
    },
    barcode: {
        flex: 10
    },
    button:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 21,
    },
    buttonText:{
        color: colors.primary
    }
})