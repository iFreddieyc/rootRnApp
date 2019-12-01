/**
 * @author Vincent Nguyen
 */

import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Button,
    Text,
    ActivityIndicator
} from 'react-native';

import { withNavigation } from 'react-navigation';
import db from "../../base";
import HabitViewFriend from "../Habits/HabitViewFriend";


export default class FriendHabitList extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = null;

        this.uid = JSON.stringify(this.props.navigation.getParam('text'));
        this.uid = this.uid.substring(1, this.uid.length-1);
        this.userInfo = db.firestore().collection("users").where("userId", "==", this.uid);
        this.ref = db.firestore().collection("habits").where("userid", "==", this.uid);
        this.state = {
            isLoading: true,
            habits: [],
            username: '',
            messageHabits: 'No Habits'
        };
    }

    componentDidMount() {
        this.userInfo.onSnapshot(this.onCollectionUsername)
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUsername = (querySnapshot) =>{
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        this.setState({
            username: data.username
        });
    }

    onCollectionUpdate = (querySnapshot) => {
         let habitsList = [];
         querySnapshot.forEach(function (doc){
             let data = doc.data()
             if(data.visible == true) {
                 habitsList.push(data);
             }
         });
         this.setState({
            habits: habitsList,
            isLoading: false
         });
         if(habitsList.length > 0 && this.state.username != '') {
             this.setState({
                 messageHabits:  this.state.username + "'s Habit"
             });
         }
         if(habitsList.length > 0 && this.state.username == ''){
             this.setState({
                 messageHabits: "Friend's Habit"
             });
         }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </SafeAreaView>
            )
        }
        // If loading is finished.
        return (
            <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
                <Text style={styles.title}>
                    {this.state.messageHabits}
                </Text>
                <FlatList
                    data={this.state.habits}
                    renderItem={({item}) =>
                        <HabitViewFriend
                            name={item.name}
                            date={item.startDate}
                            description={item.description}
                            id = {item.habitId}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    title: {
        fontSize: 35,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin'
    },
    habitStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold', alignItems: 'center',
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});