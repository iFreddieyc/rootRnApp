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
    TouchableOpacity
} from 'react-native';


import util from "../../util";

export default class HabitViewFriend extends Component {
    constructor(props) {
        super(props);
    }

    handleOnPress = () => {
        console.log(this.props.description);
    }

    render() {
        return (
            <TouchableHighlight style={styles.container}
                                onPress={this.handleOnPress}
            >
                <View>
                    <Text style={styles.habitName}>
                        {this.props.name}
                    </Text>
                    <Text style={styles.habitDate}>
                        {this.props.date}
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
        height: 120,
        //padding: 100,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: '#d6d7da',
        backgroundColor: '#E0EBCB'
    },
    habitName: {
        fontSize: 30,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        top: '10%',
        left: 10
    },
    habitDate: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        top: '30%',
        left: 10
    }
});