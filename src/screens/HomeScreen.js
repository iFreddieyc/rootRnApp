import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button
                title="Signup"
                onPress={() => navigate('Signup', {})}
            />
        );
    }
}