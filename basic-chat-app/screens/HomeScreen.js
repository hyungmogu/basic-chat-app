import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { ChatConsumer, APIConsumer } from '../components/Context';
import ChatMenuItem from '../components/ChatMenuItem';
import AddNewButton from '../components/AddNewButton';

class HomeScreen extends Component {

    chatService = this.props.chatContext.actions;
    apiService = this.props.apiContext.actions;

    state = {
        isLoaded: false
    }

    componentDidUpdate() {
        if (!this.authTokenExists(authToken)) {
            return;
        }

        if (this.state.isLoaded) {
            return;
        }

        this.setState({
            isLoaded: true
        })
        this.handleGetRooms(
            this.props.chatContext.user.authToken,
            this.props.chatContext.actions.addChatUsers
        );
    }

    handleGetRooms = (authToken, addChatUsers) => {
        this.apiService.get('http://localhost:8000/api/v1/chats/', authToken).then(res => {
            addChatUsers(res.data);
        }).catch(err => {
            console.warn(err.response.data.detail);
        })
    }

    authTokenExists(authToken) {
        if(!authToken) {
            return false;
        }

        return true;
    }

    render() {
        const {navigate} = this.props.navigation;
        const chatUsers = this.props.chatContext.chatUsers;
        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <AddNewButton onPress={() => navigate('AddNewChat')}/>
                <ScrollView style={styles.container}>
                    { chatUsers.map((item, index) =>
                        <ChatMenuItem
                            key={index}
                            name={item.name}
                            latestMessage={item.latestText || 'Add New Message Here'}
                            image={item.avatar || 'https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg'}
                            onPress={() => navigate('Chat', {
                                chatUser: item
                            })}
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


export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <HomeScreen {...props} chatContext={chatContext} apiContext={apiContext} ref={ref} />
                }
            </APIConsumer>
        }
    </ChatConsumer>
));