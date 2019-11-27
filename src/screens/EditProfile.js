/**
 * This is the Profile screen class file.
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


    /*handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ filePath: response });
            }
        });
    };*/

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
        var ref = firebase.storage().ref().child("images/" + imageName);
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
        var storageRef = firebase.storage().ref('images/' + db.auth().currentUser.uid);
        const imageurl = await storageRef.getDownloadURL();
        console.log("url: " + imageurl);
        this.setState({filePath: imageurl});
    }


    saveProfile = () => {
        const {name, password, filePath} = this.state;
        var userRef = db.firestore().collection('users').doc(db.auth().currentUser.uid);
        userRef.update({
            userName: name
        });
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.filePath}} style={{width: 200, height: 200}}/>
                <Text>Name:</Text>
                <TextInput style={styles.input}
                           placeholder="Name"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('name', val)}
                />
                <Button
                    title={"Save Change"}
                    onPress={this.saveProfile}

                />
                <Button
                    title={"Upload Picture"}
                    onPress={(e) => {
                        this.onChooseImagePress;
                    }}
                />
                <TextInput style={styles.input}
                           placeholder="New Password"
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
        );
    }

}

// UI Design TODO
const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});