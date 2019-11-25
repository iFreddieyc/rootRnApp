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
import HabitPage from "./views/HabitPage";
import Profile from "./views/Profile";
import Ranking from "./views/Ranking";
import CreateHabit from "./views/CreateHabit";
import EditProfile from "./views/EditProfile";
import Friends from "./views/Friends";

// Stack Navigator for HabitPage and CreateHabit
export const HabitNavigator = createStackNavigator({
    Habits:{
        screen: HabitPage,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
        }),
    },
    CreateNew: {
        screen: CreateHabit,
    }
}, {
    initialRouteName: 'Habits'
})

// Sign Up and Sign In Screens
export const SignedOut = createSwitchNavigator({
    SignUp: SignUp,
    SignIn: SignIn,
}, {
    initialRouteName: 'SignIn'
});

// Profile Screen
export const ProfileNavigator = createStackNavigator({
    Profile:{
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
    }
}, {
    initialRouteName: "Profile"
});

// Tab Navigator for HabitNavigator, Ranking and Profile
export const SignedIn = createBottomTabNavigator({
    Habits: HabitNavigator,
    Rankings: Ranking,
    Profiles: ProfileNavigator,
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

// Default Switch Navigator for our app
export const AppNavigator = createSwitchNavigator({
    AuthLoading: Loading,
    App: SignedIn,
    Auth: SignedOut,
}, {
    initialRouteName: 'AuthLoading'
});

