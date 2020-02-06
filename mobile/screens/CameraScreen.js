import React, { Component } from 'react';
import {
    StatusBar,
    Text, View,
    SafeAreaView, TouchableOpacity,
    StyleSheet, Image
} from 'react-native';

import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

import { PhotoAppContext } from '../components/Context';

export default class CameraScreen extends Component {

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
        return (
            <PhotoAppContext.Consumer>
                { context => {
                    let permission = context.hasPermission;
                    let type = context.cameraType;
                    let photo = context.latestImage;
                    let photosPath = context.photosPath;
                    let addPhoto = context.actions.addPhoto;
                    let flipCamera = context.actions.flipCamera;

                    if (permission === null) {
                        return <View />;
                    }
                    if (permission === false) {
                        return <Text>No access to camera</Text>;
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
                                        <Ionicons name="md-reverse-camera" style={{color: 'white'}} size={40}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.circleButton}
                                        onPress={() => this.takePicture(addPhoto)}
                                    >
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.imageContainer}>
                                    { photo ?
                                        <TouchableOpacity onPress={() => navigate('PhotoDetail', {
                                            photo: photosPath + photo
                                        })}>
                                            <Image
                                                style={styles.image}
                                                contain={'center'}
                                                source={{uri: photosPath + photo}}
                                            />
                                        </TouchableOpacity>
                                    : null}
                                </View>
                            </View>
                        </SafeAreaView>
                    );
                }}
            </PhotoAppContext.Consumer>
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
