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

class rankObject {
    constructor(id, habitName, Duration) {
        this.id = id;
        this.habitName = habitName;
        this.Duration = Duartion;
    }
}
function compare( a, b ) {
    if ( a.duration < b.duration ){
      return -1;
    }
    if ( a.duation > b.duration ){
      return 1;
    }
    return 0;
  }
var Ranking;
Ranking = [];
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
                      const habits = [];
                      var maxDurationName = ""
                      var max = 0;
                      console.log(doc.id, " => ", doc.data().userid);
                      for (var j = 0; j < querySnapshot.size(); j++)
                        if(visible == true){
                         var num = getDifference(doc.data().startDate);
                            if (num > max){
                                max = num;
                                maxDurationName = doc.data().name;
                            }
                        }
                      habits.push(new rankObject(users_friends[i], max, maxDurationName));
                      habits.sort(compare);
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
