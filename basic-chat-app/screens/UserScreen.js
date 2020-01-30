import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';

import { Consumer } from '../components/Context';
import AppButton from '../components/AppButton';

export default class UserScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Consumer>
                { context => {
                    let name = context.name;
                    let avatar = context.avatar || 'https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg';
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
                                        onPress={() => navigate('Login')}
                                    >
                                        Logout
                                    </AppButton>
                                </View>
                            </View>
                        </SafeAreaView>
                    );
                }}
            </Consumer>
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
