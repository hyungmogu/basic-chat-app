import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import AddNewChatScreen from '../screens/AddNewChatScreen';

const MainAppNavigation = createStackNavigator({
    Login: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: true,
            headerLeft: () => false,
            title: 'User Name Goes Here'
        }
    },
    AddNewChat: {
        screen: AddNewChatScreen,
        navigationOptions: {
            headerShown: true,
            title: 'Add New Chat'
        }
    }
},
{
    initialRouteName: 'Login',
    defaultNavigationOptions: {
    headerShown: false
    }
});

const AppNavigator = createAppContainer(MainAppNavigation);

export default AppNavigator;