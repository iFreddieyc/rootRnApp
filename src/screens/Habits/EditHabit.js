/**
 * This is the CreateNewHabit class file.
 * @author Qingcheng You
 * @since 11.24.2019
 */
import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, Alert, SafeAreaView, Switch, ActivityIndicator} from 'react-native';
import db from "../../base";

export default class EditHabit extends Component {
    constructor(props) {
        super(props)
        this.id = JSON.stringify(this.props.navigation.getParam('text'));
        this.id = this.id.substring(1, this.id.length-1);
        console.log(this.id);
        this.ref = db.firestore().collection("habits").doc(this.id);
        this.state = {
            isLoading: true,
            name: "",
            description: "",
            startDate: "",
            visible: "",
        }
    }


    componentDidMount() {
        this.getHabitFromDocId().then((data) => {
            this.setState({
                isLoading: false,
                name: data.name,
                description: data.description,
                startDate: data.startDate,
                visible: data.visible,
            })
        }).catch(function (error) {
            this.goBack();
            console.log("Something went wrong: ", error);
        });
    }

    goBack = () => {
        this.props.navigation.navigate('Habits');
    }

    getHabitFromDocId = () => {
        return new Promise((resolve, reject) => {
            this.ref.get()
                .then(function (doc) {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        resolve(doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        reject(true);
                    }
                }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        });

    }

    toggleSwitch = (value) => {
        this.setState({visible: value});
    }

    handleConfirm = () => {
        this.ref.update({
            visible: this.state.visible,
        }).then(() => this.props.navigation.navigate('Habits')
        ).catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    handleCancel = () => {
        this.goBack();
    }

    handleArchive = () => {
        const {navigate} = this.props.navigation;
        Alert.alert(
            'Alert',
            "Archived habit will made inactive but still show up in your formed habit section. \n There is no way to undo this. Are you sure?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'I am sure', onPress: () => {
                    console.log('OK Pressed');
                        this.ref.update({
                            archived: true,
                        }).then(() => navigate('Habits')).catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }},
            ],
            {cancelable: true}
        );
    }

    handleDelete = () => {
        const {navigate} = this.props.navigation;
        Alert.alert(
            'Alert',
            "This will delete a habit permanently, are you sure?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'I am sure', onPress: () => {
                        console.log('OK Pressed');
                        this.ref.delete().then(function() {
                            console.log("Document successfully deleted!");
                            Alert.alert(
                                'Success',
                                "Habit successfully deleted",
                                [{
                                    text: 'Ok', onPress:() => navigate('Habits')
                                }],
                                {cancelable: true}
                            );
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    }},
            ],
            {cancelable: true}
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.habitName}>{this.state.name}</Text>
                    <Text>  </Text>
                    <View style={{top:'10%', alignItems: 'center'}}>
                        <Text>{this.state.description}</Text>
                        <Text>  </Text>
                        <Text> started since {this.state.startDate}</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text>  </Text>
                <Switch onValueChange={this.toggleSwitch}
                        value={this.state.visible}
                />
                <Button
                    title={"Confirm"}
                    onPress={this.handleConfirm}
                />
                <Button
                    title={"Cancel"}
                    onPress={this.handleCancel}
                />
                <Button
                    title={"Archive"}
                    onPress={this.handleArchive}
                />
                <Button
                    title={"Delete"}
                    onPress={this.handleDelete}
                />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    top:{
        position: 'absolute',
        top: 120,
        alignItems: 'center',
        fontFamily: 'Cochin',
        backgroundColor: '#E0EBCB',
        height: '70%',
        width: '80%',
        flex: 1
    },
    bottom:{
        alignItems: 'center',
        position: 'absolute',
        bottom: 180
    },
    habitName: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        left: 10,
        top: 30
    },
    input: {
        width: 200,
        height: 30,
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4DBAD'
    },
    littleContainer: {
        height: '50%',
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0EBCB'
    }
});