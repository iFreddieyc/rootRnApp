/**
 * This is the SignIn screen class file.
 * @author Qingcheng You
 * @since 11.02.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert, Image} from 'react-native';
import db from "../base";

export default class SignIn extends Component {
    /**
     * Constructor for class SignIn
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
     * handleLogin is called when "Sign Up" button is pressed.
     * Connect to Firebase Authentication TODO
     */
    handleLogin = () => {
        try {
            const {email, password} = this.state;
            // This is where to add Firebase authentication function

            db.auth().signInWithEmailAndPassword(email, password)
                .then(
                    () => this.props.navigation.navigate('App')
                )
                .catch(function (error) {
                    const errorCode = error.code;
                    let errorMessage;
                    if (errorCode == 'auth/wrong-password') {
                        errorMessage = 'Wrong password.'
                    } else if (errorCode == 'auth/invalid-email') {
                        errorMessage = 'This email is not valid.'
                    } else if (errorCode == 'auth/user-not-found') {
                        errorMessage = 'User not found.'
                    }
                    // For debugging purposes only
                    console.log("db.auth().error caught during signIn: ", errorCode, errorMessage);
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
            console.log("SignIn button is pressed");
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
                <Text style={styles.title}>ROOT</Text>
                <Text> </Text>
                <Text style={{top: -45, fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Email:</Text>
                <TextInput style={styles.input}
                           placeholder=" Email"
                           autoCapitalize={"none"}
                           value={this.state.email}
                           onChangeText={val => this.onChangeText('email', val)}
                />
                <Text> </Text>
                <Text style={{top: -45, fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Password:</Text>
                <TextInput style={styles.input}
                           placeholder=" Password"
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                           value={this.state.password}
                           onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title={"Sign In"}
                    onPress={this.handleLogin}
                />
                <View style={{position: 'absolute', bottom:50, right:10}}>
                <Button
                    title={"Sign up"}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
                </View>
            </View>
        );
    }
}
// UI Design TODO
const styles = StyleSheet.create({
    title: {
        width: 250,
        height: 30,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontSize: 24,
        fontWeight: 'bold',
        top: -65
    },
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

