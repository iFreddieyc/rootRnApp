/**
 * Generic friend view used in FlatLists
 * @author Andy Duong
 * @since  11.23.2019
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, TouchableHighlight, TouchableOpacity} from 'react-native';

import db from "../../base";

export default class FriendView extends Component {
    constructor(props) {
        super(props);
        this.ref =
        this.userDocumentRef = db.firestore().collection("users").where("userId", "==", this.props.friendUserid);
        this.state = {
            username: ""
        }
    }

    componentDidMount() {
        this.userDocumentRef.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) =>{
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        if(data.username != null) {
            this.setState({
                username: data.username
            });
        }
        if(data.username == null) {
            this.setState({
                username: this.props.uid
            });
        }
    }

    render() {

        switch (this.props.type) {
            case "incomingRequest":
                // This class is responsible for calling the provided handlers with the friend's userid. However, we
                //  don't want to call the function every time it is bound to the onPress attribute, so we create an
                //  anonymous function to wrap the function.
                return (
                <View>
                  <Text style={styles.incoming}>
                    {"Incoming Friends"}
                  </Text>
                  <TouchableHighlight style={styles.boxContainer}>
                    <View>
                        <Text style={styles.friendName}>{this.state.username}</Text>
                        <Button title={"Accept"} onPress={() => {this.props.handleAccept(this.props.friendUserid)}}/>
                        <Button title={"Decline"} onPress={() => {this.props.handleDecline(this.props.friendUserid)}}/>
                    </View>
                  </TouchableHighlight>
                  </View>

                );
            case "outgoingRequest":
                return (
                    <View>
                        <Text styles={styles.incoming}>
                            {"Outgoing Friends"}
                        </Text>
                        <TouchableHighlight style={styles.boxContainer}>
                            <View>
                                <Text style={styles.friendName}>{this.state.username}</Text>
                                <Button title={"Cancel"} onPress={() => {this.props.handleCancel(this.props.friendUserid)}}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
            default:
                return (
                    <View style={styles.container}>
                        <Text>{this.props.friendUserid}</Text>
                    </View>
                );
        }
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
    incoming: {
        fontSize: 15,
        alignItems: 'center',
    },
    friendName: {
         fontSize: 30,
         color: 'pink',
         fontWeight: 'bold',
         alignItems: 'center',
         fontFamily: 'Cochin',
         top: '10%',
         left: 10
     },
    boxContainer: {
        width: 350,
        height: 110,
        borderRadius: 6,
        borderWidth: 0.6,
        alignItems: 'center',
        borderColor: '#d6d7da',
        backgroundColor: '#E0EBCB'
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

