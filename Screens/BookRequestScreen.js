import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            bookName:"",
            reasonToRequest:"",
            userId:firebase.auth().currentUser.email
        }
    }
    createUniqueId(){
        return (Math.random().toString(36).substring(7))
    }
    addRequest=(bookName,reasonToRequest)=>{
        var requestId=this.createUniqueId()
        db.collection("requestedBooks").add({
            userId:this.state.userId,
            bookName:bookName,
            reasonToRequest:reasonToRequest,
            requestId:requestId
        })
        this.setState({
            bookName:"",
            reasonToRequest:""
        })
        return Alert.alert("Request made")
    }
    render(){
        return(
            <View>
                <MyHeader/>
            <View style={styles.container}>
                
                <Text style={styles.text}>Request Books from others</Text>
            <KeyboardAvoidingView>
                <TextInput placeholder="Book name" style={styles.inputBox} value={this.state.bookName} onChangeText={(text)=>{
                    this.setState({bookName:text})
                }}/>

                <TextInput placeholder="Reason to request" style={[styles.inputBox]} value={this.state.reasonToRequest} onChangeText={(text)=>{
                    this.setState({reasonToRequest:text})
                }} multiline/>
                
                <TouchableOpacity style={styles.button} onPress={()=>{
                    this.addRequest(this.state.bookName,this.state.reasonToRequest);
                }}>
                    <Text style={styles.text}>Request Book</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            </View>
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
       container:{
           
           justifyContent:"center",
           
       },
       text:{
           fontSize:20,
           fontWeight:"bold",
           alignSelf:"center",
           marginTop:20,
           
           
       },
       inputBox:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        alignSelf:"center",
        borderWidth:1,
        width:"80%",
        fontSize:20,
        textAlign:"center",
        padding:10,
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