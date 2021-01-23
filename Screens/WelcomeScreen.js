import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:""
        }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            return Alert.alert("Secussesfully Logged in")
        }).catch((error)=>{
            return Alert.alert(error.message)
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Book Santa</Text>
                <TextInput 
                    style={styles.inputBox}
                    placeholder="EmailId"
                    keyboardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}
                    value={
                        this.state.emailId
                    }
                />

                <TextInput 
                    style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                    value={
                        this.state.password
                    }
                />

                <TouchableOpacity style={styles.button} onPress={()=>{
                    this.userLogin(this.state.emailId,this.state.password)
                }}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create(
    {
       container:{
           alignItems:"center",
           justifyContent:"center",
           marginTop:100,
       },
       text:{
           fontSize:20,
           fontWeight:"bold",
           
       },
       inputBox:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        padding:10,
        borderWidth:1,
        width:"80%",
        height:100,
       },
       button:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        padding:10,
        borderWidth:1,
        width:"50%",
        height:100,
       }

    }
)