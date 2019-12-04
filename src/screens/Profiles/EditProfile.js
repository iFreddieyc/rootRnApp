/**
 * This is the Profile screen class file.
 * @author Mufan Lei, Yining Chen, Yiyun Zhang
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Alert, Image} from 'react-native';
import db from "../../base";
import * as firebase from 'firebase/app';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Profile from "./Profile";

export default class EditProfile extends Component {

    /**
     * Constructor for class SignUp
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {name: '', password: '', filePath: ''};
    }

    /**
     * Handles text input
     * @param key the state to be changed
     * @param val the value to set the state with
     */
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

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
                    // Alert.alert("Picture Successfully changed");
                    let userRef = db.firestore().collection('users').doc(db.auth().currentUser.uid);
                    userRef.update({
                        changed: Math.random() * (100 - 0) + 0,
                    });
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
        storageRef.getDownloadURL().then((url) => {
            this.setState({filePath: url});
        }).catch((error) => {
            this.setState({filePath: 'https://firebasestorage.googleapis.com/v0/b/rootappcse110ntl.appspot.com/o/images%2Fdefault-profile.jpg?alt=media&token=e284258e-bb13-4a9b-88ea-d4bf1ccede3e'});
        });
    }

    saveProfile = () => {
        const {navigate} = this.props.navigation;
        const {name} = this.state;
        if (name.length < 5) {
            Alert.alert(
                'Alert',
                "Username is too short",
                [{
                    text: 'Ok', onPress: () => console.log('Ok is pressed')
                }],
                {cancelable: true}
            );
        } else {
            let userRef = db.firestore().collection('users').doc(db.auth().currentUser.uid);
            db.firestore().collection('users').where("username", "==", name)
                .get()
                .then(function (querySnapshot) {
                    if (querySnapshot.empty) {
                        // There is no duplicate username
                        userRef.update({
                            username: name,
                        }).then(function () {
                            console.log("Document successfully written!");
                        }).catch((error) => {
                            console.log("Something went wrong updating the document" + error);
                        });
                        // Go to profile
                        navigate('Profile');
                    } else {
                        // There is a duplicate username
                        Alert.alert(
                            'Alert',
                            "Username already exists, choose a new username",
                            [{
                                text: 'Ok', onPress: () => console.log('Ok is pressed')
                            }],
                            {cancelable: true}
                        );
                    }
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error)
                });
        }

        // this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.picture}>
                    <Image source={{uri: this.state.filePath}} style={{width: 100, height: 100, borderRadius: 20}}/>
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
                {/*<View style={styles.password}>*/}
                {/*<TextInput style={styles.input}*/}
                {/*           placeholder="What's Your New Password?"*/}
                {/*           secureTextEntry={true}*/}
                {/*           autoCapitalize={"none"}*/}
                {/*           onChangeText={val => this.onChangeText('password', val)}*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    title={"Save New Password"}*/}
                {/*    onPress={(e) => {*/}
                {/*        const {name, password, filePath} = this.state;*/}
                {/*        console.log(password);*/}
                {/*        firebase.auth().currentUser.updatePassword(password);*/}
                {/*        this.props.navigation.navigate('Profile');*/}
                {/*    }}*/}
                {/*/>*/}
                {/*</View>*/}
            </View>
        );
    }
}

// UI Design TODO
const styles = StyleSheet.create({
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    }
});