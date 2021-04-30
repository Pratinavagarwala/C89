import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from '../Screens/SettingsScreen';
import MyDonations from "../Screens/MyDonations";
import MyNotifications from "../Screens/MyNotifications";
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Settings:{screen:SettingsScreen},
    Notifications:{screen:MyNotifications},
    Donations_Made:{screen:MyDonations}
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:"Home"
})