/**
 * This is the placeholder for the profile screen
<<<<<<< HEAD
 * @author Mufan Lei
 * @since 11.8.2019
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import db from "../base";

export default class Profile extends Component {
    handleEditProfile = () => {
        this.props.navigation.navigate('EditProfile')
    };

    handleFriends = () => {
        this.props.navigation.navigate('Friends')
    }

    handleFriendRequests = () => {
        this.props.navigation.navigate('FriendRequests')
    }

    handleSignOut = () => {
=======
 * @author Mufan Lei TODO
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import db from "../base";

export default class Profile extends Component {
    constructor(props){
        super(props);
        let id = db.auth().currentUser.uid;
        console.log(id);
        let docRef = db.firestore().collection('users').where("userId","==",id);
        this.ref = docRef
        this.state = {
            username: "",
            email:"",
            picurl:"",
        }
    }

    componentDidMount(){
        this.ref.onSnapshot(this.reloadProfile);
    }

    reloadProfile = (querySnapshot) =>{
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        this.setState({
            username: data.username,
            email:data.email,
            picurl:data.userPicUrl,
        });
    }


    handleSignOut = () =>{
>>>>>>> master
        db.auth().signOut().then(
            () => this.props.navigation.navigate('Auth')
        )
    };

    handleSetNotif = () => {
        this.props.navigation.navigate('Notif');
    }

    render(){
<<<<<<< HEAD
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
=======
        return(
            <View style={styles.container}>
                <Image source={{uri: this.state.filePath}} style={{width: 100, height: 100, borderRadius:20}}/>
                <Text style={styles.info}>{this.state.username}</Text>
                <Text style={styles.info}>{this.state.email}</Text>
                <Button
                    title={"EditProfile"}
                    onPress={()=> this.props.navigation.navigate("EditProfile")}
                />
>>>>>>> master
                <Button
                    title="Edit Profile"
                    onPress={this.handleEditProfile}
                />
                <Button
                    title="Friends"
                    onPress={this.handleFriends}
                />
                <Button
                    title="Friend Requests"
                    onPress={this.handleFriendRequests}
                />
                <Button
                    title="Click me to sign out"
                    onPress={this.handleSignOut}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../authFlow/my-icon.png')}
                />
                <Button
                    title={"Click me set notification"}
                    onPress={this.handleSetNotif}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    info:{
        fontFamily: 'Cochin',
        fontSize: 25,
        margin: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
});
