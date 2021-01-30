import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./Screens/WelcomeScreen";
import {AppTabNavigator} from "./Components/AppTabNavigator";
import {createSwitchNavigator,createAppContainer} from "react-navigation";

export default class App extends Component {
  render(){
    return(
      <AppContainer/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppTabNavigator:{screen:AppTabNavigator}
})
 
var AppContainer=createAppContainer(SwitchNavigator)