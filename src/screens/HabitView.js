import React, {Component} from 'react';
import {FlatList, StyleSheet, View, TextInput, Button, Text, Alert} from 'react-native';
import db from "../base";

export default class HabitView extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.habitName}>{this.props.name}</Text>
                <Text style={styles.habitDate}>{this.props.date}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //alignItems: 'center',
        marginTop: '30%',
        marginBottom: '30%',
        //width: '30%',
        //height: '30%',
        //padding: 100,
        backgroundColor: 'cyan'
    },
    habitName: {
        fontSize: 14,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    habitDate: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
    }
});