/**
 * This is the CreateNewHabit class file.
 * @author Vincent Nguyen, Qingcheng You
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert, Switch, Keyboard} from 'react-native';
import Habit from "../../Habit";
import db from "../../base";
import util from "../../util";

export default class CreateHabit extends Component {
    /**
     * Constructor for class CreateNewHabit
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            visible: true,
            description: '',
        };
        this.ref = db.firestore().collection('users').doc(db.auth().currentUser.uid);
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
     * Toggles switch
     */
    toggleSwitch = (value) => {
        this.setState({visible: value})
        console.log('Switch is: ' + value)
    }

    /**
     * handleCreateNewHabit is called when " + " button is pressed.
     * Connect to Firebase database
     */
    handleConfirm = () => {
        const {name, visible, description} = this.state;
        if (name === "" || description.length < 10){
            Alert.alert(
                'Alert',
                "Habit name must not be empty and description must have at least 10 characters",
                [{
                    text: 'Ok', onPress: () => console.log('Ok is pressed')
                }],
                {cancelable: true}
            );
        }else {
            try {
                let userid = db.auth().currentUser.uid;
                let startDate = util.getCurrentDate();
                let habit = new Habit(name, userid, startDate, description, visible, 0,false);
                habit.pushToFirestore()
                    .then(
                        this.ref.update({
                            changed: Math.random() * (100 - 0) + 0,
                        }).then(
                            this.props.navigation.navigate('Habits')
                        )
                    )
                    .catch(function(error){
                        // do nothing
                    });
            } catch (err) {
                console.log("Something went wrong: ", err)
                this.props.navigation.navigate('Habits');
            }
        }
    }

    handleCancel = () => {
        this.props.navigation.navigate('Habits');
    }

    /**
     * Renders the form (TextInputs and Button) for user interaction.
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.littleContainer}>
                    <View style={{left: '15%', position: 'absolute', top: '15%'}}>
                        <Text style={{
                            left: 0,
                            top: '40%',
                            fontFamily: 'Cochin',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>Name:</Text>
                        <TextInput style={styles.input}
                                   placeholder=" "
                                   autoCapitalize={"none"}
                                   onChangeText={val => this.onChangeText('name', val)}
                        />
                    </View>
                    <Text> </Text>
                    <Text> </Text>
                    <Text> </Text>
                    <View style={{left: '15%', position: 'absolute', top: '30%'}}>
                        <Text style={{
                            left: 0,
                            top: '40%',
                            fontFamily: 'Cochin',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>Description:</Text>
                        <TextInput style={styles.description}
                                   placeholder=" "
                                   autoCapitalize={"none"}
                                   onChangeText={val => this.onChangeText('description', val)}
                                   multiline={true}
                                   maxLength={50}
                                   blurOnSubmit={true}
                                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                        />
                    </View>
                    <Text> </Text>
                    <Text style={{left: 0, top: '10%', fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Visible
                        to friends?</Text>
                    <View style={{top: '12%'}}>
                        <Switch onValueChange={this.toggleSwitch}
                                value={this.state.visible}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            title={"Cancel"}
                            color="blue"
                            onPress={this.handleCancel}
                        />
                        <Button
                            title={"Confirm"}
                            color="green"
                            onPress={this.handleConfirm}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

// UI Design
const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        position: 'absolute',
        bottom: '10%',
        flexDirection: 'row',
    },
    input: {
        width: 220,
        height: 30,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D4DBAD',
    },
    description: {
        width: 220,
        height: 60,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D4DBAD',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    littleContainer: {
        position: 'absolute',
        height: '65%',
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0EBCB',
        borderRadius: 15,
    }
});
