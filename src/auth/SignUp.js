/**
 * SignUp screen class file, to sign up a user.
 * @author Qingcheng You
 * @since 10.31.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert, Image} from 'react-native';
import db from "../base";
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class SignUp extends Component {

    /**
     * Constructor for class SignUp
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    /**
     * Handles text input
     * @param key the state to be changed
     * @param val the value to set the state with
     */
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

    /**
     * handleSignUp is called when "Sign Up" button is pressed.
     * Connect to Firebase Authentication
     */
    handleSignUp = () => {
        try {
            const {email, password} = this.state;
            // This is where to add Firebase authentication function
            db.auth().createUserWithEmailAndPassword(email, password).then(
                // User is created, go to Main
                () => {var user = firebase.auth().currentUser;
                       var userid = user.uid;
                       // TODO: There is a bug here.
                       db.collection("users").add({
                           userid: userid,
                           username: email,
                           email: email,
                           phoneNumber: -1,
                           userPicUrl: "Capture.PNG",
                           friends: ["a"],
                           incoming: ["b"],
                           outgoing: ["c"],
                       })
                       this.props.navigation.navigate('App')
                }
	    ).catch(function (error) {
                // Some error occurred, handle Errors here
                const errorCode = error.code;
                let errorMessage;
                if (errorCode == 'auth/weak-password') {
                    errorMessage = 'This password is too weak.'
                } else if (errorCode == 'auth/email-already-in-use') {
                    errorMessage = 'This email is already in use.'
                } else if (errorCode == 'auth/invalid-email') {
                    errorMessage = 'This email is not valid.'
                }
                // For debugging purposes only
                console.log("db.auth().error caught during signup: ", errorCode, errorMessage);
                // Alert User Error Message
                Alert.alert(
                    'Alert',
                    errorMessage,
                    [{
                        text: 'Ok', onPress: () => console.log('Ok is pressed')
                    }],
                    {cancelable: true}
                );
            });
            // For testing and debugging purposes only
            console.log("Sign up button is pressed");
            console.log("Email: ", email, password);
        } catch (err) {
            console.log("Something went wrong: ", err)
        }

    }

    /**
     * Renders the form (TextInputs and Button) for user interaction.
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./my-icon.png')} style={{width: 150, height: 150, top: -55, opacity: 0.8 }} />
                <Text> </Text>
                <Text style={{top: -45, fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Email:</Text>
                <TextInput style={styles.input}
                           placeholder=" Email"
                           autoCapitalize={"none"}
                    //value={this.state.email}
                           onChangeText={val => this.onChangeText('email', val)}
                />
                <Text> </Text>
                <Text style={{top: -45, fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Password:</Text>
                <TextInput style={styles.input}
                           placeholder=" Password"
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                    //value={this.state.password}
                           onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title={"Sign Up"}
                    onPress={this.handleSignUp}
                />
                <Text>Already have an account?</Text>
                <Button
                    title={"Sign In"}
                    onPress={()=> this.props.navigation.navigate("SignIn")}
                />
            </View>
        );
    }
}

// UI Design TODO
const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 30,
        backgroundColor: '#E0EBCB',
        top: -40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    }
});

