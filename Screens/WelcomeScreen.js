import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
            isModalVisible:false,
            firstName:"",
            lastName:"",
            phoneNo:"",
            address:"",
            confirmPassword:""
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

    userSignUp=(emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
           return Alert.alert("Password does not match")
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then(()=>{
                 
                db.collection("users").add({
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    phoneNo:this.state.phoneNo,
                    address:this.state.address,
                    emailId:this.state.emailId,
                })
                return Alert.alert("New user registered")
            }).catch((error)=>{
                return Alert.alert(error.message)
                
            })
        }
    }
    showModal=()=>{
        return(
            <Modal animationType="fade" transparent={false} visible={this.state.isModalVisible}>
                <View>
                    <ScrollView style={{width:"100%",}}>
                        <KeyboardAvoidingView>
                            <Text>Registration</Text>
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

                            <TextInput 
                                style={styles.inputBox}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        confirmPassword:text
                                    })
                                }}
                                value={
                                    this.state.confirmPassword
                                }
                            />

                            <TouchableOpacity style={styles.button} onPress={()=>{
                                this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                            }}>
                                <Text style={styles.text}>Register</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={()=>{
                                this.setState({isModalVisible:false})
                            }}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                {this.showModal()}
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

                <TouchableOpacity style={styles.button} onPress={()=>{
                    this.setState({isModalVisible:true})
                }}>
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