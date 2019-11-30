/*
 * Screen to allow the user to send a friend request to another user.
 * @author Andy Duong
 * @since  11.23.2019
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, TextInput, Button, Alert} from 'react-native';
import db from "../base";

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
        let doesUserExist = false;
        let friendDocumentRef;

        // Performs the user query and atomically add a new userid to the other user's "incoming" array field
        // TODO: Rename fields
        const usernameQueryRef = db.firestore().collection("users").where("username", "==", this.state.usernameQuery)
            .get()
            .then((querySnapshot) => {
                doesUserExist = true;
                friendDocumentRef = querySnapshot[0];
                friendDocumentRef.update({
                    incoming: firebase.firestore.FieldValue.arrayUnion(db.auth().currentUser.uid),
                });
                console.info("Username query returned " + querySnapshot.size + " results.");
                console.verbose("Username query results: " + querySnapshot);
            })
            .catch(() => {
                alert("Username not found. Please try again.");
                console.warn("Username query did not yield any results.");
            });

        // Atomically add a new userid to the current user's "outgoing" array field
        if (doesUserExist) {
            this.userDocumentRef.update({
                outgoing: firebase.firestore.FieldValue.arrayUnion(friendDocumentRef.id),
            });
        }
    }

    /**
     * Renders the add friends view
     */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput onChangeText={this.handleChangeText} placeholder="Please enter a username."/>
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
