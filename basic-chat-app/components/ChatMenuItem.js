import React, { Component } from 'react';
import { StyleSheet, Text , TouchableOpacity, Image, View } from 'react-native';

class ChatMenuItem extends Component {
    render() {
        const {
            onPress,
            image,
            name,
            latestMessage
        } = this.props;

        return (
            <TouchableOpacity style={styles.item} onPress={onPress}>
                <Image source={{uri: image }} style={styles.userImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text>{latestMessage}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 5
    }
});

export default ChatMenuItem;