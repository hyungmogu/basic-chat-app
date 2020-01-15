import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import Logo from '../components/Logo';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default class SignUpScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <KeyboardAvoidingView style={styles.container} behavior = "padding" enabled>
                    <View style={styles.logoContainer}>
                        <Logo/>
                    </View>
                    <View style={styles.inputContainer}>
                        <AppInput placeholder={'Name'}/>
                        <AppInput placeholder={'Email'}/>
                        <AppInput placeholder={'Password'} secureTextEntry={true}/>
                        <AppInput placeholder={'Password Confirm'} secureTextEntry={true}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton type={"primary"}>Sign Up</AppButton>
                        <AppButton type={"secondary"} onPress={() => navigate('Login')}>Back</AppButton>
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
