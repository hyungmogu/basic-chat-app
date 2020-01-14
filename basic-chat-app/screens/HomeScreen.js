import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ChatMenuItem from '../components/ChatMenuItem';

export default class HomeScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <TouchableOpacity style={{position: 'absolute', zIndex: '1', backgroundColor: '#E2E2E2', display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 200, alignSelf: 'flex-end', bottom: 40, right: 20,  width: 75, height: 75}}>
                    <Ionicons name="ios-add" size={50}/>
                </TouchableOpacity>
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
