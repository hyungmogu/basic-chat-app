import React, { Component } from 'react';
import { StyleSheet, Text , TouchableOpacity, View } from 'react-native';

class ChatBoxList extends Component {

    handleGetDateTime = (unixTimestamp) => {
        let dateTime = new Date(unixTimestamp * 1000);
        let hours = dateTime.getHours();
        let ampm = (hours >= 12) ? "PM" : "AM";
        let minutes = dateTime.getMinutes();

        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }

        return `${hours}:${minutes} ${ampm}`;
    }

    render() {
        const {
            messages,
            toggleDateTime
        } = this.props;

        let user = {
            name: 'John Doe',
            email: "john@gmail.com"
        };

        return (
            <React.Fragment>
                {
                    messages.map((message, index) =>
                        <View
                            key={index}
                            style={[styles.chatBoxContainer, user.email === message.email ? styles.chatterBoxContainer : styles.chatteeBoxContainer]}
                        >
                            <TouchableOpacity
                                style={[styles.chatbox, user.email === message.email ? styles.chatter : styles.chattee]}
                                onPress={() => toggleDateTime(messages, index)}
                            >
                                <Text>{message.text}</Text>
                            </TouchableOpacity>
                            { message.showDateTime ? <Text style={[styles.dateTime]}>{this.handleGetDateTime(message.timestamp)}</Text> : null }
                        </View>
                    )
                }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    chatBoxContainer: {
        maxWidth: Platform.OS === 'ios' ? 210 : 180,
        marginBottom: 10
    },
    chatterBoxContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    chatteeBoxContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    chatbox: {
        padding: 10,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    chatter: {
        borderBottomLeftRadius: 10,
        backgroundColor: '#D6D6D6',
        borderColor: '#D6D6D6'
    },
    chattee: {
        borderBottomRightRadius: 10,
        backgroundColor: '#E2E2E2',
        borderColor: '#E2E2E2'
    },
    dateTime: {
        padding: 5
    }
});

export default ChatBoxList;