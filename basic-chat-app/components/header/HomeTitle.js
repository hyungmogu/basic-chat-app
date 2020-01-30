import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Consumer } from '../Context';
import { withNavigation } from 'react-navigation';

class HomeTitle extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Consumer>
                { context => {
                    let name = context.name;

                    return(
                        <TouchableOpacity style={styles.item} onPress={() => navigate('User')}>
                            <Text style={styles.text}>{name}</Text>
                        </TouchableOpacity>
                    );
                }}
            </Consumer>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default withNavigation(HomeTitle);