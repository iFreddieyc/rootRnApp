/**
 * This file renders the habit component onto habit page
 * @author Qiuling Chen, Qingcheng You
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

export default class HabitView extends Component {
    constructor(props) {
        super(props);
    }

    currDate = new Date(); // get current date
    startDate = new Date(this.props.date);

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
        marginTop: '30%',
        marginBottom: '30%',
        width: '100%',
        height: '30%',
        //padding: 100,
        backgroundColor: 'cyan',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    habitName: {
        fontSize: 14,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    habitDate: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
    }
});