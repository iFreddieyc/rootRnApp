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
import forgetPassword from "./auth/forgetPassword";
import HabitPage from "./screens/HabitPage";
import Profile from "./screens/Profile";
import Ranking from "./screens/Ranking";
import CreateHabit from "./screens/CreateHabit";
import EditProfile from "./screens/EditProfile";
import Friends from "./screens/Friends";
import FriendRequests from "./screens/FriendRequests";
import EditHabit from "./screens/EditHabit";
import HabitView from "./views/HabitView";
import Notification from "./Notification";
import Welcome from "./screens/Welcome";

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
    initialRouteName: 'Habits'
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
        }),
    },
    EditProfile: {
        screen: EditProfile,
    },
    Friends: {
        screen: Friends,
    },
    FriendRequests: {
        screen: FriendRequests,
    },
    Notif:{
        screen: Notification,
    }
}, {
    initialRouteName: "Profile"
})

// Tab Navigator for HabitNavigator, Ranking and Profile
export const Tabs = createBottomTabNavigator({
    Habits: HabitNavigator,
    Rankings: Ranking,
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

