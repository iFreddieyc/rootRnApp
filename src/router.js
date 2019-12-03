/**
 * This file controls the navigation for all of our apps
 * @author Qingcheng You, Andy Duong
 * @since 11.17.2019
 */
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator} from "react-navigation";

import Loading from "./auth/Loading";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import forgetPassword from "./auth/ForgetPassword";
import HabitPage from "./screens/Habits/HabitPage";
import Profile from "./screens/Profiles/Profile";
import Ranking from "./screens/Rankings/Ranking";
import CreateHabit from "./screens/Habits/CreateHabit";
import EditProfile from "./screens/Profiles/EditProfile";
import Friends from "./screens/Friends/Friends";
import FriendRequests from "./screens/Friends/FriendRequests";
import EditHabit from "./screens/Habits/EditHabit";
import HabitView from "./screens/Habits/HabitView";
import Notification from "./screens/Profiles/Notification";
import FriendProfileView from "./screens/Profiles/FriendProfileView";
import FriendList from "./screens/Friends/FriendList";
import FriendHabitList from "./screens/Friends/FriendHabitList";
import Welcome from "./screens/Welcome";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#C1D1AC',
    },
});


// Stack Navigator for HabitPage and CreateHabit
export const HabitNavigator = createStackNavigator({
    Habits:{
        screen: HabitPage,
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
    initialRouteName: 'Habits',
    headerMode: 'none'
})

// Sign Up and Sign In Screens
export const SignedOut = createSwitchNavigator({
    SignUp: SignUp,
    SignIn: SignIn,
    Forget: forgetPassword,
}, {
    initialRouteName: 'SignIn'
});

// Profile Screen
export const ProfileNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
            headerStyle: {backgroundColor: '#C1D1AC'}
        }),
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
            headerStyle: {backgroundColor: '#C1D1AC'}

        }),
    },
    Friends: {
        screen: Friends,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
            headerStyle: {backgroundColor: '#C1D1AC'}
        }),
    },
    FriendRequests: {
        screen: FriendRequests,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
            headerStyle: {backgroundColor: '#C1D1AC'}
        }),
    },
    Notif:{
        screen: Notification,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
            headerStyle: {backgroundColor: '#C1D1AC'}
        }),
    },
    Friend: {
        screen: FriendList,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
            headerStyle: {backgroundColor: '#C1D1AC'}
        }),
    },
    FriendView: {
        screen: FriendProfileView,
    },
    FriendHabit: {
        screen: FriendHabitList,
    }

}, {
    initialRouteName: "Profile",
})

// Tab Navigator for HabitNavigator, Ranking and Profile
export const Tabs = createBottomTabNavigator({
    Habits: HabitNavigator,
    Rankings: {
        screen:Ranking,
        navigationOptions: () => ({
            headerStyle: {backgroundColor: '#C1D1AC'}
        }),
    },
    Profiles: ProfileNavigator,
}, {
    initialRouteName: 'Habits',
    tabBarOptions: {
        activeTintColor: "white",
        activeBackgroundColor: "#C1D1AC",
        inactiveBackgroundColor: "#C1D1AC",
        adaptive: 'true',
        inactiveTintColor: '#3A512B',
        labelStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Cochin'
        },
        style: {
            backgroundColor: "#C1D1AC"
        }
    }
});

export const SignedIn = createSwitchNavigator({
    Welcome: Welcome,
    Tabs: Tabs,
},{
    initialRouteName: "Welcome"
});

// AppRegistry.registerComponent('HabitNavigator', () => WhateverYouWantToCallMe);

// Default Switch Navigator for our app
export const AppNavigator = createSwitchNavigator({
    AuthLoading: Loading,
    App: SignedIn,
    Auth: SignedOut,
}, {
    initialRouteName: 'AuthLoading'
});


