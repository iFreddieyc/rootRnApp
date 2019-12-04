/**
 * @author Vincent Nguyen
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, TouchableHighlight} from 'react-native';
import db from "../../base";

export default class FriendsProfile extends Component {

    constructor(props) {
        super(props);
        this.uid = JSON.stringify(this.props.navigation.getParam('text'));
        this.uid = this.uid.substring(1, this.uid.length-1);
        this.userDocumentRef = db.firestore().collection("users").where("userId", "==", this.uid);
        console.log(this.uid);
        this.state = {
             habits: [],
             username: '',
             email: '',
             picurl: '',
        };
    }

    componentDidMount() {
       this.userDocumentRef.onSnapshot(this.onUserDocumentUpdate);
    }

    onUserDocumentUpdate = (querySnapshot) => {
        let data = null;
        querySnapshot.forEach(function (doc){
            data = doc.data();
        });
        this.setState({
            email: data.email
        });
        if(data.username != null){
            this.setState({
                username: data.username
            });
        }
        if(data.picurl != null) {
            this.setState({
                picurl: data.userPicUrl,
            });
        }
    }

    handleViewHabit = () => {
        this.props.navigation.navigate('FriendHabit', {text: this.uid});
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View>
              <Text style={styles.info}>{this.state.username}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
            </View>
            <TouchableHighlight style={styles.habitContainer}
                onPress={this.handleViewHabit}
            >
                <View>
                    <Text style={styles.habitAccess}>{this.state.username + "'s Habits"}</Text>
                    <Text style={styles.habitPress}>
                        {"Press to see Habit"}
                     </Text>
                </View>

            </TouchableHighlight>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    info:{
        fontFamily: 'Cochin',
        fontSize: 25,
        margin: 10
   },
   habitContainer: {
        width: 350,
        height: 80,
        borderRadius: 6,
        borderWidth: 0.6,
        alignItems: 'center',
        borderColor: '#d6d7da',
        backgroundColor: '#E0EBCB'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
   },
   habitPress: {
        fontSize: 15,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        left: 70,
        right: 100,
   },
   habitAccess: {
        fontSize: 30,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        left: 10,
        right: 10,
    }
});