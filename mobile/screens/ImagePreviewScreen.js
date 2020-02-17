import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView
} from 'react-native';

import { ChatConsumer, APIConsumer } from '../components/Context';

class ImagePreviewScreen extends Component {

    render() {
        let photo = this.props.navigation.state.params.photo;

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
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Select Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
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
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
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