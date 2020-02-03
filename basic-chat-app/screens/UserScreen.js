import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';

import axios from 'axios';

import { ChatConsumer, APIConsumer } from '../components/Context';
import AppButton from '../components/AppButton';

export default class UserScreen extends Component {

    handleLogout = (authToken, resetUserInfo, setRootNavigation, navigate) => {
        let opts = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        }

        axios.get('http://localhost:8000/api/v1/logout/', opts).then( res => {
            resetUserInfo(res.data);
            setRootNavigation('Login');
            navigate('Login')
        }).catch(err => {
            console.warn(err.response.data.detail);
        });
    }

    handleSetRootNavigation = (route) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ChatConsumer>
                { context => {
                    let name = context.user.name;
                    let authToken = context.user.authToken;
                    let avatar = context.user.avatar || 'https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg';
                    let resetUserInfo = context.actions.resetUserInfo;
                    return (
                        <SafeAreaView style={styles.safeViewContainer}>
                            <View style={styles.container}>
                                <View style={styles.bodyContainer}>
                                    <Image
                                        style={styles.userImage}
                                        source={{uri: avatar}}
                                    />
                                    <Text style={styles.name}>{ name }</Text>
                                    <AppButton>Change Profile Picture</AppButton>
                                    <AppButton>Change Name</AppButton>
                                </View>
                                <View style={styles.footerContainer}>
                                    <AppButton
                                        type={'secondary'}
                                        onPress={() => this.handleLogout(
                                            authToken,
                                            resetUserInfo,
                                            this.handleSetRootNavigation,
                                            navigate
                                        )}
                                    >
                                        Logout
                                    </AppButton>
                                </View>
                            </View>
                        </SafeAreaView>
                    );
                }}
            </ChatConsumer>
        );
    }
}

const styles = StyleSheet.create({
    safeViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        padding: 15
    },
    bodyContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 20
    },
    userImage: {
        width: Platform.OS === 'ios' ? 190 : 160,
        height: Platform.OS === 'ios' ? 190 : 160,
        borderRadius: 200,
        marginBottom: Platform.OS === 'ios' ? 20 : 15
    },
    name: {
        marginBottom: 25,
        fontWeight: 'bold'
    }
});
