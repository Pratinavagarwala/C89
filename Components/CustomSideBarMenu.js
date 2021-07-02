import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {RFValue} from "react-native-responsive-fontsize";
export default class CustomSideBarMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            image: "#",
            userId: firebase.auth().currentUser.email,
            name: "",
            docId: ""
        }
    }
    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 4],
            quality: 1,

        })
        if (!cancelled) {
            this.uploadImage(uri, this.state.userId)
        }
    }
    uploadImage = async (uri, imageName) => {
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user_profiles/" + imageName)
        return ref.put(blob).then(response => {
            this.fetchImage(imageName)
        })
    }

    fetchImage = (imageName) => {

        var storageRef = firebase.storage().ref().child("user_profiles/" + imageName)
        storageRef.getDownloadURL().then(url => {
            this.setState({
                image: url
            })
        })
            .catch((error) => {
                this.setState({
                    image: "#"
                })
            })
    }
    componentDidMount() {
        this.fetchImage(this.state.userId)
    }

    render() {
        return (
            <View style={styles.container}>
                <Avatar size="xlarge" showEditButton source={{ uri: this.state.image }} 
                containerStyle={{ alignSelf: "center", marginBottom: 10, borderWidth:7,borderColor:"gold" }}
                 onPress={
                    () => {
                        this.selectPicture()
                    }
                } />
                <View>
                    <DrawerItems {...this.props} />
                </View>
                <View >
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate("WelcomeScreen")
                        firebase.auth().signOut()
                    }}>
                        <Text style={styles.text}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {

            marginTop: RFValue(70),

        },
        text: {
            fontSize: RFValue(20),
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: RFValue(20),
            marginBottom: RFValue(20)

        },
        button: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: RFValue(10),
            padding: RFValue(10),
            borderWidth: RFValue(1),
            
            
            alignSelf: "center",
        }

    }
)