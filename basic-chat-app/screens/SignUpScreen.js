import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';

import Logo from '../components/Logo';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default class SignUpScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Logo/>
                    </View>
                    <View style={styles.inputContainer}>
                        <AppInput placeholder={'Name'}/>
                        <AppInput placeholder={'Email'}/>
                        <AppInput placeholder={'Password'}/>
                        <AppInput placeholder={'Password Confirm'}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton type={"primary"}>Sign Up</AppButton>
                        <AppButton type={"secondary"} onPress={() => navigate('Login')}>Back</AppButton>
                    </View>
                </View>
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
        paddingHorizontal: 20
    },
    logoContainer: {
        marginTop: Dimensions.get('window').height / 6
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
