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
import { withNavigation } from 'react-navigation';
import util from "../util";

class HabitView extends Component {
    constructor(props) {
        super(props);
    }

    days = util.getDifference(this.props.date)

    handleOnPress = () => {
        console.log(this.props.description);
    }

    handleEdit = () => {
        this.props.navigation.navigate('Edit', {text: this.props.id});
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
                        {this.days}
                    </Text>
                    <Button
                        title={"..."}
                        onPress={this.handleEdit}
                    />
                </View>
            </TouchableHighlight>
        );

    }

}

export default withNavigation(HabitView);

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
        top: '95%',
        left: 10
    }
});