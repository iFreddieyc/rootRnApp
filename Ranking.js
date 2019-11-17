/**
 * This is the Ranking screen class file.
 * @author Yiyun Zhang, Yining Chen, Lydia Gui, Melody Song
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    Button,
    Text,
    Alert,
    ActivityIndicator
} from 'react-native';
import db from "../base";
import RankView from "./RankView";
import util from "../util";

let friends = [];
let selfId;
const habits = []; //arrays of habits

class rankObject {
    constructor(id, habitName, Duration) {
        this.id = id; //user's id, may change to username in later stage
        this.habitName = habitName; //best habit's name
        this.duration = Duration; //best habit's duration
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

export default class Ranking extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = db.firestore().collection("users").where("userid", "==", db.auth().currentUser.uid);
        this.state = {
            isLoading: true,
            friends: [],
            ranking: [],
            message: "You do not have any friends now."
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
           //friends.push(doc.data());
            //get database friends array here
            friends = doc.data().friends;
            selfId = doc.data().userid;
        });
        //Add myself
        friends.push(selfId);
        getRanking(friends);
        this.setState({
            friends,
            isLoading: false,
            ranking: habits,
            message: "Your ranking is here."
        });
    }


    render() {
        if (this.state.isLoading) {
            console.log("Loading");
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
        // If loading is finished.
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    {this.state.message}
                </Text>
                <FlatList
                    data={this.state.ranking}
                    renderItem={({item}) =>
                        <RankView
                            authorName={item.id}
                            habitName={item.habitName}
                            duration={item.duration}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }
}

//function to get habits ranking
function getRanking(friends) {
    for(var i = 0; i < friends.length; i++){
        db.firestore().collection("habits").where("userid", "==", friends[i])
            .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                var maxDurationName = "" //empty maxDurationName
                var max = 0; //intialize max duration
                console.log(doc.id, " => ", doc.data().userid); //idk it's just there
                for (var j = 0; j < querySnapshot.size(); j++) //for loop, querySnapSHot.size() returns the document size(by google)
                    if(visible == true){//if visible is true
                        var num = util.getDifference(doc.data().startDate);//get duration number
                        if (num > max){//get max
                            max = num; //update max Duration
                            maxDurationName = doc.data().name; //update max duration habit's name
                        }
                    }
                habits.push(new rankObject(friends[i], max, maxDurationName)); //push the max DUration rankObject to habits array
                habits.sort(compare); //sort by comparing duration
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
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
