import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

import AppInput from '../components/AppInput';
import Logo from '../components/Logo';
import AppButton from '../components/AppButton';

export default class LoginScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <Logo/>
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
        marginTop: Dimensions.get('window').height / 6,
        alignItems: 'center'
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2',
        padding: 15,
        marginBottom: 5
    },
    inputLogin: {
        width: 350
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    inputContainer: {
        marginBottom: 15,
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});
