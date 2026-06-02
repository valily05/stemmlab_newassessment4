import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
    message: string;
};

export default function WarningMessage({ message }: Props) {
    return(
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/warning.png')}
                style={styles.icon}
            />
            <Text style={styles.text}>
                {message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
        marginBottom: 9,
        marginTop: -2
    },

    icon: {
        width: 16,
        height: 16,
        marginRight: 7
    },

    text: {
        color: '#ef4444',
        fontSize: 11,
        fontFamily: 'LEMONMILK',
        backgroundColor: 'rgba(0,0,0,0.9)'
    }
});