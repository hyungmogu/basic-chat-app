import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';

import Logo from '../components/Logo';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default class SignUpScreen extends Component {

    nameRef = React.createRef();
    emailRef = React.createRef();
    passwordRef = React.createRef();
    password2Ref = React.createRef();

    handleSignup = (name, email, password, password2, navigate) => {
        let data = {
            name: name || '',
            email: email || '',
            password: password || '',
            password2: password2 || ''
        };

        axios.post('http://localhost:8000/api/v1/signup/', data).then( res => {
            navigate('Login');
        }).catch(err => {
            console.warn(err);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <KeyboardAvoidingView style={styles.container} behavior = "padding" enabled>
                    <View style={styles.logoContainer}>
                        <Logo/>
                    </View>
                    <View style={styles.inputContainer}>
                        <AppInput ref={this.nameRef} placeholder={'Name'}/>
                        <AppInput ref={this.emailRef} placeholder={'Email'}/>
                        <AppInput ref={this.passwordRef} placeholder={'Password'} secureTextEntry={true}/>
                        <AppInput ref={this.password2Ref} placeholder={'Password Confirm'} secureTextEntry={true}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton
                            type={"primary"}
                            style={{marginBottom: 5}}
                            onPress={() => this.handleSignup(
                                this.nameRef.current._lastNativeText,
                                this.emailRef.current._lastNativeText,
                                this.passwordRef.current._lastNativeText,
                                this.password2Ref.current._lastNativeText,
                                navigate
                            )}
                        >
                            Sign Up
                        </AppButton>
                        <AppButton
                            type={"secondary"}
                            style={{marginBottom: 5}}
                            onPress={() => navigate('Login')}
                        >
                            Back
                        </AppButton>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
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
