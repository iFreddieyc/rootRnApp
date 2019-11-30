/*
 * Screen to display a user's friends list.
 * @author Vincent Nguyen, Andy Duong
 * @since  11.23.2019
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Button, Text} from 'react-native';
import db from "../base";
import AddFriend from "./AddFriend";

export default class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: []
        };

        // Set the Firebase db path for the current user
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
        const friends = (documentSnapshot.get("friends") == null) ? [] : documentSnapshot.get("friends");
        this.setState({friends: friends,});
    }

    /**
     * Renders the friends list screen
     */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Friends:</Text>
                <AddFriend/>
                <Text>{this.state.friends}</Text>
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
