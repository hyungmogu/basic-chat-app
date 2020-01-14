import React, { Component } from 'react';
import { StyleSheet, Text , TouchableOpacity} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

class AddNewButton extends Component {
    render() {
        const {
            onPress
        } = this.props;

        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Ionicons name="ios-add" size={50}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#E2E2E2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 200,
        alignSelf: 'flex-end',
        bottom: 40,
        right: 20,
        width: 75,
        height: 75
    }
});

export default AddNewButton;