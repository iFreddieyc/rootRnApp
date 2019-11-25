/**
 * This file controls the navigation for all of our apps
 * @author Qingcheng You
 * @since 11.6.2019
 */
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator} from "react-navigation";

import Loading from "./authFlow/Loading";
import SignUp from "./authFlow/SignUp";
import SignIn from "./authFlow/SignIn";
import HabitPage from "./screens/HabitPage";
import Profile from "./screens/Profile";
import Ranking from "./screens/Ranking";
import CreateHabit from "./screens/CreateHabit";
import EditHabit from "./screens/EditHabit";
import HabitView from "./screens/HabitView";

// Stack Navigator for HabitPage and CreateHabit
export const HabitNavigator = createSwitchNavigator({
    Habits:{
        screen: HabitPage,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
        }),
    },
    CreateNew: {
        screen: CreateHabit,
    },
    Edit: {
        screen: EditHabit,
    },
    View: {
        screen: HabitView,
    }
}, {
    initialRouteName: 'Habits'
})

// Switch Navigator for SignUp and SignIn
export const SignedOut = createSwitchNavigator({
    SignUp: SignUp,
    SignIn: SignIn,
}, {
    initialRouteName: 'SignIn'
});

// Tab Navigator for HabitNavigator, Ranking and Profile
export const SignedIn = createBottomTabNavigator({
    Habits: HabitNavigator,
    Rankings: Ranking,
    Profiles: Profile,
}, {
    initialRouteName: 'Habits',
    tabBarOptions:{
        activeTintColor: "white",
        activeBackgroundColor:"#C1D1AC",
        inactiveBackgroundColor: "#C1D1AC",
        adaptive:'true',
        inactiveTintColor: '#3A512B',
        labelStyle:{
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily:'Cochin'
        },
        style:{
            backgroundColor: "#C1D1AC"
        }
    }
});

// AppRegistry.registerComponent('HabitNavigator', () => WhateverYouWantToCallMe);

// Default Switch Navigator for our app
export const AppNavigator = createSwitchNavigator({
    AuthLoading: Loading,
    App: SignedIn,
    Auth: SignedOut,
}, {
    initialRouteName: 'AuthLoading'
})

