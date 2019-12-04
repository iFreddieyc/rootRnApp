/**
 * Generic friend view used in FlatLists
 * @author Andy Duong
 * @since  11.23.2019
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, TouchableHighlight, TouchableOpacity} from 'react-native';

export default class FriendView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.type) {
            case "incomingRequest":
                // This class is responsible for calling the provided handlers with the friend's userid. However, we
                //  don't want to call the function every time it is bound to the onPress attribute, so we create an
                //  anonymous function to wrap the function.
                return (
                    <View style={styles.container}>
                        <Text style={styles.container}>{this.props.friendUserid}</Text>
                        <Button title={"Accept"} onPress={() => {this.props.handleAccept(this.props.friendUserid)}}/>
                        <Button title={"Decline"} onPress={() => {this.props.handleDecline(this.props.friendUserid)}}/>
                    </View>
                );
            case "outgoingRequest":
                return (
                    <View style={styles.container}>
                        <Text style={styles.authorName}>{this.props.friendUserid}</Text>
                        <Button title={"Cancel"} onPress={() => {this.props.handleCancel(this.props.friendUserid)}}/>
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

