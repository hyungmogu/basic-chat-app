import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';

export default class UserScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginRight: 10
    },
});
