import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Loading from "./authFlow/Loading";
import SignUp from "./authFlow/SignUp";
import SignIn from "./authFlow/SignIn";
import HabitPage from "./screens/HabitPage";
import Profile from "./screens/Profile";
import Ranking from "./screens/Ranking";

export const SignedOut = createStackNavigator({
    SignUp: {
        screen: SignUp,
    },
    SignIn: {
        screen: SignIn,
    }
});

export const SignedIn = createBottomTabNavigator({
    Habit: {
        screen: HabitPage,
        navigationOptions: {
            tabBarLabel: "My Habits"
        }
    },
    Ranking: {
        screen: Ranking,
        navigationOptions:{
            tabBarLabel: "Rankings"
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: "Profile",
        }
    }
});

// export const TabNavigator = createBottomTabNavigator({
//     HabitPage: HabitPage,
//     Ranking: Ranking,
//     Profile: Profile,
// });
