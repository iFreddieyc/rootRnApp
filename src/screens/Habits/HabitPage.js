/**
 * This is the HabitPage screen class file.
 * @author Qiuling Chen, Qingcheng You
 * @since 11.17.2019
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, SafeAreaView, Button, Text, ActivityIndicator, View} from 'react-native';

import db from "../../base";
import HabitView from "./HabitView";

export default class HabitPage extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = db.firestore().collection("habits").where("userid", "==", db.auth().currentUser.uid);
        this.state = {
            isLoading: true,
            habits: [],
            message: "You are not forming any habits now, press the plus button to start one."
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        const habits = [];
        querySnapshot.forEach(function (doc) {
            habits.push(doc.data());
            // console.log("numOfDays: " + doc.data().numOfDays);
        });
        this.setState({
            habits,
            isLoading: false,
        });
        if (habits.length > 0) {
            this.setState({
                message: "My Habits"
            });
        }
    }

    directToCreateNewHabit = () => {
        this.props.navigation.navigate('CreateNew');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </SafeAreaView>
            )
        }
        // If loading is finished.
        return (
            <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
                {/*<Text style={styles.title}>*/}
                {/*    {this.state.message}*/}
                {/*</Text>*/}
                <FlatList
                    data={this.state.habits}
                    renderItem={({item}) =>
                        <HabitView
                            name={item.name}
                            numOfDays={item.numOfDays}
                            description={item.description}
                            id={item.habitId}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.button}>
                    <Button
                        onPress={this.directToCreateNewHabit}
                        title={"+"}
                    />
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    title: {
        fontSize: 35,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin'
    },
    habitStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold', alignItems: 'center',
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button:
        {
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            backgroundColor: '#E0EBCB',
            alignItems: 'center',
            justifyContent: 'center'
        }
});
