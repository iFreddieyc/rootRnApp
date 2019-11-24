/**
 * This file renders the rank component onto ranking page
 * @author Yiyun Zhang, Yining Chen, Liying Gui
 * @since 11.8.2019
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
    TouchableOpacity,
    Image
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
                    <View style={{flexDirection: 'row', position: 'relative', top: '2%'}}>
                    <Text style={styles.habitName}>
                        {this.props.habitName}
                    </Text>
                    <Text style={styles.habitDuration}>
                        {this.props.duration}
                    </Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={require('./smile.jpeg')}
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
        marginTop: '5%',
        marginBottom: '5%',
        width: 350,
        height: 50,
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
        fontSize: 20,
        color: '#D98888',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        position: 'absolute',
        top: '50%',
        left: '5%'
    },
    habitDuration: {
        fontSize: 18,
        color: '#E7ABAB',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    image:{
        position: 'absolute',
        width: 30,
        height: 30,
        left: '85%',
        top: '15%'

    }
});
