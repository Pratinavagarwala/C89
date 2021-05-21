import * as React from 'react';
import {Text,StyleSheet,View,TouchableOpacity,Dimensions,Animated} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon,ListItem} from 'react-native-elements';
import db from '../config';
export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state={allNotifications:this.props.allNotifications}
    }
    updateMarkAsRead=(notification)=>{

        db.collection("notifications").where("requestId","==",notification.requestId).where("donorId","==",notification.donorId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("notifications").doc(doc.id).update({
                    notificationStatus:"read"
                })
            })
        })
        
    }
    onSwipeValueChange=(swipeData)=>{
        var allNotifications=this.state.allNotifications
        const {key,value}=swipeData
        if(value<-Dimensions.get("window").width){
            const newData=[...allNotifications]
            this.updateMarkAsRead(allNotifications[key])
            newData.splice(key,1)
            this.setState({allNotifications:newData})
        }
    }
    renderItem=(data)=>{
        return(
            <Animated.View>
                <ListItem
                    leftElement={<Icon name="Book" type="font-awsome" />}
                    title={data.item.bookName}
                    subtitle={data.item.message}
                    titleStyle={{color:"black",fontWeight:"bold"}}
                    bottomDivider
                />
            </Animated.View>
        )

    }
    renderHiddenItem=()=>{
        return(
            <View>
                <Text >Mark as Read</Text>
            </View>
        )
    }
    render(){
        return(
            <View>
                <SwipeListView 
                    data={this.state.allNotifications}
                    disableRightSwipe
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get("window").width}
                  onSwipeValueChange={this.onSwipeValueChange}
                    keyExtractor={(item,index)=> index.toString()}
                />

            </View>
        )
    }
}