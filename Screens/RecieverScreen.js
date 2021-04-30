import * as React from 'react';
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native';
import MyHeader from '../Components/MyHeader';
import firebase from 'firebase';
import { Card } from 'react-native-elements';
import db from '../config'
import { add } from 'react-native-reanimated';
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
    updateBookStatus=()=>{
        db.collection("donationsMade").add({
            bookName:this.state.bookName,
            requestId:this.state.requestId,
            requestedBy:this.state.recieverName,
            donorId:this.state.userId,
            requestStatus:"donor interested"
        })
    }
    addNotifications=()=>{
        db.collection("notifications").add({
           targetedUserId:this.state.recieverId,
           donorId:this.state.userId,
           requestId:this.state.requestId,
           bookName:this.state.bookName,
           date:firebase.firestore.FieldValue.serverTimestamp(), 
           notificationStatus:"unread",
           message:this.state.userId+" Has shown interest in donating the book"
        })

    }
    render(){
        return(
            <View>
                <MyHeader/>
                <Text style={styles.text}>Reciever Screen</Text>
                <Card><Text>{this.state.recieverName}</Text></Card>
                <Card><Text>{this.state.recieverContact}</Text></Card>
                <Card><Text>{this.state.recieverAddress}</Text></Card>
                {this.state.recieverId!==this.state.userId?(
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.updateBookStatus()
                        this.addNotifications()
                        this.props.navigation.navigate("Donations_Made")
                    }}><Text>Donate requested items</Text></TouchableOpacity>
                ):(null)}
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
        text:{
            fontSize:20,
            fontWeight:"bold",
            justifyContent:"center",
            textAlign:"center"                     
        },
        button:{
            alignItems:"center",
            justifyContent:"center",
            marginTop:10,
            padding:10,
            borderWidth:1,
            width:"50%",
            height:100,
            alignSelf:"center",
           }
    }
)