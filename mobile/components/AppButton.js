import React, { Component } from 'react';
import { StyleSheet, Text , TouchableOpacity} from 'react-native';

class AppButton extends Component {
    render() {
        const {
            type,
            onPress,
            disabled,
            style
        } = this.props;

        return (
            <TouchableOpacity
                style={[styles.button, styles[type], style]}
                disabled={disabled}
                onPress={onPress}
            >
                <Text>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        padding: 15,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primary: {
        backgroundColor: '#E2E2E2'
    },
    secondary: {
        backgroundColor: '#D6D6D6'
    }
});

export default AppButton;