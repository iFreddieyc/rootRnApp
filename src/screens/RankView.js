/**
 * This file renders the rank component onto ranking page
 * @author Yiyun Zhang, Yining Chen, Lydia Gui, Melody Song
 * @since 11.3.2019
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

export default class RankView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight style={styles.container}
            >
                <View>
                    <Text style={styles.authorName}>
                        {this.props.authorName}
                    </Text>
                    <Text style={styles.habitName}>
                        {this.props.habitName}
                    </Text>
                    <Text style={styles.habitDuration}>
                        {this.props.duration}
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
    authorName: {
        fontSize: 14,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    habitName: {
        fontSize: 14,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    habitDuration: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
    }
});