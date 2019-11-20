/**
 * This is the placeholder for the profile screen
 * @author Mufan Lei TODO
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import db from "../base";

export default class Profile extends Component {
    constructor(props){
      super(props);
      this.state = {
        username: "",
        email:"",
        phoneNumber:"",
        picurl:"",
      }
    }

    componentDidMount(){
      let promise = new Promise((resolve, reject) => {
        var id = db.auth().currentUser.uid;
        docRef = db.firestore().collection('users').doc(id);
        docRef.onSnapshot(function(doc) {
          if (doc.exists) {
            console.log(doc.data);
            resolve(doc.data());
          } else {
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      });

      promise.then((docData) => {
        this.setState({
          username: docData.userName,
          email: docData.email,
          phoneNumber: docData.phoneNumber
        })
      })
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
