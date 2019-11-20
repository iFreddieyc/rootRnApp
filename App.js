/**
 * Entry point of the application
 * @author Qingcheng You, Andy Duong
 * @since  11.17.19
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppNavigator} from "./src/router";
import {createAppContainer} from "react-navigation";

export default createAppContainer(AppNavigator);

// TODO: Move this to an external CSS file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

