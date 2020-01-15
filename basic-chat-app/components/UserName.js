import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const UserName = () => {
    return (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>User Name Goes Here</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default UserName;