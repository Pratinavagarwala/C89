import * as  React from "react" ;
import {View,Text,StyleSheet,FlatList} from "react-native";
import firebase from "firebase";
import db from "../config";
import {ListItem} from 'react-native-elements';
import MyHeader from "../Components/MyHeader";
import SwipeableFlatlist from '../Components/SwipeableFlatlist';
import {RFValue} from "react-native-responsive-fontsize";
export default class MyNotifications extends React.Component{
    constructor(){
        super()
        this.state={
            allNotifications:[],
            userId:firebase.auth().currentUser.email
        }
        this.requestRef=null
    }
    getallNotifications=()=>{
        this.requestRef=db.collection("notifications").where("notificationStatus","==","unread").where("targetedUserId","==",this.state.userId)
        .onSnapshot((Snapshot)=>{
            var allNotifications=Snapshot.docs.map(document=>document.data())
            this.setState({allNotifications:allNotifications})
        })
    }
    componentDidMount(){
        this.getallNotifications()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    renderItem=({item,index})=>{
        return(
            <ListItem
                key={index}
                title={item.bookName}
                subtitle={item.message}
                titleStyle={{color:"gold",fontWeight:"bold"}}
                bottomDivider
            />
        )

    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Notifications" navigation={this.props.navigation}/>
                
                {
                    this.state.allNotifications.length===0?(<Text style={styles.text}>Loading..</Text>):(
                        <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
                                                   
                    )
                }
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
        marginBottom:20
        
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