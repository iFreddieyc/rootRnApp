/**
 * This is the HabitPage screen class file.
 * @author Qiuling Chen TODO
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Text, Alert} from 'react-native';
import db from "../base";
import HabitView from "./HabitView";

var habits;
habits = [];
export default class HabitPage extends Component {

    componentDidMount() {
        db.firestore().collection("habits").where("userid", "==", "user_id1")
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().userid);
                habits.push(doc.data());
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Hello</Text>
                <FlatList
                    data={habits}
                    renderItem={({ item }) =>
                        <HabitView
                            name={item.name}
                            date={item.startDate}
                        />
                    }
                />
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    habitStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold', alignItems: 'center',
    }
});