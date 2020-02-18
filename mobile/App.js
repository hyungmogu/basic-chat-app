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
            },
            chatUsers: []
        })
    }

    handleUpdateUserInfo = ({pk, name, auth_token, email, avatar}) => {
        let authToken = auth_token;
        this.setState(prevState => {
            return {
                user: {
                    pk: (pk ? pk : prevState.user.pk),
                    name: (name ? name : prevState.user.name),
                    email: (email ? email : prevState.user.email),
                    avatar: (avatar ? avatar : prevState.user.avatar),
                    authToken: (authToken ? authToken : prevState.user.authToken)
                }
            }
        });
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
                    Authorization: `Token ${this.state.user.authToken}`
                }
            }

            httpRequest = axios.get(url, opts);
        }

        return new Promise((resolve, reject) => {
            httpRequest.then( res => {
                resolve(res);
            }).catch(err => {
                reject(err.response);
            });
        })
    }

    handlePost = (url, data, authToken, csrf=false) => {
        if (csrf) {
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        }

        let httpRequest = axios.post(url, data);

        if (this.state.user.authToken) {
            let opts = {
                headers: {
                    Authorization: `Token ${this.state.user.authToken}`
                }
            }

            httpRequest = axios.post(url, data, opts);
        }

        return new Promise((resolve, reject) => {
            httpRequest.then( res => {
                resolve(res);
            }).catch(err => {
                reject(err.response);
            });
        })
    }

    handlePut = (url, data, authToken) => {
        let httpRequest = axios.post(url, data);

        if (authToken || this.state.user.authToken) {
            let opts = {
                headers: {
                    Authorization: `Token ${authToken || this.state.user.authToken}`
                }
            }

            httpRequest = axios.put(url, data, opts);
        }

        return new Promise((resolve, reject) => {
            httpRequest.then( res => {
                resolve(res);
            }).catch(err => {
                reject(err.response);
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
                            get: this.handleGet,
                            post: this.handlePost,
                            put: this.handlePut
                        }
                    }}
                >
                    <AppNavigator/>
                </APIProvider>
            </ChatProvider>
        );
    }
}