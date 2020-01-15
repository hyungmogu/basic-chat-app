import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';

import AppButton from '../components/AppButton';

export default class UserScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <View style={styles.bodyContainer}>
                        <Image source={{uri: 'https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg' }} style={styles.userImage} />
                        <Text>User Name Goes Here</Text>
                        <AppButton>Change Profile Picture</AppButton>
                        <AppButton>Change Name</AppButton>
                    </View>
                    <View style={styles.footerContainer}>
                        <AppButton type={'secondary'} onPress={() => navigate('Login')}>Logout</AppButton>
                    </View>
                </View>
            </SafeAreaView>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImage: {
        width: Platform.OS === 'ios' ? 190 : 160,
        height: Platform.OS === 'ios' ? 190 : 160,
        borderRadius: 200
    },
});
