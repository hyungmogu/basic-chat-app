import React, { Component } from 'react';

import { UserProvider } from './components/Context';

import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
    state = {
        authToken: null,
        user: {
            name: null,
            email: null,
            avatar: null
        }
    }

    resetUserInfo = () => {
        this.setState({
            authToken: null,
            user: {
                name: null,
                email: null,
                avatar: null
            }
        })
    }

    updateUserInfo = ({name, auth_token, email, profile_picture}) => {
        let authToken = auth_token;
        let avatar = profile_picture;

        this.setState({
            authToken: authToken,
            user: {
                name: name,
                email: email,
                avatar: avatar
            }
        });
    }

    render() {
        return (
            <UserProvider value={{
                authToken: this.state.authToken,
                name: this.state.user.name,
                email: this.state.user.email,
                avatar: this.state.user.avatar,
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