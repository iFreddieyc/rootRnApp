import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    Modal,
    TouchableHighlight,
    TouchableOpacity, Image
} from 'react-native';
import db from "../base";
import * as firebase from 'firebase/app';
import * as EditProfile from "./EditProfile";

let userName;
export default class ImageWrapper extends Component {
    constructor(props) {
        super(props)
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
    }

    getImageFromFirebase = async () => {
        let storageRef = firebase.storage().ref('images/' + this.props.id);
        const imageurl = await storageRef.getDownloadURL();
        console.log("url: " + imageurl);
        this.setState({filePath: imageurl});
    }

    render() {
        return (
            <View>
                <Text style={styles.authorName}>
                    {this.state.userName}
                </Text>
                <TouchableHighlight>
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
        left: '6%',
        top: '10%'
    },
    image:{
        position: 'relative',
        width: 32,
        height: 32,
        left: '85%',
        top: '40%'
    }
});