import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text, Alert, Modal } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { ChatConsumer, APIConsumer } from '../components/Context';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

class UserScreen extends Component {

    chatService = this.props.chatContext.actions;
    apiService = this.props.apiContext.actions;

    defaultAvatar = 'https://hyungmogu-portfolio-site.s3-us-west-2.amazonaws.com/chat-application/user-icon.png';

    handleChangeName = React.createRef();

    state = {
        modalVisible: false
    }

    handleLogout = (resetUserInfo, setRootNavigation, navigate) => {
        if (!this.props.chatContext.user.authToken) {
            setRootNavigation('Login');
            navigate('Login');
            return;
        }

        this.apiService.get('http://localhost:8000/api/v1/logout/').then( res => {
            resetUserInfo(res.data);
            setRootNavigation('Login');
            navigate('Login')
        }).catch(err => {
            Alert(err);
        });
    }

    handleSetRootNavigation = (route) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(resetAction);
    }

    setModalVisible(modalVisible) {
        this.setState({
            modalVisible: modalVisible
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        let name = this.props.chatContext.user.name;
        let avatar = this.props.chatContext.user.avatar || this.defaultAvatar;
        let modalVisible = this.state.modalVisible;

        return (
            <SafeAreaView style={styles.safeViewContainer}>
                <View style={styles.container}>
                    <View style={styles.bodyContainer}>
                        <Image
                            style={styles.userImage}
                            source={{uri: avatar}}
                        />
                        <Text style={styles.name}>{ name }</Text>
                        <AppButton>Change Profile Picture</AppButton>
                        <AppButton onPress={() => {
                            this.setModalVisible(true);
                        }}>Change Name</AppButton>
                    </View>
                    <View style={styles.footerContainer}>
                        <AppButton
                            type={'secondary'}
                            onPress={() => this.handleLogout(
                                this.chatService.resetUserInfo,
                                this.handleSetRootNavigation,
                                navigate
                            )}
                        >
                            Logout
                        </AppButton>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <SafeAreaView style={styles.safeViewContainer}>
                        <View style={styles.container}>
                            <Text>Change Name</Text>
                            <AppInput ref={this.textRef} placeholder={'New Name'}/>
                            <AppButton
                                type={"primary"}
                                style={{marginBottom: 5}}
                                onPress={() => this.handleChangeName(
                                    this.textRef.current._lastNativeText
                                )}
                            >
                                Submit
                            </AppButton>
                            <AppButton
                                type={"secondary"}
                                onPress={() => this.setModalVisible(false)}
                            >
                                Close
                            </AppButton>
                        </View>
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        padding: 15
    },
    bodyContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 20
    },
    userImage: {
        width: Platform.OS === 'ios' ? 190 : 160,
        height: Platform.OS === 'ios' ? 190 : 160,
        borderRadius: 200,
        marginBottom: Platform.OS === 'ios' ? 20 : 15
    },
    name: {
        marginBottom: 25,
        fontWeight: 'bold'
    }
});



export default React.forwardRef((props, ref) => (
    <ChatConsumer>
        { chatContext =>
            <APIConsumer>
                { apiContext =>
                    <UserScreen {...props} chatContext={chatContext} apiContext={apiContext} ref={ref} />
                }
            </APIConsumer>
        }
    </ChatConsumer>
));