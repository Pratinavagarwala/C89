import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./Screens/WelcomeScreen";
import {AppDrawerNavigator} from "./Components/AppDrawerNavigator";
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
  AppDrawerNavigator:{screen:AppDrawerNavigator}
})
 
var AppContainer=createAppContainer(SwitchNavigator)