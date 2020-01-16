import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, View, ScrollView, Platform, TouchableOpacity } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextArea from '../components/AppTextArea';

export default class ChatScreen extends Component {
    state = {
        text: '',
        height: 0,
        messages: []
    };

    componentDidMount() {
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

        this.setState({ messages });
    }

    toggleDateTime(messages, index) {
        if (messages[index].showDateTime === undefined) {
            messages[index].showDateTime = false;
        }

        messages[index].showDateTime = messages[index].showDateTime ? false : true;

        this.setState({messages});
    }

    getDateTime(unixTimestamp) {

        let date = new Date(unixTimestamp * 1000);
        let options = {
            hour: "2-digit", minute: "2-digit"
        };

        return date.toLocaleTimeString("en-us", options);
    }

    render() {
        const {navigate} = this.props.navigation;
        let userEmail = 'john@gmail.com';
        let messages = this.state.messages;

        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                    <ScrollView style={{flex: 1}} contentContainerStyle={styles.chatContainer}>
                        {
                            messages.map((message, index) =>
                                <View key={message.id} style={[styles.chatBoxContainer, userEmail === message.email ? styles.chatterBoxContainer : styles.chatteeBoxContainer]}>
                                    <TouchableOpacity
                                        style={[styles.chatbox, userEmail === message.email ? styles.chatter : styles.chattee]}
                                        onPress={ () => this.toggleDateTime(messages, index)}
                                    >
                                        <Text>{message.text}</Text>
                                    </TouchableOpacity>
                                    { message.showDateTime ? <Text style={[styles.dateTime]}>{this.getDateTime(message.timestamp)}</Text> : null }
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
        maxWidth: Platform.OS === 'ios' ? 210 : 180
    },
    chatterBoxContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    chatteeBoxContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    chatbox: {
        padding: 10,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    chatter: {
        borderBottomLeftRadius: 10,
        backgroundColor: '#D6D6D6',
        borderColor: '#D6D6D6'
    },
    chattee: {
        borderBottomRightRadius: 10,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2'
    },
    dateTime: {
        padding: 5
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        flexDirection: 'row',
        padding: 10
    }
});
