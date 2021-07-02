import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList} from "react-native";
import firebase from "firebase";
import db from "../config";
import {ListItem} from 'react-native-elements';
import MyHeader from "../Components/MyHeader";
import {RFValue} from "react-native-responsive-fontsize";
export default class MyReceivedBooks extends React.Component{
    constructor(){
        super()
        this.state={
            recievedBookList:[],
           userId:firebase.auth().currentUser.email,
            

        }
        this.requestRef=null
    }
    
    
    getrecievedBookList=()=>{
        this.requestRef=db.collection("requestedBooks").where("userId","==",this.state.userId)
        .where("bookStatus","==","received")
        .onSnapshot((Snapshot)=>{
            var recievedBookList=Snapshot.docs.map(document=>document.data())
            this.setState({recievedBookList:recievedBookList})
        })
    }
   
    
    componentDidMount(){
        this.getrecievedBookList()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    renderItem=({item,index})=>{
        return(
            <ListItem
                key={index}
                title={item.bookName}
                subtitle={item.bookStatus}
                
                bottomDivider
            />
        )

    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Books Received" navigation={this.props.navigation}/>
                
                {
                    this.state.recievedBookList.length===0?(<Text style={styles.text}>Loading..</Text>):(
                        <FlatList
                            keyExtractor={(item,index)=>index.toString()}
                            data={this.state.recievedBookList}
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