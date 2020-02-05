import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

const AppTextarea = React.forwardRef((props, ref) => {
    const {
        placeholder,
        onChangeText,
        style
    } = props;

    return (
        <TextInput
            style={[styles.input, style]}
            multiline={true}
            numberOfLines={1}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor="black"
            ref={ref}
        />
    );
});

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

export default AppTextarea;