/**
 * This is the placeholder for the profile screen
 * @author Qingcheng You TODO
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import db from "../base";

export default class Profile extends Component {
    handleSignOut = () =>{
        db.auth().signOut().then(
            () => this.props.navigation.navigate('Auth')
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Profile</Text>
                <Button
                    title={"Click me to sign out"}
                    onPress={this.handleSignOut}
                />
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