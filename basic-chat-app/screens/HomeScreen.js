import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import axios from 'axios';

import { Consumer } from '../components/Context';
import ChatMenuItem from '../components/ChatMenuItem';
import AddNewButton from '../components/AddNewButton';

class HomeScreen extends Component {

    state = {
        loaded: false,
        rooms: []
    }

    componentDidMount() {
        this.handleGetRooms(this.props.context.auth_token);
    }

    handleGetRooms = (authToken) => {
        // TEMP
        let opts = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        }

        axios.get('http://localhost:8000/api/v1/chats/', opts).then(res => {
            this.setState(prevState => {
                return {
                    loaded: true,
                    rooms: [...res.data]
                }
            })
        }).catch(err => {
            console.warn(err);
        })
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <AddNewButton onPress={() => navigate('AddNewChat')}/>
                <ScrollView style={styles.container}>
                    { this.state.rooms.map((item, index) =>
                        <ChatMenuItem
                            key={index}
                            name={item.name}
                            latestMessage={item.latestText || 'Add New Message Here'}
                            image={item.profile_picture || 'https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg'}
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


export default React.forwardRef((props, ref) => (
    <Consumer>
      {context => <HomeScreen {...props} context={context} ref={ref} />}
    </Consumer>
  ));