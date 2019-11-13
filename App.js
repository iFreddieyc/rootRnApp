import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//import { createStackNavigator} from "react-navigation-stack";
import { SignedOut, SignedIn } from "./src/router";
import Loading from "./src/authFlow/Loading";
// export default function App() {
//   return(
//       <HabitPage />
//   );
// }

// const AppStack = createStackNavigator({ Habit: HabitPage, Ranking: Ranking });
// const AuthStack = createStackNavigator({ SignIn: SignIn , SignUp: SignUp});

export default createAppContainer(
    createSwitchNavigator({
      AuthLoading: Loading,
      App: SignedIn,
      Auth: SignedOut,
    },{
      initialRouteName: 'AuthLoading',
    })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
