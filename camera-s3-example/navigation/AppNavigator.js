import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CameraScreen from '../screens/CameraScreen';
import ImageEditScreen from '../screens/ImageEditScreen';

const MainAppNavigation = createStackNavigator({
    Camera: {
        screen: CameraScreen
    },
    ImageEdit: {
        screen: ImageEditScreen
    }
},
{
    initialRouteName: 'Camera',
    defaultNavigationOptions: {
        headerShown: false
    }
});

const AppNavigator = createAppContainer(MainAppNavigation);

export default AppNavigator;