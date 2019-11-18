/**
 * This is the placeholder for the ranking screen
 * @author Qingcheng You TODO
 * @since 11.8.2019
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Ranking extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Ranking</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
