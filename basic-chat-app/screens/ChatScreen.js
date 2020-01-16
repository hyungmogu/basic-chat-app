import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, View, ScrollView, Platform } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextArea from '../components/AppTextArea';

export default class ChatScreen extends Component {
    state = {
        text: '',
        height: 0
    };

    render() {
        const {navigate} = this.props.navigation;
        let userEmail = 'john@gmail.com';
        let messages = [
            {
                id: 1,
                email: 'james@gmail.com',
                name: 'James Yu',
                text: 'Hello there!',
                timestamp: 1579196191
            },
            {
                id: 2,
                email: 'john@gmail.com',
                name: 'John Doe',
                text: 'Hey',
                timestamp: 1579196322
            }
        ];
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                    <ScrollView style={{flex: 1}} contentContainerStyle={styles.chatContainer}>
                        {
                            messages.map(message =>
                                <View key={message.id} style={styles.chatBoxContainer}>
                                    <View style={[styles.chatbox, userEmail === message.email ? styles.chatter : styles.chattee]}>
                                        <Text>{message.text}</Text>
                                    </View>
                                </View>
                            )
                        }
                        <View>

                        </View>
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <AppTextArea
                            placeholder={'Message'}
                            onChangeText={(text) => {
                                this.setState({ text })
                            }}
                            style={{flex: 1, marginRight: 10}}
                        />
                        <AppButton type={'secondary'}>Submit</AppButton>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeViewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10
    },
    chatBoxContainer: {

    },
    chatbox: {
        padding: 10,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxWidth: Platform.OS === 'ios' ? 210 : 180
    },
    chatter: {
        borderBottomLeftRadius: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#D6D6D6',
        borderColor: '#D6D6D6'
    },
    chattee: {
        borderBottomRightRadius: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2'
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        flexDirection: 'row',
        padding: 10
    }
});
