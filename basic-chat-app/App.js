import React, { Component } from 'react';

import { UserProvider } from './components/Context';

import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
    state = {
        name: null,
        authToken: null,
        email: null,
        avatar: null
    }

    resetUserInfo = () => {
        this.setState({
            name: null,
            authToken: null,
            email: null,
            avatar: null
        })
    }

    updateUserInfo = ({name, auth_token, email, profile_picture}) => {
        let authToken = auth_token;
        let avatar = profile_picture;

        this.setState({
            name: name,
            authToken: authToken,
            email: email,
            avatar: avatar
        });
    }

    render() {
        return (
            <UserProvider value={{
                authToken: this.state.authToken,
                name: this.state.name,
                email: this.state.email,
                avatar: this.state.avatar,
                actions: {
                    updateUserInfo: this.updateUserInfo,
                    resetUserInfo: this.resetUserInfo
                }
            }}>
                <AppNavigator/>
            </UserProvider>
        );
    }
}