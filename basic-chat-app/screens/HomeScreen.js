import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

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
                <TouchableOpacity style={{position: 'fixed', display: 'flex', justifyContent: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 200, alignItems: 'center', bottom: 0, right: 0,  width: 75, height: 75}}>
                    <Ionicons name="ios-add" size={40}/>
                </TouchableOpacity>
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
