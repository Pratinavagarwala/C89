import * as  React from "react" ;
import {createBottomTabNavigator} from "react-navigation-tabs";
import BookRequestScreen from "../Screens/BookRequestScreen";
import {AppStackNavigator} from "./AppStackNavigator";

export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{screen:AppStackNavigator},
    RequestBooks:{screen:BookRequestScreen}
})