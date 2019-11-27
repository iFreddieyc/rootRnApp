/**
 * Welcome screen class file, to welcome a user (input username and profile picture)
 * @author Qingcheng You
 * @since 10.31.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert, Image, ActivityIndicator} from 'react-native';
import db from "../base";

export default class Welcome extends Component {

    /**
     * Constructor for class Welcome
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {username: '', loading: true};
    }

    /**
     * Handles text input
     * @param key the state to be changed
     * @param val the value to set the state with
     */
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

    componentDidMount() {
        const uid = db.auth().currentUser.uid;
        console.log(uid);
        let docRef = db.firestore().collection('users').doc(uid);
        let prom = new Promise((resolve, reject) => {
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    resolve(true)
                } else {
                    console.log("No such document!");
                    resolve(false)
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            })
        });
        prom.then((boolean) => {
            if (boolean == true) {
                this.props.navigation.navigate('Tabs');
            } else {
                this.setState({
                    loading: false,
                })
            }
        })
    }

    handleSubmit = () => {
        const {username} = this.state;
        const uid = db.auth().currentUser.uid;
        const {navigate} = this.props.navigation;
        console.log(username);
        db.firestore().collection('users').where("username", "==", username)
            .get()
            .then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    // Create a doc
                    db.firestore().collection('users').doc(uid).set({
                        username: username,
                        email: db.auth().currentUser.email,
                        userPicUrl: "",
                        userId: uid,
                    }).then(function () {
                        console.log("Document successfully written!");
                        navigate('Tabs');
                    });
                } else {
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


    /**
     * Renders the form (TextInputs and Button) for user interaction.
     * @returns {*}
     */
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text>
                    Welcome to root!
                </Text>
                <Text>
                    Begin your journey be choosing a username first.
                </Text>
                <TextInput style={styles.input}
                           placeholder="Username"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('username', val)}
                />
                <Button
                    title={"Submit"}
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}


// UI Design TODO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    }
});

