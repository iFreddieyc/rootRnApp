/**
 * Entry point of the application
 * @author Qingcheng You
 */
import React, {Component}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator} from "./src/router";
import {createAppContainer} from "react-navigation";

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

