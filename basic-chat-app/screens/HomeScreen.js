import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import ChatMenuItem from '../components/ChatMenuItem';

export default class HomeScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <ScrollView style={styles.container}>
                    { [...Array(20).keys()].map(index =>
                        <ChatMenuItem
                            key={index}
                            name={'James'}
                            latestMessage={'Hello World'}
                            image={'http://via.placeholder.com/150x150'}
                            onPress={() => {}}
                        />
                    )}
                </ScrollView>
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
