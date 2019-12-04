/**
 * Screen to allow the user to send a friend request to another user.
 * @author Andy Duong
 * @since  11.23.2019
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, TextInput, Button, Alert} from 'react-native';
import db from "../../base";
// TODO: Figure out a way to optimize the import statement for FieldValue#arrayUnion and #arrayRemove.
import * as firebase from 'firebase/app';

export default class AddFriend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameQuery: []
        };

        // Set the Cloud Firestore path for the current user
        this.userDocumentRef = db.firestore().collection("users").doc(db.auth().currentUser.uid);
    }

    /**
     * Updates the state with the username query so that it can be used to query Cloud Firestore
     */
    handleChangeText = (text) => {
        this.setState({usernameQuery: text,});
    }

    /**
     * Performs the Cloud Firestore query to record the friend request
     */
    handleAddFriend = () => {
        // Performs the user query and atomically add a new userid to the other user's "incoming" array field
        console.log("query: " + this.state.usernameQuery)
        const usernameQueryRef = db.firestore().collection('users').where("username", "==", this.state.usernameQuery)
            .get()
            .then((querySnapshot) => {
                let friendDocumentRef;
                let friendDocumentData;

                // querySnapshot contains an array of QueryDocumentSnapshot objects, representing the query results
                querySnapshot.forEach((doc) => {
                    friendDocumentRef = doc.ref;
                    friendDocumentData = doc.data();
                });
                console.info("Username query returned " + querySnapshot.size + " results.");

                // Only populate friend request lists if you aren't already friends
                this.userDocumentRef.get().then((docSnapshot) => {
                    let userDocumentData = docSnapshot.data();
                    console.log("Friends: " + userDocumentData.friends);
                    // User and friend are already friends
                    if (userDocumentData.friends.includes(friendDocumentRef.id)) {
                        alert("You're already friends!");
                        console.log("User is already a friend. Add friend request canceled.");
                    // Friend already sent User a friend request
                    } else if (userDocumentData.incoming.includes(friendDocumentRef.id)) {
                        alert("This user already sent you a friend request! Please navigate to the Friend Requests page to accept it.");
                        console.log("Username already present in incoming friend request list.");
                    // User already sent a friend request to Friend
                    } else if (userDocumentData.outgoing.includes(friendDocumentRef.id)) {
                        alert("You already sent this user a friend request.");
                        console.log("Username already present in outgoing friend request list.");
                    // Send the friend request
                    } else {
                        // Atomically add a new userid to the friend's "incoming" array field
                        friendDocumentRef.update({
                            incoming: firebase.firestore.FieldValue.arrayUnion(db.auth().currentUser.uid),
                        });

                        // Atomically add a new userid to the current user's "outgoing" array field
                        this.userDocumentRef.update({
                            outgoing: firebase.firestore.FieldValue.arrayUnion(friendDocumentRef.id),
                        });

                        alert("Friend request sent.");
                        console.log("Friend request sent.");
                    }
                })
            })
            .catch((e) => {
                alert("Username not found. Please try again.");
                console.warn("Username query did not yield any results: " + e);
            });
    }

    /**
     * Renders the add friends view
     */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput style={styles.input}
                    onChangeText={this.handleChangeText}
                    placeholder="Please enter a username."
                    autoCorrect={false}
                    autoCapitalize={"none"}
                />
                <Button title={"Add Friend"} onPress={this.handleAddFriend}/>
            </SafeAreaView>
        );
    }
}

// UI Design TODO
const styles = StyleSheet.create({
    input: {
        width: '70%',
        height: '6%',
        borderRadius: 10,
        position: 'absolute',
        top: '40%',
        fontSize: 21,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0EBCB'
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
