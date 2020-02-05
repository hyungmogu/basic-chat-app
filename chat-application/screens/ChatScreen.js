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

import { ChatConsumer, APIConsumer } from '../components/Context';
import AppButton from '../components/AppButton';
import AppTextArea from '../components/AppTextArea';
import ChatBoxList from '../components/ChatBoxList';


class ChatScreen extends Component {

    chatService = this.props.chatContext.actions;
    apiService = this.props.apiContext.actions;å
    loaded = false;
    timeout = 3000;

    state = {
        messages: []
    };

    textRef = React.createRef();
    scrollViewRef = React.createRef();

    async componentDidUpdate() {
        if (!this.authTokenExists(this.props.chatContext.user.authToken)) {
            return;
        }

        if (this.isLoaded) {
            return;
        }

        this.isLoaded = true;

        await this.handleGetChatBoxes(
            this.props.navigation.getParam('chatUser')
        );

        this.props.navigation.setParams({
            chatter: this.props.chatContext.user,
            chattee: this.props.navigation.getParam('chatUser')
        });

        this.connectWebSocket();
    }

    authTokenExists(authToken) {
        if(!authToken) {
            return false;
        }

        return true;
    }

    connectWebSocket() {
        let chattee = this.props.navigation.getParam('chatUser');
        this.webSocket = new WebSocket(`ws://localhost:8000/api/v1/ws/chats/${chattee.pk}/`);

        this.webSocket.onopen = () => {
            console.warn('connected')
        }

        this.webSocket.onmessage = (res) => {
            let data = JSON.parse(res.data);
            this.setState(prevState => {
                return {
                    messages: [...prevState.messages, data]
                }
            });
        };

        this.webSocket.onclose = () => {
            console.warn('disconnected. Attempting to reconnect in 3 seconds...');
            setTimeout(this.reconnectWebSocket, this.timeout);
        }

        this.webSocket.onerror = (err) => {
            console.warn(err);
        }
    }

    reconnectWebSocket = () => {
        if (!this.websocket || this.websocket.readyState == WebSocket.CLOSED) {
            this.connectWebSocket();
        }
    }


    handleGetChatBoxes = (chattee) => {
        this.apiService.get(`http://localhost:8000/api/v1/chats/${chattee.pk}`).then(res => {
            this.setState({
                messages: res.data
            });
        }).catch(err => {
            console.warn(err.response.data.detail);
        })
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

    handleSubmit = (text) => {
        let data = JSON.stringify({
            text: text
        });

        this.webSocket.send(data);
        this.textRef.current.clear();
    }

    render() {
        return (
            <SafeAreaConsumer>
                { insets =>
                    <SafeAreaView style={styles.safeViewContainer}>
                        <KeyboardAvoidingView
                            style={styles.container}
                            keyboardVerticalOffset={
                                this.state.inputHeight + (Platform.OS === 'ios' ? insets.bottom : 10)
                            }
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            enabled
                        >

                            <ScrollView
                                style={styles.chatContainer}
                                ref={this.scrollViewRef}
                                onContentSizeChange={()=>{
                                    this.scrollViewRef.current.scrollToEnd({animated: false});
                            }}>
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
                                    ref={this.textRef}
                                    style={{flex: 1, marginRight: 10}}
                                />
                                <AppButton
                                    type={'secondary'}
                                    onPress={() => this.handleSubmit(
                                        this.textRef.current._lastNativeText
                                    )}>
                                        Submit
                                </AppButton>
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
        padding: 10
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        flexDirection: 'row',
        padding: 10
    }
});


export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <ChatScreen
                        {...props}
                        chatContext={chatContext}
                        apiContext={apiContext}
                        ref={ref}
                    />
                }
            </APIConsumer>
        }
    </ChatConsumer>
));
