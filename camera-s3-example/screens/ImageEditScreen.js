import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import ImageEditor from '@react-native-community/image-editor';

import ImageCropper from '../components/ImageCropper';

const DEFAULT_IMAGE_HEIGHT = 720;
const DEFAULT_IMAGE_WIDTH = 1080;

export default class ImageEditScreen extends Component {

    state = {
        photo: {
            uri: this.props.navigation.state.params.image,
            height: DEFAULT_IMAGE_HEIGHT,
            width: DEFAULT_IMAGE_WIDTH,
        },
        measuredSize: null,
        croppedImageURI: null,
        cropError: null
    };

    render() {
        if (!this.state.measuredSize) {
            return (
            <View
                style={styles.container}
                onLayout={event => {
                const measuredWidth = event.nativeEvent.layout.width;
                if (!measuredWidth) {
                    return;
                }
                this.setState({
                    measuredSize: {width: measuredWidth, height: measuredWidth},
                });
                }}
            />
            );
        }

        if (!this.state.croppedImageURI) {
            return this._renderImageCropper();
        }
        return this._renderCroppedImage();
    }

    _renderImageCropper() {
        if (!this.state.photo) {
          return <View style={styles.container} />;
        }
        let error = null;
        if (this.state.cropError) {
          error = <Text>{this.state.cropError.message}</Text>;
        }
        return (
          <View style={styles.container}>
            <Text style={styles.text} testID={'headerText'}>
              Drag the image within the square to crop:
            </Text>
            <ImageCropper
              image={this.state.photo}
              size={this.state.measuredSize}
              style={[styles.imageCropper, this.state.measuredSize]}
              onTransformDataChange={data => (this._transformData = data)}
            />
            <TouchableHighlight
              style={styles.cropButtonTouchable}
              onPress={this._crop.bind(this)}>
              <View style={styles.cropButton}>
                <Text style={styles.cropButtonLabel}>Crop</Text>
              </View>
            </TouchableHighlight>
            {error}
          </View>
        );
    }

    _renderCroppedImage() {
        return (
            <View style={styles.container}>
            <Text style={styles.text}>Here is the cropped image:</Text>
            <Image
                source={{uri: this.state.croppedImageURI}}
                style={[styles.imageCropper, this.state.measuredSize]}
            />
            <TouchableHighlight
                style={styles.cropButtonTouchable}
                onPress={this._reset.bind(this)}>
                <View style={styles.cropButton}>
                <Text style={styles.cropButtonLabel}>Try again</Text>
                </View>
            </TouchableHighlight>
            </View>
        );
    }

    async _crop() {
        try {
            const croppedImageURI = await ImageEditor.cropImage(
            this.state.photo.uri,
            this._transformData,
            );

            if (croppedImageURI) {
            this.setState({croppedImageURI});
            }
        } catch (cropError) {
            this.setState({cropError});
        }
    }

    _reset() {
        this.setState({
            croppedImageURI: null,
            cropError: null,
        });
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
      marginTop: 60,
    },
    imageCropper: {
      alignSelf: 'center',
      marginTop: 12,
    },
    cropButtonTouchable: {
      alignSelf: 'center',
      marginTop: 12,
    },
    cropButton: {
      padding: 12,
      backgroundColor: 'blue',
      borderRadius: 4,
    },
    cropButtonLabel: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    text: {
      color: 'white',
    },
  });