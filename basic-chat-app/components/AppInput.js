import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';


class AppInput extends Component {
    render() {
        const {
            login,
            placeholder,
            secureTextEntry
        } = this.props;

        return (
            <TextInput style={ login ? [styles.input, styles.inputLogin] : styles.input} secureTextEntry={secureTextEntry} placeholder={placeholder} placeholderTextColor="black"></TextInput>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2',
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginBottom: 5
    }
});

export default AppInput;