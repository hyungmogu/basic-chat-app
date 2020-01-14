import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Logo = () => {
    return (
        <Text style={styles.logo}>Basic{"\n"} Chat App</Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 250,
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    }
});

export default Logo;