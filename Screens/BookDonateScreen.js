import * as  React from "react" ;
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList} from "react-native";
import firebase from "firebase";
import db from "../config";
import {ListItem} from 'react-native-elements';
import MyHeader from "../Components/MyHeader";

export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state={
            requestedBookList:[]
        }
        this.requestRef=null
    }
    getrequestedBookList=()=>{
        this.requestRef=db.collection("requestedBooks").onSnapshot((Snapshot)=>{
            var requestedBookList=Snapshot.docs.map(document=>document.data())
            this.setState({requestedBookList:requestedBookList})
        })
    }
    componentDidMount(){
        this.getrequestedBookList()
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
                        this.props.navigation.navigate("RecieverScreen",{"details":item})
                    }}><Text style={styles.text}>Donate</Text></TouchableOpacity>
                }
                bottomDivider
            />
        )

    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Donate Books" navigation={this.props.navigation}/>
                <Text style={styles.text}>Donate Books with Others</Text>
                {
                    this.state.requestedBookList.length===0?(<Text style={styles.text}>Loading..</Text>):(
                        <FlatList
                            keyExtractor={(item,index)=>index.toString()}
                            data={this.state.requestedBookList}
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