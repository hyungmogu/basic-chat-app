import React, { Component } from 'react';
import { StyleSheet, Text , TouchableOpacity} from 'react-native';

class ChatMenuItem extends Component {
    render() {
        const {
            type
        } = this.props;

        return (
            <TouchableOpacity style={styles.item}>
                <Image source={{ uri: "http://via.placeholder.com/150x150"}} style={styles.userImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>James</Text>
                    <Text>Hello World</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 10,
        fontSize: 20,
        width: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    primary: {
        backgroundColor: '#E2E2E2'
    },
    secondary: {
        backgroundColor: '#D6D6D6'
    }
});

export default ChatMenuItem;