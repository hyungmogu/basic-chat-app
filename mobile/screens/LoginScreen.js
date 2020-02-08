import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import { ChatConsumer, APIConsumer } from '../components/Context';
import AppInput from '../components/AppInput';
import Logo from '../components/Logo';
import AppButton from '../components/AppButton';
import Config from '../Config';


class LoginScreen extends Component {

    apiService = this.props.apiContext.actions;
    chatService = this.props.chatContext.actions;

    emailRef = React.createRef();
    passwordRef = React.createRef();

    state = {
        loginDisabled: true
    }

    handleLogin = (email, password, updateUserInfo, setRootNavigation, navigate) => {
        let data = {
            email: email || '',
            password: password || ''
        };

        this.apiService.post(`${Config.host}/api/v1/login/`, data).then( res => {
            updateUserInfo(res.data);
            console.log('hello');
            setRootNavigation('Home');
            navigate('Home');
            console.log('!!!!');
        }).catch(err => {
            console.warn(err.response.data);
        });
    }

    handleDisableLogin = (email, password) => {
        if (email && password) {
            this.setState({
                loginDisabled: false
            });
            return;
        }

        this.setState({
            loginDisabled: true
        });
    }

    // TODO: Move this to navigation Provider
    handleSetRootNavigation = (route) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const {navigate} = this.props.navigation;
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
                        <AppInput
                            ref={this.emailRef}
                            placeholder={'Email'}
                            onChangeText={() => this.handleDisableLogin(
                                this.emailRef.current._lastNativeText,
                                this.passwordRef.current._lastNativeText
                            )}
                        />
                        <AppInput
                            ref={this.passwordRef}
                            secureTextEntry={true}
                            placeholder={'Password'}
                            onChangeText={() => this.handleDisableLogin(
                                this.emailRef.current._lastNativeText,
                                this.passwordRef.current._lastNativeText
                            )}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton
                            type={"primary"}
                            style={{marginBottom: 5}}
                            disabled={this.state.loginDisabled}
                            onPress={() => this.handleLogin(
                                this.emailRef.current._lastNativeText,
                                this.passwordRef.current._lastNativeText,
                                this.chatService.updateUserInfo,
                                this.handleSetRootNavigation,
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


export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <LoginScreen
                        {...props}
                        chatContext={chatContext}
                        apiContext={apiContext}
                        ref={ref}
                    />
                }
            </APIConsumer>
        }
    </ChatConsumer>
));