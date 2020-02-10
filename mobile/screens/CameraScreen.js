import FormData from 'form-data';
import React, { Component } from 'react';
import { StatusBar, Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert } from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';

import { ChatConsumer, APIConsumer } from '../components/Context';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

class CameraScreen extends Component {

    apiService = this.props.apiContext.actions
    chatService = this.props.chatContext.actions

    state = {
        photos: [],
        hasPermission: null,
        cameraType: Camera.Constants.Type.front,
        latestImage: null,
        photosPath: `${FileSystem.documentDirectory}photos/`
    }

    async componentDidMount() {
        const { status } = await Camera.requestPermissionsAsync();

        this.setState({
            hasPermission: status === 'granted'
        });
    }

    handleFlipCamera = () => {
        this.setState(prevState => {
          return {
            cameraType: prevState.cameraType === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front
          }
        })
    }

    handleTakePicture = async (updateUserInfo) => {
        if (!this.camera) {
            return;
        }

        let photo = await this.camera.takePictureAsync();

        let resizedPhoto = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ resize: { width: 200, height: 266.67 } }],
            { compress: 1, format: "jpeg", base64: false }
        );

        if (!resizedPhoto) {
            return Alert.alert('Error: Photo returned empty');
        }

        let localUri = resizedPhoto.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let data = new FormData();
        data.append('photo', {
            name: filename,
            type: type,
            uri: Platform.OS === "android" ? localUri : localUri.replace("file://", "")
        });

        // if submission successful, go back a page
        this.apiService.post(`${Config.host}/api/v1/photo/`, data, null, true).then( res => {
            updateUserInfo({avatar: res.data['image']});
            this.props.navigation.goBack(null);
        }).catch(err => {
            console.warn(err);
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        let permission = this.state.hasPermission;
        let type = this.state.cameraType;
        let flipCamera = this.handleFlipCamera;

        let cameraWidth = Dimensions.get('window').width;
        let cameraHeight = cameraWidth / 0.75;

        if (!permission) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text>No access to camera</Text>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1, backgroundColor: 'black'}}></View>
                <Camera
                    style={{width: cameraWidth, height: cameraHeight}}
                    type={type} ref={ref => {this.camera = ref}}
                >
                </Camera>
                <View style={styles.cameraFooter}>
                    <View style={styles.flipContainer}>
                        <TouchableOpacity onPress={flipCamera}>
                            <Ionicons
                                name="md-reverse-camera"
                                style={{color: 'white'}}
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.circleButton}
                            onPress={() => this.handleTakePicture(
                                this.chatService.updateUserInfo,
                                navigate
                            )}
                        >
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}></View>
                </View>
            </SafeAreaView>
        );
    }
  }

  const styles = StyleSheet.create({
    cameraFooter: {
        height: 100,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    circleButton: {
        borderWidth: 5,
        borderColor: 'grey',
        alignItems:'center',
        justifyContent:'center',
        width:75,
        height:75,
        backgroundColor:'white',
        borderRadius:150,
    },
    camera: {
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    buttonContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flipContainer: {
        flex: 1
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white'
    }
  });


  export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <CameraScreen
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