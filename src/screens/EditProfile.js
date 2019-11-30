/**
 * This is the Profile screen class file.
<<<<<<< HEAD
 * @author Mufan Lei TODO
 * @since 11.8.2019
 */
import React, { Component } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Text, Alert } from 'react-native';
import db from "../base";
import * as firebase from 'firebase/app';
=======
 * @author Mufan Lei, Yining Chen, Yiyun Zhang
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Text, Alert, Image} from 'react-native';
import db from "../base";
import * as firebase from 'firebase/app';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

>>>>>>> master

export default class EditProfile extends Component {

    /**
     * Constructor for class SignUp
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = {name: '', phoneNum:-1};
        //fileButton.addEventListener('change', function(e) {})
=======
        this.state = {name: '', password: '', filePath: ''};

>>>>>>> master
    }

    /**
     * Handles text input
     * @param key the state to be changed
     * @param val the value to set the state with
     */
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

<<<<<<< HEAD
    saveProfile() {
      const {name, phoneNum} = this.state;
      var usersRef = db.firestore().collection('users');
      var userRef = usersRef.where('userid', '==', db.auth().currentUser.uid);
      userRef.update({name:name,phoneNum:phoneNum});
=======
    onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.uploadImage(result.uri, db.auth().currentUser.uid)
                .then(() => {
                    this.setState({filePath: result.uri});
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert("error" + error);
                });
        }
    }
    
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        let ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }

    /**
     * Function to get photo access permission from device
     * @returns {Promise<void>}
     */
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
        this.getImageFromFirebase();
    }

    getImageFromFirebase = async () => {
        let storageRef = firebase.storage().ref('images/' + db.auth().currentUser.uid);
        const imageurl = await storageRef.getDownloadURL();
        console.log("url: " + imageurl);
        this.setState({filePath: imageurl});
    }


    saveProfile = () => {
        const {name, password, filePath} = this.state;
        let userRef = db.firestore().collection('users').doc(db.auth().currentUser.uid);
        userRef.update({
            userName: name
        });
        this.props.navigation.navigate('Profile');
>>>>>>> master
    }

    render() {
        return (
            <View style={styles.container}>
<<<<<<< HEAD
                <Text>Name:</Text>
                <TextInput style={styles.input}
                           placeholder="Name"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('name', val)}
                />
                <Text>Password:</Text>
                <TextInput style={styles.input}
                           placeholder="phoneNum"
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('phoneNum', val)}
                />
                <Button
                    title={"Save Change"}
                    onPress={this.saveProfile}
                />
                <Button
                    title={"Upload Picture"}
                    onchange={(e) => {
                        var file = e.target.files[0];
                        var filePath = 'pics/'+file.name;
                        var storageRef = firebase.storage().ref(filePath);
                        var task = storageRef.put(file);
                        var usersRef = db.firestore().collection('users');
                        var userRef = usersRef.where('userid', '==', db.auth().currentUser.uid);
                        userRef.update({userPicUrl:filePath});
                    }}
                />
            </View>
        );
    }
  
=======
                <View style={styles.picture}>
                <Image source={{uri: this.state.filePath}} style={{width: 100, height: 100, borderRadius:20}}/>
                <Button
                    title={"Upload Picture"}
                    onPress={(e) => {
                        this.onChooseImagePress();
                    }}
                />
                </View>
                <View style={styles.name}>
                <TextInput style={styles.input}
                           placeholder="What's Your New Name?"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('name', val)}
                />
                <Button
                    title={"Save New Name"}
                    onPress={this.saveProfile}

                />
                </View>
                <View style={styles.password}>
                <TextInput style={styles.input}
                           placeholder="What's Your New Password?"
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title={"Save New Password"}
                    onPress={(e) => {
                        const {name, password, filePath} = this.state;
                        console.log(password);
                        firebase.auth().currentUser.updatePassword(password);
                        this.props.navigation.navigate('Profile');
                    }}
                />
                </View>
            </View>
        );
    }

>>>>>>> master
}

// UI Design TODO
const styles = StyleSheet.create({
<<<<<<< HEAD
    input: {
        width: 350,
        height: 55
=======
    picture: {
        position: 'absolute',
        top: '10%',
        alignItems: 'center',
    },
    name: {
        position: 'absolute',
        top: '35%',
        alignItems: 'center',
    },
    password: {
        position: 'absolute',
        top: '50%',
        alignItems: 'center',
    },
    input: {
        width: 288,
        height: 37,
        backgroundColor: '#E0EBCB',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 20,
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        margin: 10,
>>>>>>> master
    },
    container: {
        flex: 1,
        justifyContent: 'center',
<<<<<<< HEAD
        alignItems: 'center'
    }
});
=======
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    }
});
>>>>>>> master
