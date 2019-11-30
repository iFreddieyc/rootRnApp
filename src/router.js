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
<<<<<<< HEAD
import HabitView from "./views/HabitView";

// Stack Navigator for HabitPage and CreateHabit
export const HabitNavigator = createStackNavigator({
    Habits:{
=======
import HabitView from "./screens/HabitView";
import forgetPassword from "./authFlow/forgetPassword";
import Welcome from "./screens/Welcome";
import EditProfile from "./screens/EditProfile";
import Notification from "./Notification";

// Stack Navigator for HabitPage and CreateHabit
export const HabitNavigator = createSwitchNavigator({
    Habits: {
>>>>>>> master
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

<<<<<<< HEAD
// Profile Screen
export const ProfileNavigator = createStackNavigator({
    Profile: {
=======
export const ProfileNavigator = createStackNavigator({
    Profile:{
>>>>>>> master
        screen: Profile,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
        }),
    },
    EditProfile: {
        screen: EditProfile,
    },
<<<<<<< HEAD
    Friends: {
        screen: Friends,
    },
    FriendRequests: {
        screen: FriendRequests,
    },
}, {
    initialRouteName: "Profile"
});
=======
    Notif:{
        screen: Notification,
    }
}, {
    initialRouteName: "Profile"
})
>>>>>>> master

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

