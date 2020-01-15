import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { withNavigation } from 'react-navigation';

class UserName extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigate('User')}>
                <Text style={styles.text}>User Name Goes Here</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default withNavigation(UserName);