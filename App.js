import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./src/views/SignUp";
import CreateHabit from "./src/views/CreateHabit";

export default function App() {
  return(
      <SignUp />
      //<CreateHabit />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
