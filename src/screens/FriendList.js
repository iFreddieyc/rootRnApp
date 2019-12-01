/**
 * @author Vincent Nguyen
 */

import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Button,
    Text,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import db from "../base";
import MyFriendView from "../views/MyFriendView";
import { withNavigation } from 'react-navigation';


export default class FriendList extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.ref = db.firestore().collection("users").where("userId", "==", db.auth().currentUser.uid);
        console.log(this.ref)
        this.state = {
            isLoading: true,
            friendList: [],
            message: "No Friends. Add a friend"
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) =>{
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        this.setState({
            friendList: data.friends,
            isLoading: false,
        });

        if(data.friends.length > 0){
            this.setState({
                message: "My Friends"
            });
        }
    }


    render() {
        if (this.state.isLoading) {
            return (
                <SafeAreaView>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
                <Text style={styles.title}>
                    {this.state.message}
                </Text>
                <View>
                    <FlatList
                        data={this.state.friendList}
                        renderItem={({item}) =>
                            <MyFriendView
                                navigation={this.props.navigation}
                                uid={item}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
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
        fontFamily: 'Cochin',
    },

});