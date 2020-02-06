import React from 'react';

import { Platform } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import AddNewChatScreen from '../screens/AddNewChatScreen';
import UserScreen from '../screens/UserScreen';
import ChatScreen from '../screens/ChatScreen';
import CameraScreen from '../screens/CameraScreen';

import HomeTitle from '../components/header/HomeTitle';
import ChatTitle from '../components/header/ChatTitle';

const MainAppNavigation = createStackNavigator({
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    User: {
        screen: UserScreen,
        navigationOptions: {
            headerShown: true,
            title: 'Profile'
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: true,
            headerLeft: () => false,
            headerTitle: () => <HomeTitle/>
        }
    },
    AddNewChat: {
        screen: AddNewChatScreen,
        navigationOptions: {
            headerShown: true,
            title: 'Add New Chat'
        }
    },
    Chat: {
        screen: ChatScreen,
        navigationOptions: {
            headerShown: true,
            headerTitle: () => <ChatTitle/>
        }
    },
    Camera: {
        screen: CameraScreen,
        navigationOptions: {
            headerShown: false
        }
    }
},
{
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
            elevation: 0,
            borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
            borderBottomColor: '#E6E6E7'
        },
        headerTitleStyle: {
            fontSize: 15,
            fontWeight: 'bold'
        },
        headerBackTitleVisible: false
    }
});

const AppNavigator = createAppContainer(MainAppNavigation);

export default AppNavigator;