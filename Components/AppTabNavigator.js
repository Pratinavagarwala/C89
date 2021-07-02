import * as  React from "react" ;
import {createBottomTabNavigator} from "react-navigation-tabs";
import BookRequestScreen from "../Screens/BookRequestScreen";
import {AppStackNavigator} from "./AppStackNavigator";
import { Icon } from "react-native-elements";
export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{screen:AppStackNavigator,
        navigationOptions:{
            tabBarIcon:<Icon name="book" type="font-awesome"></Icon>
        }
    },
    RequestBooks:{screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:<Icon name="book" type="font-awesome"></Icon>
        }
    }
})