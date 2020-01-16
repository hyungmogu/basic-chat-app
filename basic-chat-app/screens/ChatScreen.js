import React, { Component } from 'react';
import { StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView, View, Platform } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextArea from '../components/AppTextArea';

export default class ChatScreen extends Component {
    state = {
        text: '',
        height: 0
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                    <View style={styles.chatContainer}>

                    </View>
                    <View style={styles.inputContainer}>
                        <AppTextArea
                            placeholder={'Message'}
                            onChangeText={(text) => {
                                this.setState({ text })
                            }}
                            style={{flex: 1, marginRight: 10}}
                        />
                        <AppButton type={'secondary'}>Submit</AppButton>
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
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    chatContainer: {
        flex: 1
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        flexDirection: 'row',
        padding: 10
    }
});
