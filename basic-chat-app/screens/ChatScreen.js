import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    ScrollView,
    Platform
} from 'react-native';

import { SafeAreaConsumer } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import AppTextArea from '../components/AppTextArea';
import ChatBoxList from '../components/ChatBoxList';

export default class ChatScreen extends Component {
    state = {
        chatter: null,
        chattee: null,
        text: '',
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

        let chatter = {
            id: 1,
            name: 'John Doe',
            email: 'james@gmail.com'
        }

        let chattee = {
            id: 2,
            name: 'James Yu',
            email: 'james@gmail.com'
        };

        this.setState({
            chatter: chatter,
            chattee: chattee,
            messages: messages
        });

        this.props.navigation.setParams({
            chatter: chatter,
            chattee: chattee
        });
    }

    handleToggleDateTime = (messages, index) => {
        if (messages[index].showDateTime === undefined) {
            messages[index].showDateTime = false;
        }

        messages[index].showDateTime = messages[index].showDateTime ? false : true;

        this.setState({messages});
    }

    handleMeasureInputHeight = (event) => {
        if (this.state.inputHeight) {
            return;
        }

        this.setState({
            inputHeight: event.nativeEvent.layout.height
        })
    }

    render() {
        return (
            <SafeAreaConsumer>
                { insets =>
                    <SafeAreaView style={styles.safeViewContainer}>
                        <KeyboardAvoidingView
                            style={styles.container}
                            keyboardVerticalOffset={this.state.inputHeight + (Platform.OS === 'ios' ? insets.bottom : 10)}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            enabled
                        >
                            <ScrollView
                                style={{flex: 1}}
                                contentContainerStyle={styles.chatContainer}
                            >
                                <ChatBoxList
                                    messages={this.state.messages}
                                    toggleDateTime={this.handleToggleDateTime}
                                />
                            </ScrollView>
                            <View
                                style={styles.inputContainer}
                                onLayout={(event) => {this.handleMeasureInputHeight(event)}}
                            >
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
                }
            </SafeAreaConsumer>
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
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        flexDirection: 'row',
        padding: 10
    }
});
