import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import { ChatConsumer, APIConsumer } from '../components/Context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import Config from '../Config';

class AddNewChatScreen extends Component {

    emailRef = React.createRef();

    chatService = this.props.chatContext.actions;
    apiService = this.props.apiContext.actions;

    handleCreateChat = (email, addChatUser, navigate) => {
        let data = {
            email: email || ''
        };

        this.apiService.post(`${Config.host}/api/v1/chats/`, data).then( res => {
            addChatUser(res.data);
            navigate('Chat', {
                chatUser: res.data
            });
        }).catch(err => {
            console.warn(err);
        });
    }

    render() {
        const {navigate} = this.props.navigation;

        return(
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <AppInput ref={this.emailRef} placeholder={'Email'}/>
                    <AppButton
                        type={"secondary"}
                        onPress={() => this.handleCreateChat(
                            this.emailRef.current._lastNativeText,
                            this.chatService.addChatUser,
                            navigate
                        )}
                    >
                        Start New Chat
                    </AppButton>
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

export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <AddNewChatScreen
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
