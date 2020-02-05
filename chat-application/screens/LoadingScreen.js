import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

export default class LoadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});
