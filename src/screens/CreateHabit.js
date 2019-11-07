/**
 * This is the CreateNewHabit class file.
 * @author Vincent Nguyen, Qingcheng You
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert, Picker, Switch} from 'react-native';
import user from "../auth";
import Habit from "../components/Habit";

export default class CreateHabit extends Component {
    /**
     * Constructor for class CreateNewHabit
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            visible: false,
            description: '',
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
            const {name, category, visible, description} = this.state;
            var habit = new Habit('what', "user_id1", "12/12/2019", 'is going on', 'true', 'sport');
            habit.pushToFirestore();
        } catch (err) {
            console.log("Something went wrong: ", err)
        }

    }

    /**
     * handleCancel triggers when cancel is pressed
     * TODO
     */
    handleCancel = () => {
        console.log("Cancel is pressed.")
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
                           placeholder="What's you habit?"
                           autoCapitalize={"none"}
                           onChange={val => this.onChangeText('name', val)}
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
                        switch1Value = {this.state.visible}
                />
                <Button
                    title={"Cancel"}
                    onPress={this.handleCancel}
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