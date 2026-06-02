import React from "react";
import { Animated, StyleSheet, Text } from 'react-native';

type Props = {
    isMatch: boolean;
    visible: boolean;
    shakeAnim: Animated.Value;
};

export default function PasswordMatchIndicator({ isMatch, visible, shakeAnim }: Props) {
    return(
        <Animated.View style={[
                styles.container,
                {
                    transform: [{ translateX: shakeAnim }], 
                    opacity: visible ? 0.9 : 0
                },
            ]}
        >
            <Text style={[
                    styles.text,
                    {
                        color: isMatch
                            ? '#22c55e'
                            : '#ef4444'
                    },
                ]}
            >
                {isMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
        marginLeft: 4,
    },

    text: {
        fontFamily: 'BebasNeue', 
        fontSize: 14,
        top: -13,
        backgroundColor: 'rgba(0,0,0,0.9)'
    }
});