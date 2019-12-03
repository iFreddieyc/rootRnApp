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
            picurl: data.userPicUrl,
        });
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

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.filePath}} style={{width: 100, height: 100, borderRadius: 20}}/>
                <Text style={styles.info}>{this.state.username}</Text>
                <Text style={styles.info}>{this.state.email}</Text>
                <Button
                    title={"Edit Profile"}
                    onPress={() => this.props.navigation.navigate("EditProfile")}
                />
                <Button
                    title="Add Friends"
                    onPress={this.handleFriends}
                />
                <Button
                    title="My Friends"
                    onPress={() => this.props.navigation.navigate("Friend", {props: this.props.navigation})}
                />
                <Button
                    title="Friend Requests"
                    onPress={this.handleFriendRequests}
                />

                <Button
                    title={"Set notification"}
                    onPress={this.handleSetNotif}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../../auth/my-icon.png')}
                />
                <Button
                    title="Sign out"
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    info: {
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
