/**
 * This is the HabitPage screen class file.
 * @author Qiuling Chen TODO
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
import HabitView from "./HabitView";


export default class HabitPage extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = db.firestore().collection("habits").where("userid", "==", "user_id1");
        this.state = {
            isLoading: true,
            habits: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        const habits = [];
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data().userid);
            habits.push(doc.data());
        });
        this.setState({
            habits,
            isLoading: false,
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
        return (
            <SafeAreaView style={styles.container}>
                <Text>Hello</Text>
                {console.log(this.state.habits)}
                <FlatList
                    data={this.state.habits}
                    renderItem={({item}) =>
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