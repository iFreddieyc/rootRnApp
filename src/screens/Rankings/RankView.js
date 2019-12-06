/**
 * This file renders the rank component onto ranking page
 * @author Yiyun Zhang, Yining Chen, Lydia Gui
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight,} from 'react-native';
import ImageWrapper from "../ImageWrapper.js";

export default class RankView extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <TouchableHighlight style={styles.container}
            >
                <View>
                    <View style={{flexDirection: 'row', position: 'relative', top: '7%'}}>
                        <Text style={styles.habitName}>
                            {this.props.habitName}
                        </Text>
                        <Text style={styles.habitDuration}>
                            {this.props.duration}
                        </Text>
                    </View>
                    <ImageWrapper
                        id={this.props.userId}
                        navigation={this.props.navigation}
                    />
                </View>
            </TouchableHighlight>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        marginTop: '4%',
        marginBottom: '1%',
        width: 350,
        height: 70,
        //padding: 100,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: '#d6d7da',
        backgroundColor: '#E0EBCB'
    },
    authorName: {
        fontSize: 14,
        color: '#E7ABAB',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        left: 10
    },
    habitName: {
        fontSize: 21,
        color: '#D98888',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        position: 'absolute',
        top: '100%',
        left: '5%'
    },
    habitDuration: {
        fontSize: 19,
        color: '#E7ABAB',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        position: 'absolute',
        top: '100%',
        left: '50%'
    },
    image: {
        position: 'absolute',
        width: 80,
        height: 80,
        left: '85%',
        top: '15%'

    }
});