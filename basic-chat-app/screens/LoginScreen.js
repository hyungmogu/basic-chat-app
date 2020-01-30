import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';

import { Consumer } from '../components/Context';
import AppInput from '../components/AppInput';
import Logo from '../components/Logo';
import AppButton from '../components/AppButton';

export default class LoginScreen extends Component {

    componentDidMount() {}

    handleLogin = (email, password, storeUserInfo) => {
        let data = JSON.stringify({
            email: email,
            password: password
        })

        // display spinner

        axios.post('http://localhost:8000/api/v1/login', data).then( res => {
            // add response to state at app level

            // proceed to Home Screen
        }).catch(err => {
            console.warn(err);
        }).finally(_ => {
            // close spinner
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Consumer>
                { context => {

                    return(
                        <SafeAreaView style={styles.safeViewContainer}>
                            <KeyboardAvoidingView
                                style={styles.container}
                                behavior = "padding"
                                enabled
                            >
                                <View style={styles.logoContainer}>
                                    <Logo/>
                                </View>
                                <View style={styles.inputContainer}>
                                    <AppInput placeholder={'Email'}/>
                                    <AppInput secureTextEntry={true} placeholder={'Password'}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <AppButton
                                        type={"primary"}
                                        style={{marginBottom: 5}}
                                        onPress={() => navigate('Home')}
                                    >
                                        Login
                                    </AppButton>
                                    <AppButton
                                        type={"secondary"}
                                        style={{marginBottom: 5}}
                                        onPress={() => navigate('SignUp')}
                                    >
                                        Sign Up
                                    </AppButton>
                                </View>
                            </KeyboardAvoidingView>
                        </SafeAreaView>
                    )
                }}
            </Consumer>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    logoContainer: {
    },
    inputContainer: {
        marginBottom: 15,
        alignSelf: 'stretch'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});
