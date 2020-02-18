import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { ChatConsumer, APIConsumer } from '../components/Context';
import ChatMenuItem from '../components/ChatMenuItem';
import AddNewButton from '../components/AddNewButton';
import Config from '../Config';

class HomeScreen extends Component {

    chatService = this.props.chatContext.actions;
    apiService = this.props.apiContext.actions;

    defaultAvatar = Config.defaultAvatar;

    componentDidMount() {
        if (!this.props.chatContext.user.authToken) {
            return;
        }

        this.handleGetRooms(
            this.props.chatContext.user.authToken,
            this.chatService.loadChatUsers
        );
    }

    handleGetRooms = (authToken, loadChatUsers) => {
        this.apiService.get(`${Config.host}/api/v1/chats/`, authToken).then(res => {
            loadChatUsers(res.data);
        }).catch(err => {
            console.warn(err.response.data.detail);
        })
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
                            image={item.avatar || this.defaultAvatar}
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
                    <HomeScreen
                        {...props}
                        chatContext={chatContext}
                        apiContext={apiContext}
                        ref={ref}
                    />
                }
            </APIConsumer>
        }
    </ChatConsumer>
));