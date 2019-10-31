/**
 * This is the SignUp screen class file.
 * @author Qingcheng You TODO
 * @since 10.31.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';

export default class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

    /**
     * handleSignUp is called when "Sign Up" button is pressed.
     * Connect to Firebase Authentication TODO
     */
    handleSignUp = () => {
        const {email, password} = this.state;
        try {
            // This is where to add Firebase authentication function
            // TODO
            // Something is wrong here, console.log prints as user input each character, when button is unpressed.
            // For testing and debugging purposes only
            console.log("Sign up button is pressed");
            console.log("Email: ", email, password);
        } catch (err) {
            console.log("Something went wrong: ", err)
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Email:</Text>
                <TextInput style={styles.input}
                    placeholder="Email"
                    autoCapitalize={"none"}
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <Text>Password:</Text>
                <TextInput style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title={"Sign Up"}
                    onPress={this.handleSignUp()}
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
