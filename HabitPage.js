/**
 * This is the HabitPage screen class file.
 * @author Qiuling Chen TODO
 * @since 11.3.2019
 */
import React, {Component} from 'react';
import {FlatList,StyleSheet, View, TextInput, Button, Text, Alert} from 'react-native';
import db from "../base";
import { createStackNavigator } from 'react-navigation-stack';
import { CheckBox } from 'react-native-elements'


// Declaring screen names for redirecting
const RootStack = createStackNavigator(
  {
    HabitPage: HabitPageScreen,
    CreateNewHabit: CreateNewHabitScreen,
  },
  {
    initialRouteName: 'HabitPage',
  }
);
//React.Component and Component differ??
export default class HabitPage extends Component {
  /**
   * handleManage is called when "Manage" button is pressed.
   * // TODO: change to the edit mode
   */
  handleManage = () => {
  }
    /**
     * Renders the form (TextInputs and Button) for user interaction.
     * @returns {*}
     */
    render() {
        return (
          <View style={styles.upperRight}>
              <Button
                  title={"Manage"}
                  onPress={() => this.handleManage}
              />
          </View>
          // TODO: how to make the keys user input
          <View style={styles.container}>
            <FlatList
              data={[
                {key: 'Diet'},
                {key: 'Gym'},
                {key: 'Yoga'},
                {key: 'Geisel'},
                {key: 'Skincare'},
              ]}
              renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
          <View style={styles.bottomRight}>
              <Button
                  title={"+"}
                  onPress={() => this.props.navigation.navigate('CreateNewHabit')}
              />,
          </View>
        </View>
        //Navigation bar // TODO: not sure how this works
        <Navigator
          renderScene={(route, navigator) =>
            // ...
          }
          navigationBar={
            <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                { return (<Text>Social</Text>); },
              RightButton: (route, navigator, index, navState) =>
                { return (<Text>Habit</Text>); },
              Title: (route, navigator, index, navState) =>
                { return (<Text>Profile</Text>); },
            }}
            style={styles.container}
            />
          }
      />
        );
    }
}
// UI Design TODO
const styles = StyleSheet.create({
  navBar: {
    position: absolute,
    width: 375px,
    height: 78px,
    left: 0px,
    top: 589px,
    background: #C1D1AC
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomRight:{
      position: absolute,
      width: 30px,
      height: 47px,
      left: 310px,
      top: 521px
    },
    bottomRight:{
      position: absolute,
      width: 117px,
      height: 40px,
      left: 263px,
      top: -3px
    },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
