/**
 * This is the SignUp screen class file.
 * @author Qingcheng You TODO
 * @since 10.31.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import db from "../base";

export default class signUp extends Component {
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
     * Connect to Firebase Authentication TODO
     */
    handleSignUp = () => {
        try {
            const {email, password} = this.state;
            // This is where to add Firebase authentication function
            db.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("db.auth().error caught: ", errorCode, errorMessage);
                // ...
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
                <Text>Email:</Text>
                <TextInput style={styles.input}
                           placeholder="Email"
                           autoCapitalize={"none"}
                           value={this.state.email}
                           onChangeText={val => this.onChangeText('email', val)}
                />
                <Text>Password:</Text>
                <TextInput style={styles.input}
                           placeholder="Password"
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                           value={this.state.password}
                           onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title={"Sign Up"}
                    onPress={this.handleSignUp}
                />
            </View>
        );
    }
}

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

