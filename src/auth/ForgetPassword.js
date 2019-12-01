/**
 * This file controls the situation when people forget password
 * @author Ziyu Lin, Qiuling Chen, Qingcheng You
 * @since 11.25.2019
 */
import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, Text, Alert, Image } from 'react-native'
import db from "../base";

export default class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state = {email: ''};
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

    handleForgotPassword = () => {
        const {navigate} = this.props.navigation;
        try {
            const {email} = this.state;
            db.auth().sendPasswordResetEmail(email).then(function() {
                // Email sent.
                console.log("Verification email sent.")
                Alert.alert(
                    'Success',
                    "Verification Email Sent.",
                    [{
                        text: 'Ok', onPress: () => navigate('SignIn')
                    }],
                    {cancelable: true}
                );
                    // () => this.props.navigation.navigate('SignIn')
            }).catch(function(error) {
                // An error happened.
                const errorCode = error.code;
                let errorMessage;
                if (errorCode == 'auth/invalid-email') {
                    errorMessage = 'This email is not valid.'
                    Alert.alert("Email is not valid")
                } else if (errorCode == 'auth/user-not-found') {
                    errorMessage = 'No account under this email'
                    Alert.alert("No account under this email")
                }


                // For debugging purposes only
                console.log("db.auth().error caught during forgot password: ", errorCode, errorMessage);
            });
        } catch (err) {
            console.log("Something went wrong: ", err)
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Please Enter your Email:</Text>
                <TextInput style={styles.input}
                           placeholder=" Email"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('email', val)}
                />
                <View style={styles.buttons}>
                    <Button
                        title={"Back"}
                        color="blue"
                        onPress={()=> this.props.navigation.navigate("SignIn")}
                    />
                    <Button
                    title={"Send"}
                    color="green"
                    onPress={
                        this.handleForgotPassword}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputTitle: {
        width: 250,
        height: 30,
        alignItems: 'center',
        fontFamily: 'Cochin',
        fontSize: 20
    },
    buttons: {
        flex: 1,
        position: 'absolute',
        bottom: '35%',
        flexDirection: 'row',
    },
    input: {
        width: 250,
        height: 30,
        backgroundColor: '#E0EBCB',
        alignItems: 'center',
        fontFamily: 'Cochin',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    }
});