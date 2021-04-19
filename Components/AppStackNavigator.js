import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import DonateScreen from '../Screens/BookDonateScreen';
import RecieverScreen from '../Screens/RecieverScreen';

export const AppStackNavigator=createStackNavigator({
    DonateScreen:{screen:DonateScreen,
        navigationOptions:{headerShown:false}
    },
    RecieverScreen:{screen:RecieverScreen}
},
{
    initialRouteName:"DonateScreen"
}

)
