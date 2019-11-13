/**
 * Loading screen class file, to check if user is logged in.
 * @author Qingcheng You
 * @since 11.08.2019
 */
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {isSignedIn} from "../auth";

export default class Loading extends React.Component {

    componentDidMount() {
        // If user is signed in, go to Main. Otherwise, go to SignUp.
        this.props.navigation.navigate(isSignedIn ? 'Main' : 'SignUp')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
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