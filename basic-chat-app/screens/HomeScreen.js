import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import ChatMenuItem from '../components/ChatMenuItem';
import AddNewButton from '../components/AddNewButton';

export default class HomeScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <AddNewButton onPress={() => navigate('AddNewChat')}/>
                <ScrollView style={styles.container}>
                    { [...Array(20).keys()].map(index =>
                        <ChatMenuItem
                            key={index}
                            name={'James'}
                            latestMessage={'Hello World'}
                            image={'https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg'}
                            onPress={() => {}}
                        />
                    )}
                </ScrollView>
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
        flex: 1
    }
});
