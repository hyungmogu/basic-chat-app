import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';

import AppInput from '../components/AppInput';
import Logo from '../components/Logo';
import AppButton from '../components/AppButton';

export default class LoginScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Logo/>
                    </View>
                    <View style={styles.inputContainer}>
                        <AppInput placeholder={'Email'}/>
                        <AppInput secureTextEntry={true} placeholder={'Password'}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton type={"primary"} onPress={() => navigate('Home')}>Login</AppButton>
                        <AppButton type={"secondary"} onPress={() => navigate('SignUp')}>Sign Up</AppButton>
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
