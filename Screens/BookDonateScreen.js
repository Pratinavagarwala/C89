import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class BookDonateScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Donate Books to others</Text>

            </View>
        )
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