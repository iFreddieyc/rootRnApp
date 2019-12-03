/**
 * This is the placeholder for the profile screen
 * @author Mufan Lei, Andy Duong
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import db from "../../base";
import * as firebase from "firebase";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        let id = db.auth().currentUser.uid;
        console.log(id);
        let docRef = db.firestore().collection('users').where("userId", "==", id);
        this.ref = docRef
        this.state = {
            username: "",
            email: "",
            filePath: '',
        }
    }

    componentDidMount() {
        this.getImageFromFirebase();
        this.ref.onSnapshot(this.reloadProfile);
    }

    getImageFromFirebase = async () => {
        let storageRef = firebase.storage().ref('images/' + db.auth().currentUser.uid);
        const imageurl = await storageRef.getDownloadURL();
        console.log("url: " + imageurl);
        this.setState({filePath: imageurl});
    }

    reloadProfile = (querySnapshot) => {
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        this.setState({
            username: data.username,
            email: data.email,
        });
        this.getImageFromFirebase();
    }

    handleFriends = () => {
        this.props.navigation.navigate('Friends')
    }

    handleFriendRequests = () => {
        this.props.navigation.navigate('FriendRequests')
    }

    handleSignOut = () => {
        db.auth().signOut().then(
            () => this.props.navigation.navigate('Auth')
        )
    };

    handleSetNotif = () => {
        this.props.navigation.navigate('Notif');
    }

    handleReload = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.filePath}} style={styles.image}/>
                <Text style={styles.username}>{this.state.username}</Text>
                <Text style={styles.info}>{this.state.email}</Text>
                <View style={{position: 'absolute', right:'11%', top: '21%',}}>
                <Button
                    title={"Edit Profile"}
                    onPress={() => this.props.navigation.navigate("EditProfile")}
                />
                </View>

                <View style={{position: 'absolute', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '30%', backgroundColor: '#E0EBCB', width: 300, height: 80,
                    borderRadius: 10}}>
                <Button
                    title="Add Friends"
                    onPress={this.handleFriends}
                />
                </View>

                <View style={{position: 'absolute', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '42%', backgroundColor: '#E0EBCB', width: 300, height: 80,
                    borderRadius: 10}}>
                <Button
                    title="My Friends"
                    onPress={() => this.props.navigation.navigate("Friend", {props: this.props.navigation})}
                />
                </View>

                <View style={{position: 'absolute', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '54%', backgroundColor: '#E0EBCB', width: 300, height: 80,
                    borderRadius: 10}}>
                <Button
                    title="Friend Requests"
                    onPress={this.handleFriendRequests}
                />
                </View>

                <View style={{position: 'absolute', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '66%', backgroundColor: '#E0EBCB', width: 300, height: 80,
                    borderRadius: 10}}>
                <Button
                    title={"Set Notification"}
                    onPress={this.handleSetNotif}
                />
                </View>
                <View style={{backgroundColor: '#E0EBCB', position: 'absolute', right:'5%', bottom: '3%', borderRadius: 10}}>
                <Button
                    title="Sign out"
                    color='black'
                    backgroundColor='white'
                    onPress={this.handleSignOut}
                />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius:20,
        position: 'absolute',
        top: '5%',
        right: '8%',
    },
    username:{
        fontFamily: 'Copperplate-Bold',
        fontWeight: 'bold',
        color: '#D98888',
        fontSize: 45,
        position: 'absolute',
        top: '8%',
        left: '8%',

    },
    info: {
        fontFamily: 'Cochin',
        fontSize: 25,
        margin: 10,
        position: 'absolute',
        top: '13%',
        left: '8%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
});
