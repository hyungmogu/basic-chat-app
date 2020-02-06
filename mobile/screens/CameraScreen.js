import React, { Component } from 'react';
import { StatusBar, Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

export default class CameraScreen extends Component {

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


    takePicture = async (addPhoto) => {
        if (!this.camera) {
            return;
        }

        let photo = await this.camera.takePictureAsync();

        if (!photo || !photo.uri) {
            return
        }

        addPhoto(photo);
    }

    render() {
        const {navigate} = this.props.navigation;
        let permission = this.state.hasPermission;
        let type = this.state.cameraType;
        let photo = this.state.latestImage;
        let photosPath = this.state.photosPath;
        let addPhoto = this.handleAddPhoto;
        let flipCamera = this.handleFlipCamera;

        if (!permission) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text>No access to camera</Text>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <Camera
                    style={styles.camera}
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
                            onPress={() => this.takePicture(addPhoto)}
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
