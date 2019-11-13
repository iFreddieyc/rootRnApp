/**
 * This is the CreateNewHabit class file.
 * @author Vincent Nguyen, Qingcheng You
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert, Picker, Switch} from 'react-native';
import Habit from "../Habit";
import db from "../base";
import util from "../util";

export default class CreateHabit extends Component {
    /**
     * Constructor for class CreateNewHabit
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {
            name: 'Habit',
            visible: true,
            description: 'Description',
        };
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
        try {
            const {name, visible, description} = this.state;
            let userid = db.auth().currentUser.uid;
            let startDate = util.getCurrentDate();
            let habit = new Habit(name, userid, startDate, description, visible);
            habit.pushToFirestore();
            this.props.navigation.navigate('Habits');
        } catch (err) {
            console.log("Something went wrong: ", err)
            this.props.navigation.navigate('Habits');
        }
    }

    /**
     * Renders the form (TextInputs and Button) for user interaction.
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.container}>
                <Text>Name:</Text>
                <TextInput style={styles.input}
                           placeholder="The name of your habit"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('name', val)}
                />
                <Text>Description:</Text>
                <TextInput style={styles.input}
                           placeholder="Write a short description of your habit."
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('description', val)}
                           multiline={true}
                           maxLength={50}
                />
                <Text>Visible to friends?</Text>
                <Switch onValueChange={this.toggleSwitch}
                        value={this.state.visible}
                />
                <Button
                    title={"Confirm"}
                    onPress={this.handleConfirm}
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