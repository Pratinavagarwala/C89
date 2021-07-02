import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from '../Screens/SettingsScreen';
import MyDonations from "../Screens/MyDonations";
import MyNotifications from "../Screens/MyNotifications";
import { Icon } from 'react-native-elements';
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name="home" type="font-awesome"></Icon>
        }
        },
    Settings:{screen:SettingsScreen,
        navigationOptions:{
            drawerIcon:<Icon name="settings" type="fontawesome5"></Icon>
        }
        },

    Notifications:{screen:MyNotifications,
        navigationOptions:{
            drawerIcon:<Icon name="bell" type="font-awesome"></Icon>
        }
    },
    Donations_Made:{screen:MyDonations,
        navigationOptions:{
            drawerIcon:<Icon name="gift" type="font-awesome"></Icon>
        }
    }
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:"Home"
})