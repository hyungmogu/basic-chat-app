import React, { Component } from 'react';

import axios from 'axios';

import { ChatProvider, APIProvider } from './components/Context';
import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
    state = {
        user: {
            name: null,
            email: null,
            avatar: null,
            authToken: null
        },
        chatUsers: []
    }

    handleResetUserInfo = () => {
        this.setState({
            user: {
                name: null,
                email: null,
                avatar: null,
                authToken: null
            }
        })
    }

    handleUpdateUserInfo = ({pk, name, auth_token, email, avatar}) => {
        let authToken = auth_token;

        this.setState({
            user: {
                pk: pk,
                name: name,
                email: email,
                avatar: avatar,
                authToken: authToken
            }
        });

        console.log(this.state);
    }

    handleAddChatUser = (user) => {
        this.setState(prevState => {
            if (!prevState.chatUsers || prevState.chatUsers.length === 0) {
                return {
                    chatUsers: [user]
                }
            }

            return {
                chatUsers: [user, ...prevState.chatUsers]
            }
        })
    }

    handleAddChatUsers = (users) => {
        this.setState({
            chatUsers: users
        })
    }

    handleGet = (url, authToken) => {
        let httpRequest = axios.get(url);

        if (authToken || this.state.user.authToken) {
            let opts = {
                headers: {
                    Authorization: `Token ${authToken || this.state.user.authToken}`
                }
            }

            httpRequest = axios.get(url, opts);
        }

        return new Promise((resolve, reject) => {
            httpRequest.then( res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }

    render() {
        return (
            <ChatProvider value={{
                user: {
                    pk: this.state.user.pk,
                    name: this.state.user.name,
                    email: this.state.user.email,
                    avatar: this.state.user.avatar,
                    authToken: this.state.user.authToken
                },
                chatUsers: this.state.chatUsers,
                actions: {
                    updateUserInfo: this.handleUpdateUserInfo,
                    resetUserInfo: this.handleResetUserInfo,
                    addChatUser: this.handleAddChatUser,
                    addChatUsers: this.handleAddChatUsers
                }
            }}>
                <APIProvider
                    value={{
                        actions: {
                            get: this.handleGet
                        }
                    }}
                >
                    <AppNavigator/>
                </APIProvider>
            </ChatProvider>
        );
    }
}