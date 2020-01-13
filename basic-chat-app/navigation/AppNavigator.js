import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';

const MainAppNavigation = createStackNavigator({
    Login: {screen: LoginScreen}
},
{
    initialRouteName: 'Login',
    defaultNavigationOptions: {
    headerShown: false
    }
});

const AppNavigator = createAppContainer(MainAppNavigation);

export default AppNavigator;