import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

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