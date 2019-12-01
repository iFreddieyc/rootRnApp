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

export default class ImageWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filePath:"https://firebasestorage.googleapis.com/v0/b/rootappcse110ntl.appspot.com/o/images%2Fdefault-profile.jpg?alt=media&token=e284258e-bb13-4a9b-88ea-d4bf1ccede3e"
        };
    }

    componentDidMount() {
        this.getImageFromFirebase();
    }

    getImageFromFirebase = async () => {
        let storageRef = firebase.storage().ref('images/' + this.props.id);
        const imageurl = await storageRef.getDownloadURL();
        console.log("url: " + imageurl);
        this.setState({filePath: imageurl});
    }

    render() {
        return (
            <TouchableHighlight>
                <Image source={{uri: this.state.filePath}} style={{width: 50, height: 50, borderRadius:20}}/>
            </TouchableHighlight>
        );
    }
}