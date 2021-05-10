import * as  React from "react";
import { Header,Icon,Badge } from "react-native-elements";
import {View} from "react-native" ;
import db from "../config";
import firebase from "firebase"
class MyHeader extends React.Component {
   constructor(props){
       super(props)
       this.state={
           value:"",
           userId:firebase.auth().currentUser.email

       }
   }
   getUnreadNotifications=()=>{
        db.collection("notifications").where("notificationStatus","==","unread").where("targetedUserId","==",this.state.userId).onSnapshot(
            (snapshot)=>{
                var unreadNotifications=snapshot.docs.map(doc=>doc.data())
                this.setState({
                    value:unreadNotifications.length
                })
            }
        )
   }
   componentDidMount(){
        this.getUnreadNotifications()
   }
    render() {
         return (
            <Header
                backgroundColor="gold"
                leftComponent={<Icon name="bars" type="font-awesome" color="black" onPress={()=>{
                    this.props.navigation.toggleDrawer()
                }}/>}
                rightComponent={
                <View>
                <Icon name="bell" type="font-awesome" color="black"   onPress={()=>{{
                    this.props.navigation.navigate("Notifications")
                }}} />
                <Badge value={this.state.value} containerStyle={{position:"absolute",top:-4,right:-4}}/>
                </View>
                }
                centerComponent={{ text:this.props.title, style: { color: "black", fontSize: 30, paddingVertical: 20, fontWeight: "bold" } }}
            />
        )
    }
}

export default MyHeader;