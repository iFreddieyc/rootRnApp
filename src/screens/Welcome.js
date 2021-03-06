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
        //console.log(uid);
        let docRef = db.firestore().collection('users').doc(uid);
        let prom = new Promise((resolve, reject) => {
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
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
        // Check if username is longer than 5 characters
        if (username.length < 5) {
            Alert.alert(
                'Alert',
                "Username is too short",
                [{
                    text: 'Ok', onPress: () => console.log('Ok is pressed')
                }],
                {cancelable: true}
            );
        } else {
            // Check if username already exists
            db.firestore().collection('users').where("username", "==", username)
                .get()
                .then(function (querySnapshot) {
                    // If no duplicating usernames
                    if (querySnapshot.empty) {
                        // Create a doc
                        db.firestore().collection('users').doc(uid).set({
                            username: username,
                            email: db.auth().currentUser.email,
                            userPicUrl: "",
                            userId: uid,
                            friends: [],
                            incoming: [],
                            outgoing: [],
                        }).then(function () {
                            console.log("Document successfully written!");
                            navigate('Tabs');
                        });
                        // Username is already taken
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
                <Image source={require('../auth/my-icon.png')}
                       style={{width: 150, height: 150, position: 'absolute', top: '20%', opacity: 0.8}}/>
                <Text style={styles.title}>
                    Welcome to Root!
                </Text>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text style={{
                    color: 'black',
                    fontFamily: 'Cochin',
                    fontSize: 18,
                    padding: 10,
                    position: 'absolute',
                    bottom: '50%'
                }}>
                    Begin your journey by choosing a username first.
                </Text>

                <TextInput style={styles.input}
                           placeholder="Username"
                           autoCapitalize={"none"}
                           autoCorrect={false}
                           onChangeText={val => this.onChangeText('username', val)}
                           maxLength={10}
                />
                <Text> </Text>
                <View style={styles.button}>
                    <Button
                        title={"Submit"}
                        color={'white'}
                        onPress={this.handleSubmit}
                    />
                </View>
            </View>
        );
    }
}


// UI Design TODO
const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: '30%',
        backgroundColor: '#75B54E',
        borderRadius: 10,
        width: '28%',
        height: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Cochin',
        fontSize: 40,
        fontWeight: 'bold',
        position: 'absolute',
        top: '40%',

    },
    input: {
        width: '70%',
        height: '5%',
        backgroundColor: '#E0EBCB',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        position: 'absolute',
        bottom: '44%',
        fontSize: 24,
        fontFamily: 'Cochin',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    }
});

