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
    initialRouteName: 'Habits'
});

// Default Switch Navigator for our app
export const AppNavigator = createSwitchNavigator({
    AuthLoading: Loading,
    App: SignedIn,
    Auth: SignedOut,
}, {
    initialRouteName: 'AuthLoading'
});

export const  ProfileNavigator = createStackNavigator({
    Profile:{
        screen: Profile,
        navigationOptions: () => ({
            headerBackTitle: 'Cancel',
        }),
    },
    CreateNew: {
        screen: EditProfile,
    }
}, {
    initialRouteName: "Profile"
})

