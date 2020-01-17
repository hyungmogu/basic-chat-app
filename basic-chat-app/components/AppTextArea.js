import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

class AppInput extends Component {
    render() {
        const {
            placeholder,
            onChangeText,
            style
        } = this.props;

        return (
            <TextInput
                style={[styles.input, style]}
                multiline={true}
                numberOfLines={1}
                placeholder={placeholder}
                onChangeText={onChangeText}
                placeholderTextColor="black"
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        paddingBottom: Platform.OS === 'ios' ? 15 : 10,
        paddingHorizontal: 20,
        maxHeight: Platform.OS === 'ios' ? 200 : 100
    }
});

export default AppInput;