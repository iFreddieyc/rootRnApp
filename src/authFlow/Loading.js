/**
 * Loading screen class file, to check if user is logged in.
 * @author Qingcheng You
 * @since 11.08.2019
 */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import db from "../base";

export default class Loading extends React.Component {

    componentDidMount() {
        db.auth().onAuthStateChanged(user => {
            // If user is signed in, go to AppStack. Otherwise, go to AuthStack.
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})