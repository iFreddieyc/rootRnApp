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
import HabitPage from "./views/HabitPage";
import Profile from "./views/Profile";
import Ranking from "./views/Ranking";
import CreateHabit from "./views/CreateHabit";

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

// Default Switch Navigator for our app
export const AppNavigator = createSwitchNavigator({
    AuthLoading: Loading,
    App: SignedIn,
    Auth: SignedOut,
}, {
    initialRouteName: 'AuthLoading'
})

