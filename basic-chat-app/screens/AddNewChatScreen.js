import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

export default class AddNewChatScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <AddNewButton/>
                <View style={styles.container}>
                    <Text>Hello World</Text>
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
    }
});
