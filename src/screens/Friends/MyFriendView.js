/**
 * @author Vincent Nguyen
 */

import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native';

import db from "../../base";
import { withNavigation } from 'react-navigation';

export default class MyFriendView extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        console.log(this.props);
        this.docRef = db.firestore().collection('users').where("userId","==",this.props.uid);
         this.state = {
            username: "",
            picurl:"",
         }
    }


    componentDidMount() {
        this.unsubscribe = this.docRef.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) =>{
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        this.setState({
            username: data.username
        });
    }


    handleViewFriend = () => {
        this.props.navigation.navigate('FriendView', {text: this.props.uid});
    }

    render() {
        return (
            <TouchableHighlight style={styles.container}
                                onPress={this.handleViewFriend}
            >
                <View>
                    <Text style={styles.friendName}>
                        {this.state.username}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
        width: 350,
        height: 60,
        //padding: 100,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: '#d6d7da',
        backgroundColor: '#E0EBCB'
    },
    friendName: {
        fontSize: 30,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        left: 10,
        right: 10,
    }
});