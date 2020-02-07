import React, { Component } from 'react';
import { StatusBar, Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';

import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default class App extends Component {
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


  handleTakePicture = async () => {
      if (!this.camera) {
          return;
      }

      let photo = await this.camera.takePictureAsync({
        base64:true
      });

      if (!photo || !photo.uri) {
          return Alert('Error: Photo returned empty');
      }

      let data =  {
        'image': photo.uri
      };

      let opts = {
        'headers': {
          'Authorization': `Token f75a536535c0e1b7e732cd9a16fc40311922295d`
        },
        'content-type': 'application/json'
      }

      // if submission successful, go back a page
      axios.post('http://localhost:8000/api/v1/photo/', data, opts).then(_ => {
        console.log('success');
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
      let permission = this.state.hasPermission;
      let type = this.state.cameraType;
      let addPhoto = this.handleAddPhoto;
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
                          onPress={() => this.handleTakePicture(addPhoto)}
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