import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Star from './Star'

const Stars = ({rating, setRating, size, count}) => {

    const onStarSelected = (_starId) => {
        setRating(_starId);
    }

    const getStars = (_count) => {

        let stars = [];

        for (let i = 1; i <= _count; i++){
            stars.push(
                <Star 
                    id={i} 
                    key={i} 
                    onStartSelected={onStarSelected}
                    active={i <= rating}
                    size={size ? size : 60}
                />
            );
        }

        return stars;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }
    })
    
    return (
    <View style={styles.container}>
        {getStars(count ? count : 5)}
    </View>
    )
}

export default Stars