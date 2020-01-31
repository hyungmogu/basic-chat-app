import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { UserConsumer } from '../Context';
import { withNavigation } from 'react-navigation';

class HomeTitle extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <UserConsumer>
                { context => {
                    let name = context.user.name;

                    return(
                        <TouchableOpacity style={styles.item} onPress={() => navigate('User')}>
                            <Text style={styles.text}>{name}</Text>
                        </TouchableOpacity>
                    );
                }}
            </UserConsumer>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default withNavigation(HomeTitle);