import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';


class AppInput extends Component {
    render() {
        const {
            login,
            placeholder
        } = this.props;

        return (
            <TextInput style={ login ? [styles.input, styles.inputLogin] : styles.input} placeholder={placeholder} placeholderTextColor="black"></TextInput>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2',
        padding: 15,
        marginBottom: 5
    },
    inputLogin: {
        width: 350
    }
});

export default AppInput;