import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { withNavigation } from 'react-navigation';

class ChatTitle extends Component {
    render() {
        if (!this.props.navigation.state.params) {
            return null;
        }

        const {
            chattee,
            chatter
        } = this.props.navigation.state.params;

        return (
            <Text style={styles.text}>{chatter.name}, {chattee.name}</Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default withNavigation(ChatTitle);
