import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CountryCodePicker = (props) => {

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: '+55', value: '+55'},
      {label: '+1', value: '+1'}
    ]);

    return (
        <View style={styles.picker}>
            <DropDownPicker
                open={open}
                value={props.defaultValue ? props.defaultValue : '+55'}
                items={items}
                setOpen={setOpen}
                setValue={props.setVaule}
                setItems={setItems}
                dropDownDirection='TOP'
                listMode='SCROLLVIEW'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    picker:{
        width: '25%'
    }
  })

export default CountryCodePicker