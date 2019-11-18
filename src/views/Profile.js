/**
 * This is the placeholder for the profile screen
 * @author Mufan Lei
 * @since 11.8.2019
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import db from "../base";

export default class Profile extends Component {
    handleSignOut = () =>{
        db.auth().signOut().then(
            () => this.props.navigation.navigate('Auth')
        )
    }

    render(){
        var usersRef = db.firestore().collection('users');
        var userRef = usersRef.where('userId', '==', db.auth().currentUser.uid);
        var userName;
        var email;
        var phoneNumber;
        var picUrl;
        var url = "gs://rootappcse110ntl.appspot.com" + picUrl;
        userRef.get().then(function(doc) {
          userName = doc.data().userName;
          email = doc.data().email;
          phoneNumber = doc.data().phoneNumber;
          picUrl = doc.data().userPicUrl;
        })
        
	return (
	    <View style={styles.container}>
                <Image source={url}/>
                <Text>Profile</Text>
                <Text>Username</Text>
                <Text>Email</Text>
                <Text>Phone Number</Text>
                <Button
                    title="Click me to sign out"
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
