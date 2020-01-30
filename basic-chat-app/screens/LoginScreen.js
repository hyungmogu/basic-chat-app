import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';

import { UserConsumer } from '../components/Context';
import AppInput from '../components/AppInput';
import Logo from '../components/Logo';
import AppButton from '../components/AppButton';

export default class LoginScreen extends Component {

    emailRef = React.createRef();
    passwordRef = React.createRef();

    handleLogin = (email, password, updateUserInfo, navigate) => {
        let data = {
            email: email || '',
            password: password || ''
        };

        axios.post('http://localhost:8000/api/v1/login/', data).then( res => {
            updateUserInfo(res.data);
            navigate('Home');
        }).catch(err => {
            console.warn(err);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <UserConsumer>
                { context => {

                    let updateUserInfo = context.actions.updateUserInfo;

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
                                    <AppInput ref={this.emailRef} placeholder={'Email'}/>
                                    <AppInput ref={this.passwordRef} secureTextEntry={true} placeholder={'Password'}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <AppButton
                                        type={"primary"}
                                        style={{marginBottom: 5}}
                                        onPress={() => this.handleLogin(
                                            this.emailRef.current._lastNativeText,
                                            this.passwordRef.current._lastNativeText,
                                            updateUserInfo,
                                            navigate
                                        )}
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
            </UserConsumer>
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
