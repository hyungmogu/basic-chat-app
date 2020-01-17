import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';


class AppInput extends Component {

    render() {
        const {
            login,
            placeholder,
            secureTextEntry,
            forwardRef
        } = this.props;

        return (
            <TextInput
                style={ login ? [styles.input, styles.inputLogin] : styles.input}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor="black"
                ref={forwardRef}
            ></TextInput>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2',
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        paddingHorizontal: 15,
        marginBottom: 5
    }
});

export default AppInput;