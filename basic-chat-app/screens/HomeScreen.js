import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import axios from 'axios';

import ChatMenuItem from '../components/ChatMenuItem';
import AddNewButton from '../components/AddNewButton';

export default class HomeScreen extends Component {

    state = {
        loaded: false,
        rooms: []
    }

    componentDidMount() {
        let opts = {
            headers: {
                Authorization: 'Token bcaf3fb0f2b93a6a4c6fe2808c2a65084e61a097'
            }
        }
        axios.get('http://localhost:8000/api/v1/chats/', opts).then(res => {

            this.setState(prevState => {
                return {
                    loaded: true,
                    rooms: [...res.data]
                }
            })

            console.log(this.state.rooms)
        })
    }

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
                            onPress={() => navigate('Chat')}
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
