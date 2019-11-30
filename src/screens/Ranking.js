/**
 * This is the Ranking screen class file.
 * @author Yiyun Zhang, Yining Chen, Liying Gui, Qingcheng You
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

import db from "../base";
import RankView from "../views/RankView";
import Habit from "../data/Habit";
import util from "../util";

export default class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            friends: [],
            ranking: [],
            message: "Add a friend to see their progress!"
        };
    }

    componentDidMount() {
        this.getRanking();
    }

    getRanking() {
        this.getFriendList().then((friendsList) => {
            this.setState({
                friends: friendsList,
            });
            const arr = [];
            for (const id of friendsList) {
                console.log(id);
                arr.push(this.getHabitFromUid(id));
            }
            Promise.all(arr).then((values) => {
                values = values.filter(
                    item => item !== undefined
                );
                values.sort(util.compare);
                //console.log("Done");
                //console.log(values);
                this.setState({
                    ranking: values,
                    isLoading: false,
                });
                if (values.length > 0) {
                    this.setState({
                        message: "HabitRank",
                    });
                }
                console.log(values);
            }).catch(function (error) {
                    console.log("Something went wrong", error);
                }
            );
        });
    }

    getFriendList = () => {
        return new Promise((resolve, reject) => {
            let friendList = [];
            db.firestore().collection("users")
                .where("userid", "==", db.auth().currentUser.uid)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        friendList = doc.data().friends;
                        console.log(friendList);
                    });
                    friendList.push(db.auth().currentUser.uid);
                    resolve(friendList);
                })
                .catch(function (error) {
                    console.log("Inside getFriendList, error getting documents: ", error);
                });
        })
    }

    getHabitFromUid = (uid) => {
        let habit;
        let highestDuration = 0;
        return new Promise((resolve, reject) => {
            db.firestore().collection("habits")
                .where("visible", "==", true).where("userid", "==", uid)
                .where("archived", "==", false)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        let currentDuration = util.getDifference(doc.data().numOfDays);
                        if (doc.exists && (highestDuration < currentDuration)) {
                            habit = new Habit(doc.data().name, doc.data().userid, doc.data().startDate,
                                doc.data().description, doc.data().visible,
                                doc.data().numOfDays, doc.data().archived);
                            highestDuration = currentDuration;
                            console.log(habit);
                        }
                    });
                    resolve(habit);
                })
                .catch(function (error) {
                    console.log("Inside getHabitFromUid, error getting documents: ", error);
                });
        });

    }

    render() {
        if (this.state.isLoading) {
            console.log("Hello");
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>
                        {this.state.message}
                    </Text>
                    <FlatList
                        data={this.state.ranking}
                        renderItem={({item}) =>
                            <RankView
                                authorName={item.userid}
                                habitName={item.name}
                                duration={item.duration}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </SafeAreaView>
            );
        }
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
        fontFamily: 'Cochin',
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
    }
});