import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import db from "../base";
import * as firebase from 'firebase/app';

export default class ImageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            filePath:"https://firebasestorage.googleapis.com/v0/b/rootappcse110ntl.appspot.com/o/images%2Fdefault-profile.jpg?alt=media&token=e284258e-bb13-4a9b-88ea-d4bf1ccede3e"
        };
        this.userDocumentRef = db.firestore().collection("users").doc(this.props.id);
    }

    componentDidMount() {
        this.getImageFromFirebase();
        this.unsubscribe = this.userDocumentRef.onSnapshot({
            error: (e) => console.error(e),
            next: this.onUserDocumentUpdate,
        });
    }

    onUserDocumentUpdate = (documentSnapshot) => {
        const userName = (documentSnapshot.get("username") == null) ? [] : documentSnapshot.get("username");
        this.setState({userName: userName});
        this.getImageFromFirebase();
    }

    getImageFromFirebase = async () => {
        let storageRef = firebase.storage().ref('images/' + this.props.id);
        storageRef.getDownloadURL().then((url) =>{
            this.setState({filePath: url});
        }).catch((error) => {
            this.setState({filePath: 'https://firebasestorage.googleapis.com/v0/b/rootappcse110ntl.appspot.com/o/images%2Fdefault-profile.jpg?alt=media&token=e284258e-bb13-4a9b-88ea-d4bf1ccede3e'});
        });
    }
    toProfile = () => {
        this.props.navigation.navigate('FriendViews', {text: this.props.id});
    }

    render() {
        return (
            <View>
                <Text style={styles.authorName}>
                    {this.state.userName}
                </Text>
                <TouchableHighlight onPress={this.toProfile}
                                    underlayColor={'#E7ABAB'}>
                    <Image
                        source={{uri: this.state.filePath}}
                        style={styles.image}/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    authorName: {
        position:"absolute",
        fontSize: 17,
        color: '#E7ABAB',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        left: '5%',
        top: '10%'
    },
    image:{
        position: 'relative',
        width: 50,
        height: 50,
        left: '80%',
        top: '20%',
        borderRadius: 10
    }
});