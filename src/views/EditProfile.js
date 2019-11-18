/**
 * This is the Profile screen class file.
 * @author Mufan Lei TODO
 * @since 11.8.2019
 */
import React, { Component } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Text, Alert } from 'react-native';
import db from "../base";
import * as firebase from 'firebase/app';

export default class EditProfile extends Component {

    /**
     * Constructor for class SignUp
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {name: '', phoneNum:-1};
        fileButton.addEventListener('change', function(e) {
            
        })
    }

    /**
     * Handles text input
     * @param key the state to be changed
     * @param val the value to set the state with
     */
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

    saveProfile() {
      const {name, phoneNum} = this.state;
      var usersRef = db.firestore().collection('users');
      var userRef = usersRef.where('userid', '==', db.auth().currentUser.uid);
      userRef.update({name:name,phoneNum:phoneNum});
    }
    
    


  render() {
    return (
            <View style={styles.container}>
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
                    onchange={(e)=>{
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
