import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList} from "react-native";
import firebase from "firebase";
import db from "../config";
import {ListItem} from 'react-native-elements';
import MyHeader from "../Components/MyHeader";
import {RFValue} from "react-native-responsive-fontsize";
export default class MyDonations extends React.Component{
    constructor(){
        super()
        this.state={
            allDonations:[],
            donorId:firebase.auth().currentUser.email,
            donorName:"",

        }
        this.requestRef=null
    }
    getDonarDetails=()=>{
        db.collection("users").where("emailId","==",this.state.donorId).get().then((Snapshot)=>{
            Snapshot.forEach((doc)=>{
                this.setState({donorName:doc.data().firstName})
            })
        })
    }
    
    getallDonations=()=>{
        this.requestRef=db.collection("donationsMade").where("donorId","==",this.state.donorId).onSnapshot((Snapshot)=>{
            var allDonations=Snapshot.docs.map(document=>document.data())
            this.setState({allDonations:allDonations})
        })
    }
    sendNotification=(bookDetails,requestStatus)=>{
        
        db.collection("notifications").where("requestId","==",bookDetails.requestId)
        .where("donorId","==",this.state.donorId).get().then((Snapshot)=>{
            Snapshot.forEach((doc)=>{
                var message=""
                if(requestStatus==="bookSent"){
                    message=this.state.donorName + " has sent you the book"
                }else{
                    message=this.state.donorName + " has shown interest"
                }
                db.collection("notification").doc(doc.id).update({
                    message:message,
                    notificationStatus:"unread",
                    date:firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
        
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.requestStatus==="bookSent"){
            var requestStatus="Donor interested"
            db.collection("donationsMade").doc(bookDetails.docId).update({
                requestStatus:requestStatus
            })
            this.sendNotification(bookDetails,requestStatus)
        }else{
            var requestStatus="bookSent"
            db.collection("donationsMade").doc(bookDetails.docId).update({
                requestStatus:requestStatus
            })
            this.sendNotification(bookDetails,requestStatus)
        }
    }
    componentDidMount(){
        this.getallDonations()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    renderItem=({item,index})=>{
        return(
            <ListItem
                key={index}
                title={item.bookName}
                subtitle={item.reasonToRequest}
                rightElement={
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.sendBook(item)
                    }}><Text style={styles.text}>{
                        item.requestStatus==="bookSent"?"bookSent":"send book"
                    }</Text></TouchableOpacity>
                }
                bottomDivider
            />
        )

    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Books Donated" navigation={this.props.navigation}/>
                
                {
                    this.state.allDonations.length===0?(<Text style={styles.text}>Loading..</Text>):(
                        <FlatList
                            keyExtractor={(item,index)=>index.toString()}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}
                        />

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