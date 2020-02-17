import React, { Component } from 'react';
import {
    Dimensions, Image,
    View, StyleSheet
} from 'react-native';

import { ChatConsumer, APIConsumer } from '../components/Context';

class ImagePreviewScreen extends Component {

    render() {
        // let photo = this.props.navigation.state.params.photo;
        let photo = 'https://hyungmogu-chat-application.s3-us-west-2.amazonaws.com/usr/2/avatar.jpeg';

        return (
            <View style={styles.container}>
                <Image
                    source={{uri: photo}}
                    resizeMode={'contain'}
                    style={styles.image}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});


export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <ImagePreviewScreen
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