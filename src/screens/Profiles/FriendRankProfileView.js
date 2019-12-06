/**
 * @author Vincent Nguyen
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, TouchableHighlight, Image, Button} from 'react-native';
import db from "../../base";
import * as firebase from "firebase";

export default class FriendsRankProfile extends Component {

    constructor(props) {
        super(props);
        this.uid = JSON.stringify(this.props.navigation.getParam('text'));
        this.uid = this.uid.substring(1, this.uid.length-1);
        this.userDocumentRef = db.firestore().collection("users").where("userId", "==", this.uid);
        console.log(this.uid);
        this.state = {
             habits: [],
             username: '',
             filePath: '',
        };
    }

    componentDidMount() {
       this.getImageFromFirebase();
       this.userDocumentRef.onSnapshot(this.onUserDocumentUpdate);
    }

    getImageFromFirebase = async () => {
        let storageRef = firebase.storage().ref('images/' + this.uid);
        storageRef.getDownloadURL().then((url) =>{
            this.setState({filePath: url});
        }).catch((error) => {
            this.setState({filePath: 'https://firebasestorage.googleapis.com/v0/b/rootappcse110ntl.appspot.com/o/images%2Fdefault-profile.jpg?alt=media&token=e284258e-bb13-4a9b-88ea-d4bf1ccede3e'});
        });
    }

    onUserDocumentUpdate = (querySnapshot) => {
        let data = null;
        querySnapshot.forEach(function (doc){
            data = doc.data();
        });
        this.setState({
            email: data.email,
            username: data.username
        });
        this.getImageFromFirebase();
    }

    handleViewHabit = () => {
        this.props.navigation.navigate('FriendHabits', {text: this.uid});
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.filePath}} style={styles.image}/>
                    <Text style={styles.username}>{this.state.username}</Text>
                    <Text style={styles.info}>{this.state.email}</Text>
                <View style={{
                    position: 'absolute', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '35%', backgroundColor: '#E0EBCB', width: 300, height: 80,
                    borderRadius: 10
                }}>
                    <Button
                        title={this.state.username +"'s Habits"}
                        onPress={this.handleViewHabit}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '28%',
        height: '15%',
        borderRadius:20,
        position: 'absolute',
        top: '5%',
        right: '36%',
    },
   username:{
       fontFamily: 'Copperplate-Bold',
       fontWeight: 'bold',
       color: '#D98888',
       fontSize: 45,
       position: 'absolute',
       top: '21%',
       alignItems: 'center',
       justifyContent: 'center'
   },
   info: {
       fontFamily: 'Cochin',
       fontSize: 25,
       margin: 10,
       position: 'absolute',
       top: ' 25%',
       alignItems: 'center',
       justifyContent: 'center'
   },
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#D4DBAD'
   },
});