/**
 * This is the HabitPage screen class file.
 * @author Qiuling Chen TODO
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Text, Alert} from 'react-native';
import db from "../base";

var users_friends;
users_friends = [];
//define a class called rankObject, storing user's id, his max habit name, and his habit duration
class rankObject {
    constructor(id, habitName, Duration) {
        this.id = id;
        this.habitName = habitName;
        this.Duration = Duartion;
    }
}
//function to compare by duration
function compare( a, b ) {
    if ( a.duration < b.duration ){
      return -1;
    }
    if ( a.duation > b.duration ){
      return 1;
    }
    return 0;
  }
//var Ranking;
//Ranking = [];
export default class Ranking extends Component {

    componentDidMount() {
        db.firestore().collection("users").where("userid", "==", "user_id1")
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().userid);
                users_friends.push(doc.data().friends); //get the users friend's userid
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });

        for(var i = 0; i < users_friends.length; i++){
          db.firestore().collection("habits").where("userid", "==", users_friends[i])
              .get().then(function (querySnapshot) { 
                  querySnapshot.forEach(function (doc) {
                      // doc.data() is never undefined for query doc snapshots
                      const habits = []; //arrays of habits
                      var maxDurationName = "" //empty maxDurationName
                      var max = 0; //intialize max duration
                      console.log(doc.id, " => ", doc.data().userid); //idk it's just there
                      for (var j = 0; j < querySnapshot.size(); j++) //for loop, querySnapSHot.size() returns the document size(by google)
                        if(visible == true){//if visible is true
                         var num = getDifference(doc.data().startDate);//get duration number
                            if (num > max){//get max
                                max = num; //update max Duration
                                maxDurationName = doc.data().name; //update max duration habit's name
                            }
                        }
                      habits.push(new rankObject(users_friends[i], max, maxDurationName)); //push the max DUration rankObject to habits array
                      habits.sort(compare); //sort by comparing duration
                  });
              }).catch(function (error) {
              console.log("Error getting documents: ", error);
          });
        }
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
