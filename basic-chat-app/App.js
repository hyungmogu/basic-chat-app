import React, { Component } from 'react';

import { UserProvider } from './components/Context';

import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
    state = {
        user: {
            name: null,
            email: null,
            avatar: null,
            authToken: null
        }
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

    handleUpdateUserInfo = ({pk, name, auth_token, email, profile_picture}) => {
        let authToken = auth_token;
        let avatar = profile_picture;

        this.setState({
            user: {
                pk: pk,
                name: name,
                email: email,
                avatar: avatar,
                authToken: authToken
            }
        });
    }



    render() {
        return (
            <UserProvider value={{
                user: {
                    pk: this.state.user.pk,
                    name: this.state.user.name,
                    email: this.state.user.email,
                    avatar: this.state.user.avatar,
                    authToken: this.state.user.authToken
                },
                actions: {
                    updateUserInfo: this.handleUpdateUserInfo,
                    resetUserInfo: this.handleResetUserInfo
                }
            }}>
                <AppNavigator/>
            </UserProvider>
        );
    }
}