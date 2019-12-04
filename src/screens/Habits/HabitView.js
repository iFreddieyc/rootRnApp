/**
 * This file renders the habit component onto habit page
 * @author Qiuling Chen, Qingcheng You
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
    Modal,
    SafeAreaView,
    TouchableHighlight,
    Alert,
} from 'react-native';

import {withNavigation} from 'react-navigation';
import util from "../../util";
import db from "../../base";

class HabitView extends Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
        this.ref = db.firestore().collection("users").doc(db.auth().currentUser.uid);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    handleOnPress = () => {
        this.setModalVisible(true);
    }

    handleEdit = () => {
        this.props.navigation.navigate('Edit', {text: this.props.id});
    }

    /**
     * EventHandler when the user click yes(checkoff)
     * Function should check if the latest checkoff date is at least one day earlier than current date.
     * If so, increment the numOfDays inside database and the latest field to the current date.
     * Otherwise, alert the user that they can only checkoff once a day.
     */
    handleYes = () => {
        const ref = this.ref;
        let docRef = db.firestore().collection("habits").doc(this.props.id)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let latest = doc.data().latest;
                let days = doc.data().numOfDays;
                if (latest === "" || util.getDifference(latest) > 1) {
                    docRef.update({
                        latest: util.getCurrentDate(),
                        numOfDays: days + 1
                    })
                        .then(() => {
                                console.log("Updated latest successful, current value is:" + util.getCurrentDate());
                                ref.update({
                                    // Weird fix but ok
                                    changed: Math.random() * (100 - 0) + 0,
                                }).then().catch((error) => {
                                    console.log("Error updating changed: " + error);
                                })
                            }
                        ).catch((error) => {
                        console.log("Error updating document" + error);
                    })
                } else {
                    Alert.alert(
                        'Alert',
                        'You can only checkoff once a day',
                        [
                            {text: 'OK', onPress: () => console.log("Ok Pressed")}
                        ],
                        {cancelable: false},
                    );
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    render() {
        return (
            <TouchableHighlight style={styles.container}
                                onPress={this.handleOnPress}
            >
                <View>
                    <Text style={styles.habitName}>
                        {this.props.name}
                    </Text>
                    <Text style={styles.habitDate}>
                        {"" + (this.props.numOfDays)}
                    </Text>
                    <View style={styles.editButton}>
                        <Button
                            style={{width: 50, height: 50}}
                            title={"..."}
                            onPress={this.handleEdit}
                        />
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <SafeAreaView style={styles.modalContent}>
                            <Button
                                title={"Back"}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            />
                            <Text>
                                {this.props.name}
                            </Text>
                            <Text>
                                {this.props.description}
                            </Text>
                            <Text>
                                Have you finished this habit today?
                            </Text>
                            <Button
                                title="Yes"
                                onPress={this.handleYes}
                            />
                            <Button
                                title="Not yet"
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            />
                        </SafeAreaView>
                    </Modal>
                </View>

            </TouchableHighlight>
        );

    }

}

export default withNavigation(HabitView);

const styles = StyleSheet.create({
    editButton: {
        //flex:1,
        //flexDirection:'row',
        position: 'absolute',
        right: 10,
        marginTop: 80,
    },
    container: {
        flex: 1,
        //alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
        width: 350,
        height: 120,
        //padding: 100,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: '#d6d7da',
        backgroundColor: '#E0EBCB'
    },
    habitName: {
        fontSize: 30,
        color: 'pink',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        top: '10%',
        left: 10
    },
    habitDate: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Cochin',
        top: '30%',
        left: 10
    },
    modalContent: {
        marginTop: 300,
        marginLeft: 50,
        marginRight: 50,
        height: 300,
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    }
});