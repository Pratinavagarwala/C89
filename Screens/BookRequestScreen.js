import * as  React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView } from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";

export default class BookRequestScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            bookName: "",
            reasonToRequest: "",
            userId: firebase.auth().currentUser.email,
            isBookRequestActive: "",
            requestedBookName: "",
            bookStatus: "",
            requestId: "",
            userDocId: "",
            docId: ""
        }
    }
    createUniqueId() {
        return (Math.random().toString(36).substring(7))
    }
    componentDidMount() {
        this.getBookRequest()
        this.getBookRequestActive()
    }
    getBookRequestActive() {
        db.collection("users").where("emailId", "==", this.state.userId).onSnapshot(
            (snapshot) => {
                snapshot.forEach(doc => {
                    this.setState({
                        isBookRequestActive: doc.data().isBookRequestActive,
                        userDocId: doc.id
                    })
                })
            }
        )
    }
    getBookRequest = () => {
        db.collection("requestedBooks").where("userId", "==", this.state.userId).get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    if (doc.date().bookStatus !== "received") {
                        this.setState({
                            requestId: doc.data().requestId,
                            requestedBookName: doc.data().bookName,
                            bookStatus: doc.data().bookStatus,
                            docId: doc.id
                        })
                    }
                })
            }
        )
    }
    updateBookRequestStatus=()=>{
        db.collection("requestedBooks").doc(this.state.docId).update({
            bookStatus:"received"
        })
        db.collection("users").where("emailId", "==", this.state.userId).get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    db.collection("users").doc(doc.id).update({ isBookRequestActive: false })
                })
            }
        )
    }
    recievedBooks=(bookName)=>{
        db.collection("receivedBooks").add({
            userId:this.state.userId,
            requestId:this.state.requestId,
            bookNme:bookName,
            bookStatus:"received"
        })
    }
    addRequest = async (bookName, reasonToRequest) => {
        var requestId = this.createUniqueId()
        db.collection("requestedBooks").add({
            userId: this.state.userId,
            bookName: bookName,
            reasonToRequest: reasonToRequest,
            requestId: requestId,
            bookStatus: "requested",
            data: firebase.firestore.FieldValue.serverTimestamp()
        })
        await this.getBookRequest()
        db.collection("users").where("emailId", "==", this.state.userId).get().then().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    db.collection("users").doc(doc.id).update({ isBookRequestActive: true })
                })
            }
        )
        this.setState({
            bookName: "",
            reasonToRequest: ""
        })
        return Alert.alert("Request made")
    }
    sendNotification=()=>{
        db.collection("users").where("emailId", "==", this.state.userId).get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    var name=doc.data().firstName
                    var lastName=doc.data().lastName
                    db.collection("notifications")
                    .where("requestId","==",this.state.requestId).get.then(
                        snapshot=>{
                            snapshot.forEach(doc => {
                                db.collection("notifications").add({
                                    targetedUserId:doc.data().donorId,
                                    message:name+" recieved the book"+ doc.data().bookName,
                                    notificationStatus:"unread",
                                    bookName:bookName
                                    
                                })
                            })
                        }
                    )
                })
            }
        )
    }
    render() {
        if (this.state.isBookRequestActive === true) {
            return (
                <View>
                    <Text>
                        {
                            this.state.requestedBookName
                        }
                    </Text>
                    <Text>
                        {
                            this.state.bookStatus
                        }
                    </Text>
                    <TouchableOpacity onPress={()=>{
                        this.sendNotification()
                        this.updateBookRequestStatus()
                        this.recievedBooks(this.state.requestedBookName)
                        
                    }}>
                        <Text>Book Recieved</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <MyHeader title="Request Books" navigation={this.props.navigation} />
                    <View style={styles.container}>

                        <Text style={styles.text}>Request Books from others</Text>
                        <KeyboardAvoidingView>
                            <TextInput placeholder="Book name" style={styles.inputBox} value={this.state.bookName} onChangeText={(text) => {
                                this.setState({ bookName: text })
                            }} />

                            <TextInput placeholder="Reason to request" style={[styles.inputBox]} value={this.state.reasonToRequest} onChangeText={(text) => {
                                this.setState({ reasonToRequest: text })
                            }} multiline />

                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.addRequest(this.state.bookName, this.state.reasonToRequest);
                            }}>
                                <Text style={styles.text}>Request Book</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create(
    {
        container: {

            justifyContent: "center",

        },
        text: {
            fontSize: 20,
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: 20,


        },
        inputBox: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            alignSelf: "center",
            borderWidth: 1,
            width: "80%",
            fontSize: 20,
            textAlign: "center",
            padding: 10,
        },
        button: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            padding: 10,
            borderWidth: 1,
            width: "50%",
            height: 100,
            alignSelf: "center",
        }

    }
)