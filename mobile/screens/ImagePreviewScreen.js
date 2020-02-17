import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Platform
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';

import { ChatConsumer, APIConsumer } from '../components/Context';

class ImagePreviewScreen extends Component {

    apiService = this.props.apiContext.actions
    chatService = this.props.chatContext.actions

    handleSendPhoto = async (photo, updateUserInfo) => {
        let resizedPhoto = await ImageManipulator.manipulateAsync(
            photo,
            [{ resize: { width: 200, height: 266.67 } }],
            { compress: 1, format: "jpeg", base64: false }
        );

        if (!resizedPhoto) {
            return Alert.alert('Error: Photo returned empty');
        }

        let localUri = resizedPhoto.uri;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let data = new FormData();
        data.append('photo', {
            name: filename,
            type: type,
            uri: Platform.OS === "android" ? localUri : localUri.replace("file://", "")
        });

        this.apiService.post(`${Config.host}/api/v1/photo/`, data, null, true).then( res => {
            updateUserInfo({avatar: res.data['image']});
            this.props.navigation.goBack(null);
        }).catch(err => {
            console.warn(err);
        })
    }

    render() {
        let photo = this.props.navigation.state.params.photo;
        let updateUserInfo = this.chatService.updateUserInfo;

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Image
                        source={{uri: photo}}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <View style={{flex:1}}></View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleSendPhoto(photo, updateUserInfo)}
                        >
                            <Text style={styles.buttonText}>Select Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
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
    footerContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
        display: 'flex'
    },
    buttonContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'ios' ? 15 : 0
    },
    button: {
        padding: 10
    },
    buttonText: {
        color: 'white'
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