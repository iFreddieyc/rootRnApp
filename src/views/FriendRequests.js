/**
 * Screen to display a user's pending friend requests.
 * @author Vincent Nguyen, Andy Duong
 * @since  11.23.2019
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, TextInput, Button, Text, Alert, Picker, Switch, ActivityIndicator, FlatList} from 'react-native';
import db from "../base";
import FriendView from "./FriendView";

// TODO: Figure out TODO statements for firebase FieldValue lines
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export default class FriendRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incoming: [],
            outgoing: [],
        };

        this.userDocumentRef = db.firestore().collection("users").doc(db.auth().currentUser.uid);
    }

    componentDidMount() {
        // Attaches a listener for the current user's document changes
        // Source: https://invertase.io/oss/react-native-firebase/v6/firestore/reference/documentreference#onSnapshot
        this.unsubscribe = this.userDocumentRef.onSnapshot({
            error: (e) => console.error(e),
            next: this.onUserDocumentUpdate,
        });
    }

    componentWillUnmount() {
        // Cancel all subscriptions to prevent memory leaks
        this.unsubscribe();
    }

    /**
     * Updates the friends list screen as friends are added or removed from the database
     */
    onUserDocumentUpdate = (documentSnapshot) => {
        const incoming = (documentSnapshot.get("incoming") == null) ? [] : documentSnapshot.get("incoming");
        const outgoing = (documentSnapshot.get("outgoing") == null) ? [] : documentSnapshot.get("outgoing");
        this.setState({
            incoming: incoming,
            outgoing: outgoing,
        });
    }

    /* Incoming Friend Requests */

    handleAccept = (friendUserid) => {
        // Atomically move the sender's userid from the current user's "incoming" array field to the current user's
        //  "friends" array field
        // Source: https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array
        this.userDocumentRef.update({
            incoming: firebase.firestore.FieldValue.arrayRemove(friendUserid),
            friends: firebase.firestore.FieldValue.arrayUnion(friendUserid),
        })

        // Performs the user query and atomically move the current user's (receiver) userid from the sender's "outgoing"
        //  array field to the sender's "friends" array field
        // Source: https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array
        const friendDocumentRef = db.firestore().collection("users").doc(friendUserid);
        friendDocumentRef.update({
            outgoing: firebase.firestore.FieldValue.arrayRemove(db.auth().currentUser.uid),
            friends: firebase.firestore.FieldValue.arrayUnion(db.auth().currentUser.uid),
        })
    }

    handleDecline = (friendUserid) => {
        // Atomically remove the sender's userid from the current user's "incoming" array field
        // Source: https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array
        this.userDocumentRef.update({
            incoming: firebase.firestore.FieldValue.arrayRemove(friendUserid),
        })

        // Performs the user query and atomically remove the current user's (receiver) userid from the sender's
        //  "outgoing" array field
        // Source: https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array
        const friendDocumentRef = db.firestore().collection("users").doc(friendUserid);
        friendDocumentRef.update({
            outgoing: firebase.firestore.FieldValue.arrayRemove(db.auth().currentUser.uid),
        })
    }

    /* TODO: Outgoing Friend Requests */

    handleRemind = () => {}
    handleCancel = () => {}

    render() {
        return (
            <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
                <FlatList
                    data={this.state.incoming}
                    renderItem={({item}) =>
                        <FriendView
                            friendUserid={item}
                            type="incoming"
                            handleAccept={this.handleAccept}
                            handleDecline={this.handleDecline}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <FlatList
                    data={this.state.outgoing}
                    renderItem={({item}) =>
                        <FriendView
                            friendUserid={item}
                            type="outgoing"
                            handleRemind={this.handleRemind}
                            handleCancel={this.handleCancel}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }

}

// UI Design TODO
const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 30,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:2,
        borderBottomColor: 'black'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    littleContainer:{
        height:'50%',
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0EBCB'
    }
});
