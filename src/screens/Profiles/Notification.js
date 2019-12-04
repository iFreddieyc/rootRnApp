import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Button, DatePickerIOS, Alert, View} from 'react-native';
import {Notifications} from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {chosenDate: new Date()};
        // this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (Constants.isDevice && result.status === 'granted') {
                console.log('Notification permissions granted.')
            }else if (status !== 'granted') {
                alert('Sorry, we need notification permissions to make this work!');
            }else if (!Constants.isDevice){
                alert('Sorry, we need a real device (not a simulator) to make this work!');
            }
        }
    }

    setDate = (newDate) => {
        //console.log(newDate);
        this.setState({chosenDate: newDate});
        console.log(this.state.chosenDate);
    }

    _sendNotification = () => {
        const {chosenDate} = this.state;
        const localNotification = {
            title: 'Reminder from Root',
            body: 'Don\'t forget to complete your habit today?',
            ios: { // (optional) (object) — notification configuration specific to iOS.
                sound: true // (optional) (boolean) — if true, play a sound. Default: false.
            },
        }
        const schedulingOptions = {
            time: chosenDate, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            repeat: 'day'
        };

        console.log('Scheduling notification:', { localNotification, schedulingOptions })

        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
            .then(Alert.alert('Notification successfully scheduled.'))
            .catch(err => console.error(err));
    }

    /**
     * WHen the user clickes the submit button
     */
    handleSubmit = () => {
        // Cancel all previously scheduled notification first
        Notifications.cancelAllScheduledNotificationsAsync()
            .then(this._sendNotification)
            .catch((error)=>{console.log(error)});
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode="time"
                    style={styles.picker}
                />
                <View style={{backgroundColor: '#E0EBCB', width: '80%', borderRadius: 10, left: '10%'}}>
                    <Button
                        title={"Submit"}
                        style={styles.button}
                        color={"green"}
                        onPress={this.handleSubmit}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D4DBAD',
        flex: 1
    },
    picker: {
        backgroundColor: '#D4DBAD',
        paddingTop: "20%",
    },
    button: {
        paddingTop: "50%",
    }

});


