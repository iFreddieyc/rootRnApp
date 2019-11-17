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
                <View style={styles.littleContainer}>
                <View style={{left:'15%', position:'absolute', top:'15%'}}>
                <Text style={{left:0, top: '40%', fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Name:</Text>
                <TextInput style={styles.input}
                           placeholder=""
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('name', val)}
                />
                </View>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <View style={{left:'15%', position:'absolute', top:'30%'}}>
                <Text style={{left:0, top: '40%',fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Description:</Text>
                <TextInput style={styles.input}
                           placeholder=" "
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('description', val)}
                           multiline={true}
                           maxLength={50}
                />
                </View>
                <Text> </Text>
                <Text style={{left:0, top: '5%',fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 16}}>Visible to friends?</Text>
                <View style={{top: '5%'}}>
                <Switch onValueChange={this.toggleSwitch}
                        value={this.state.visible}
                />
                </View>
                <View style={{bottom: '-15%'}}>
                <Button
                    title={"Confirm"}
                    onPress={this.handleConfirm}
                />
                </View>
                </View>
            </View>
        );
    }
}

// UI Design TODO
const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 30,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:2,
        borderBottomColor: 'black'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    littleContainer:{
        height:'50%',
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0EBCB'
    }
});