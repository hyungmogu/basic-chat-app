import React, { Component } from 'react';

import { Provider } from './components/Context';

import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
    state = {
        name: null,
        auth_token: null,
        email: null,
        avatar: null
    }

    render() {
        return (
            <Provider value={{
                auth_token: this.state.auth_token,
                name: this.state.name,
                email: this.state.email,
                avatar: this.state.avatar
            }}>
                <AppNavigator/>
            </Provider>
        );
    }
}