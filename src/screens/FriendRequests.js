/**
 * Screen to display a user's pending friend requests.
 * @author Vincent Nguyen, Andy Duong
 * @since  11.23.2019
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, TextInput, Button, Text, Alert, Picker, Switch, ActivityIndicator, FlatList} from 'react-native';
// TODO: Figure out a way to optimize the import statement for FieldValue#arrayUnion and #arrayRemove.
import * as firebase from 'firebase/app';
import db from "../base";
import FriendView from "../views/FriendView";

export default class FriendRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incoming: [],
            outgoing: [],
        };

        // TODO: Figure out if there is a way for us to only need to query the userid once.
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
        // Atomically move the friend's (sender) userid from the current user's (receiver) "incoming" array field to the
        //  current user's (receiver) "friends" array field
        // Source: https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array
        this.userDocumentRef.update({
            incoming: firebase.firestore.FieldValue.arrayRemove(friendUserid),
            friends: firebase.firestore.FieldValue.arrayUnion(friendUserid),
        })

        // Performs the user query and atomically move the current user's (receiver) userid from the friend's (sender)
        //  "outgoing" array field to the friend's (sender) "friends" array field
        const friendDocumentRef = db.firestore().collection("users").doc(friendUserid);
        friendDocumentRef.update({
            outgoing: firebase.firestore.FieldValue.arrayRemove(db.auth().currentUser.uid),
            friends: firebase.firestore.FieldValue.arrayUnion(db.auth().currentUser.uid),
        })
    }

    handleDecline = (friendUserid) => {
        // Atomically remove the friend's (sender) userid from the current user's (receiver) "incoming" array field
        this.userDocumentRef.update({
            incoming: firebase.firestore.FieldValue.arrayRemove(friendUserid),
        })

        // Performs the user query and atomically remove the current user's (receiver) userid from the friend's (sender)
        //  "outgoing" array field
        const friendDocumentRef = db.firestore().collection("users").doc(friendUserid);
        friendDocumentRef.update({
            outgoing: firebase.firestore.FieldValue.arrayRemove(db.auth().currentUser.uid),
        })
    }

    /* Outgoing Friend Requests */

    handleRemind = () => {
        // TODO: Send a push notification. Disable Remind button for 24 hours.
    }

    handleCancel = (friendUserid) => {
        // Atomically remove the friend's (receiver) userid from the current user's (sender) "outgoing" array field
        this.userDocumentRef.update({
            outgoing: firebase.firestore.FieldValue.arrayRemove(friendUserid),
        })

        // Performs the user query and atomically remove the current user's (sender) userid from the friend's (receiver)
        //  "incoming" array field
        const friendDocumentRef = db.firestore().collection("users").doc(friendUserid);
        friendDocumentRef.update({
            incoming: firebase.firestore.FieldValue.arrayRemove(db.auth().currentUser.uid),
        })
    }

    render() {
        // TODO: Figure out keyExtractor attribute.
        return (
            <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
                <FlatList
                    data={this.state.incoming}
                    renderItem={({item}) =>
                        <FriendView
                            friendUserid={item}
                            type="incomingRequest"
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
                            type="outgoingRequest"
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
