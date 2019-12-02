import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Button, DatePickerIOS, Text} from 'react-native';
import { Notifications }from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {chosenDate: new Date()};
        this.setDate = this.setDate.bind(this);
    }

    async componentDidMount() {
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }
    }

    setDate(newDate) {
        Notifications.cancelAllScheduledNotificationsAsync();

        console.log(newDate);
        this.setState({chosenDate: newDate});
        console.log(this.state.chosenDate);
        const schedulingOptions = {
            time: this.state.chosenDate, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            repeat: 'day'
        };

        const localNotification = {
            title: 'Reminder from Root',
            body: 'Did you complete your habit today?', // (string) — body text of the notification.
            ios: { // (optional) (object) — notification configuration specific to iOS.
                sound: true // (optional) (boolean) — if true, play a sound. Default: false.
            },
            android: // (optional) (object) — notification configuration specific to Android.
                {
                    sound: false, // (optional) (boolean) — if true, play a sound. Default: false.
                    //icon (optional) (string) — URL of icon to display in notification drawer.
                    //color (optional) (string) — color of the notification icon in notification drawer.
                    priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
                    sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
                    vibrate: false // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
                    // link (optional) (string) — external link to open when notification is selected.
                }
        };

        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }

    handleSubmit = () => {
        const{navigate} = this.props.navigation;
        navigate('Profile');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Set a daily reminder
                </Text>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode="time"
                    style={styles.picker}
                />
                <Button
                    title={"Submit"}
                    style={styles.button}
                    onPress={this.handleSubmit}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D4DBAD',
        flex:1
    },
    picker:{
        backgroundColor: '#D4DBAD',
        paddingTop:  "20%",
    },
    title: {
        fontSize: 35,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        justifyContent: 'center',
        paddingLeft: "5%",
        paddingRight: "5%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    button: {
        paddingTop: "50%",
    }
});


