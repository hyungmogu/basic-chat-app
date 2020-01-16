import React, { Component } from 'react';
import { StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView, View } from 'react-native';

export default class ChatScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <KeyboardAvoidingView style={styles.container} behavior = "padding" enabled>
                    <View style={styles.chatContainer}>

                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            placeholder={"Message"}
                        />
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
        padding: 10
    },
    input: {
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: Platform.OS === 'ios' ? 15 : 10,
        paddingBottom: Platform.OS === 'ios' ? 15 : 10,
        paddingHorizontal: 20
    }
});
