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
import axios from 'axios';

import { UserConsumer } from '../components/Context';
import AppButton from '../components/AppButton';
import AppTextArea from '../components/AppTextArea';
import ChatBoxList from '../components/ChatBoxList';


class ChatScreen extends Component {
    state = {
        loaded: false,
        messages: []
    };

    textRef = React.createRef();
    scrollViewRef = React.createRef();

    async componentDidMount() {
        await this.handleGetChatBoxes(
            this.props.navigation.getParam('chatUser'),
            this.props.userContext.user.authToken
        );

        this.props.navigation.setParams({
            chatter: this.props.userContext.user,
            chattee: this.props.navigation.getParam('chatUser')
        });
    }

    handleGetChatBoxes = (chattee, authToken) => {
        let opts = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        };

        axios.get(`http://localhost:8000/api/v1/chats/${chattee.pk}`, opts).then(res => {
            this.setState({
                loaded: true,
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

    handleSubmit = (text, chattee, authToken) => {
        let opts = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        };

        let data = {
            text: text
        }

        axios.post(`http://localhost:8000/api/v1/chats/${chattee.pk}`, data, opts).then(res => {
            this.setState(prevState => {
                return {
                    messages: [...prevState.messages, res.data]
                }
            });

            this.textRef.current.clear();
        }).catch(err => {
            console.warn(err);
        })
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
                                        this.textRef.current._lastNativeText,
                                        this.props.navigation.getParam('chatUser'),
                                        this.props.userContext.user.authToken
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
    <UserConsumer>
      {context => <ChatScreen {...props} userContext={context} ref={ref} />}
    </UserConsumer>
  ));