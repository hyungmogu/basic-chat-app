import React, { Component } from 'react';
import {
    Dimensions, Image,
    SafeAreaView, StyleSheet
} from 'react-native';

export default class ImageEditScreen extends Component {

  render() {
        let image = this.props.navigation.state.params.image;
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    source={{uri: image.uri}}
                    resizeMode={'contain'}
                    style={styles.image}
                />
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
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});
