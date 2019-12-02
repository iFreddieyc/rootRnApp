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

                // querySnapshot contains an array of QueryDocumentSnapshot objects, representing the query results
                querySnapshot.forEach((doc) => {
                    friendDocumentRef = doc.ref;
                    friendDocumentRef.update({
                        incoming: firebase.firestore.FieldValue.arrayUnion(db.auth().currentUser.uid),
                    });
                });
                console.info("Username query returned " + querySnapshot.size + " results.");

                // Atomically add a new userid to the current user's "outgoing" array field
                this.userDocumentRef.update({
                    outgoing: firebase.firestore.FieldValue.arrayUnion(friendDocumentRef.id),
                });

                console.log("Friend request sent.");
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
                <TextInput
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
        width: '100%',
        height: '100%',
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
