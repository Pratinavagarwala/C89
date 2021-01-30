import * as  React from "react" ;
import {createBottomTabNavigator} from "react-navigation-tabs";
import BookRequestScreen from "../Screens/BookRequestScreen";
import BookDonateScreen from "../Screens/BookDonateScreen";

export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{screen:BookDonateScreen},
    RequestBooks:{screen:BookRequestScreen}
})