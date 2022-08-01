import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Breadcrumb2 = ({circlesCount, active, color, width, height}) => {

    const styles = StyleSheet.create({
        BreadCrumb:{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Item:{
            width: width ? width / 2 : 20 / 2,
            height: height ? height / 2 : 20 / 2,
            borderRadius: 100,
            backgroundColor: color ? color : '#99A2AD',
            marginHorizontal: 5
        },
        ItemActive:{
            width: width ? width : 20,
            height: height ? height: 20,
            borderRadius: 100,
            backgroundColor: color ? color : '#99A2AD',
            marginHorizontal: 5
        }
    })

    const getCircles = () => {
        let circles = [];
        let activeItem = active ? active : 1;
        let count = circlesCount ? circlesCount : 3

        for (let i = 1; i <= count; i++) {
            circles.push(<View style={i === activeItem ? styles.ItemActive : styles.Item} key={i}></View>);
        }

        return circles;
    }

    return (
        <View style={styles.BreadCrumb}>
            { getCircles() }
        </View>
    )
}

export default Breadcrumb2