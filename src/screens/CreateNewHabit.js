/**
 * This is the CreateNewHabit class file.
 * @author Huilin (Melody) Song
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert} from 'react-native';
import db from "../base";

export default class CreateNewHabit extends Component {
    /**
     * Constructor for class CreateNewHabit
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {habitName: '', time: '', category: '', publicity: ''};

        this.firebaseRef = db.database().ref("Habits")
        this.firebaseRef.on('value', dataSnapshot => {
            let habitNames = [];
            dataSnapshot.forEach(childSnapshot => {
                let habitName = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });
            this.setState({habitNames});
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
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
     * handleCreateNewHabit is called when " + " button is pressed.
     * Connect to Firebase database
     */
    handleCreateNewHabit = () => {
        try {
            const {habitName, time, category, publicity} = this.state;
            // This is where to add Firebase database function
            db.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here
                const errorCode = error.code;
                let errorMessage;
                if(errorCode == 'auth/weak-password'){
                    errorMessage = 'This password is too weak.'
                }else if(errorCode == 'auth/email-already-in-use'){
                    errorMessage = 'This email is already in use.'
                }else if(errorCode == 'auth/invalid-email'){
                    errorMessage = 'This email is not valid.'
                }
                // For debugging purposes only
                console.log("db.auth().error caught: ", errorCode, errorMessage);
                // Alert User Error Message
                Alert.alert(
                    'Alert',
                    errorMessage,
                    [{
                        text: 'Ok', onPress:() => console.log('Ok is pressed')
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
        const records = this.state.habitNames.map(items =>
            <tr key={habitNames.habitName}>
                <td style={{width: '200px', textAlign:'center'}}>{habitNames.habitName}</td>
                <td style={{width: '200px', textAlign:'center'}}>{}
        )
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
