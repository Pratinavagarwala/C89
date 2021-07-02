import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";
import {RFValue} from "react-native-responsive-fontsize";
export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailId:firebase.auth().currentUser.email,
            firstName:"",
            lastName:"",
            address:"",
            phoneNo:"",
            docId:"",
        }
    }
    componentDidMount(){
        this.getUserDetails();
    }
    getUserDetails(){
        db.collection("users").where("emailId","==",this.state.emailId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{
                var data=doc.data()
                this.setState({
                    emailId:data.emailId,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address,
                    phoneNo:data.phoneNo,
                    docId:doc.id
                })
            })
        })

    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            phoneNo:this.state.phoneNo,
        })
        Alert.alert("Profile Updated")
    }
    render(){
        return(
            <View>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                            <TextInput 
                                placeholder="First Name"
                                style={styles.inputBox}
                                value={this.state.firstName}
                                onChangeText={(text)=>{
                                    this.setState({firstName:text})
                                }}
                            />

                            <TextInput 
                                placeholder="Last Name"
                                style={styles.inputBox}
                                value={this.state.lastName}
                                onChangeText={(text)=>{
                                    this.setState({lastName:text})
                                }}
                            />

                            <TextInput 
                                keyboardType="numeric"
                                placeholder="Phone Number"
                                style={styles.inputBox}
                                value={this.state.phoneNo}
                                onChangeText={(text)=>{
                                    this.setState({phoneNo:text})
                                }}
                            />

                            <TextInput 
                                placeholder="Address"
                                style={styles.inputBox}
                                value={this.state.address}
                                onChangeText={(text)=>{
                                    this.setState({address:text})
                                }}
                            />
                            <TouchableOpacity style={styles.button} onPress={()=>{
                                this.updateUserDetails()
                            }}>
                                <Text style={styles.text}>Save</Text>
                            </TouchableOpacity>

            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
       container:{
           
        alignItems:"center",
           justifyContent:"center",
           marginTop:RFValue(20),
       },
       text:{
        fontSize:RFValue(30),
        fontWeight:"bold",
        justifyContent:"center",
        textAlign:"center"
        
                 
       },
       inputBox:{
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:RFValue(30),
        padding:RFValue(10),
        borderWidth:1,
        width:"80%",
        
       },
       button:{
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:RFValue(30),
        borderWidth:1,
        width:"60%",
        
       }

    }
)