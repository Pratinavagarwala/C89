import * as React from 'react';
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native';
import MyHeader from '../Components/MyHeader';
import firebase from 'firebase';
import { Card } from 'react-native-elements';

export default class RecieverScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam("details")["userId"],
            requestId:this.props.navigation.getParam("details")["requestId"],
            bookName:this.props.navigation.getParam("details")["bookName"],
            reasonToRequest:this.props.navigation.getParam("details")["reasonToRequest"],
            recieverName:"",
            recieverContact:"",
            recieverAddress:"",
            recieverRequestDocId:""
        }
    }
    getRecieverDetail(){
        db.collection("users").where("emailId","==",this.state.recieverId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{
                var data=doc.data()
                this.setState({
                    recieverName:data.firstName,
                    recieverContact:data.phoneNo,
                    recieverAddress:data.address,
                    
                    
                })
            })
        })
        db.collection("requestedBooks").where("requestId","==",this.state.requestId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{
                var data=doc.data()
                this.setState({
                    recieverRequestDocId:doc.id
                })
            })
        })

    }
    componentDidMount(){
        this.getRecieverDetail()
    }
    render(){
        return(
            <View>
                <MyHeader/>
                <Text>Reciever Screen</Text>
                <Card><Text>{this.state.recieverName}</Text></Card>
                <Card><Text>{this.state.recieverContact}</Text></Card>
                <Card><Text>{this.state.recieverAddress}</Text></Card>
            </View>
        )
    }
}