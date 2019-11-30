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
import db from "../base";

export default class ImageWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        const id = this.props.id;

    }

    render() {
        return (
            <TouchableHighlight>
                <Image>

                </Image>
            </TouchableHighlight>
        );
    }
}