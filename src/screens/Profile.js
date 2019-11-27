/**
 * This is the placeholder for the profile screen
 * @author Mufan Lei TODO
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import db from "../base";

export default class Profile extends Component {
    constructor(props){
        super(props);
        let id = db.auth().currentUser.uid;
        console.log(id);
        let docRef = db.firestore().collection('users').where("userId","==",id);
        this.ref = docRef
        this.state = {
            username: "",
            email:"",
            picurl:"",
        }
    }

    // componentDidMount() {
    //     console.log("CDM");
    //     let promise = new Promise((resolve, reject) => {
    //         var id = db.auth().currentUser.uid;
    //         docRef = db.firestore().collection('users').doc(id);
    //         docRef.onSnapshot(function (doc) {
    //             if (doc.exists) {
    //                 console.log(doc.data);
    //                 resolve(doc.data());
    //             } else {
    //                 console.log("No such document!");
    //             }
    //         }).catch(function (error) {
    //             console.log("Error getting document:", error);
    //         });
    //     })
    //     promise.then((docData) => {
    //         console.log("------")
    //         console.log(docData);
    //         console.log(docData());
    //         console.log("------")
    //         this.setState({
    //             username: docData.userName,
    //             email: docData.email,
    //             phoneNumber: docData.phoneNumber
    //         })
    //     })
    // }

    componentDidMount(){
        this.ref.onSnapshot(this.reloadProfile);
    }

    reloadProfile = (querySnapshot) =>{
        let data = null;
        querySnapshot.forEach(function (doc) {
            data = doc.data();
        });
        this.setState({
            username: data.userName,
            email:data.email,
            picurl:data.userPicUrl,
        });
    }


    handleSignOut = () =>{
        db.auth().signOut().then(
            () => this.props.navigation.navigate('Auth')
        )
    }



    render(){
        return(
            <View style={styles.container}>
                <Text>{this.state.username}</Text>
                <Text>{this.state.email}</Text>
                <Button
                    title={"EditProfile"}
                    onPress={()=> this.props.navigation.navigate("EditProfile")}
                />
                <Button
                    title={"Click me to sign out"}
                    onPress={this.handleSignOut}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});