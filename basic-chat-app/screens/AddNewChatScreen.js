import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default class AddNewChatScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <AppInput placeholder={'Email'}/>
                    <AppButton type={"primary"}>Start New Chat</AppButton>
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
        flex: 1,
        padding: 15
    }
});
