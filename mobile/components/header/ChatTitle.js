import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

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

        let chatterName = chatter && chatter.name ? chatter.name : '';
        let chatteeName = chattee && chattee.name ? chattee.name : '';

        return (
            <Text style={styles.text}>{chatterName}, {chatteeName}</Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default withNavigation(ChatTitle);
