import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import axios from 'axios';

import { UserConsumer } from '../components/Context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default class AddNewChatScreen extends Component {

    emailRef = React.createRef();

    handleCreateChat = (authToken, email, addChatUser, navigate) => {
        let opts = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        }

        let data = {
            email: email || ''
        };

        axios.post('http://localhost:8000/api/v1/chats/', data, opts).then( res => {
            addChatUser(res.data);
            navigate('Chat');
        }).catch(err => {
            console.warn(err);
        });
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <UserConsumer>
                { context => {
                    let authToken = context.user.authToken;
                    let addChatUser = context.actions.addChatUser;

                    return(
                        <SafeAreaView style={styles.safeViewContainer}>
                            <View style={styles.container}>
                                <AppInput ref={this.emailRef} placeholder={'Email'}/>
                                <AppButton
                                    type={"secondary"}
                                    onPress={() => this.handleCreateChat(
                                        authToken,
                                        this.emailRef.current._lastNativeText,
                                        addChatUser,
                                        navigate
                                    )}
                                >
                                    Start New Chat
                                </AppButton>
                            </View>
                        </SafeAreaView>
                    );
                }}
            </UserConsumer>
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
