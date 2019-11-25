/**
 * This is the Profile screen class file.
 * @author Mufan Lei TODO
 * @since 11.8.2019
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, SafeAreaView, View, TextInput, Button, Text, Alert, Camera} from 'react-native';
import db from "../base";
 import * as firebase from 'firebase/app';
 import * as ImagePicker from 'react-native-image-picker';


export default class EditProfile extends Component {

   /**
     * Constructor for class SignUp
     * @param props properties to initialize this class with
     */
    constructor(props) {
        super(props);
        this.state = {name: '', password: '', filePath: ''};
    }



    /**
     * Handles text input
     * @param key the state to be changed
     * @param val the value to set the state with
     */
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }


    /*handleChoosePhoto = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          this.setState({ filePath: response });
        }
      });
    };


    componentDidMount() {
       this.getPermissionAsync();
       console.log('hi');
     }

     getPermissionAsync = async () => {
       if (Constants.platform.ios) {
         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
         if (status !== 'granted') {
           alert('Sorry, we need camera roll permissions to make this work!');
         }
         else{
           console.log("got permission");
         }
       }
     }*/










    saveProfile = () => {
      const {name, password, filePath} = this.state;
      var userRef = db.firestore().collection('users').doc(db.auth().currentUser.uid);
      userRef.update({
        userName: name
      });
      this.props.navigation.navigate('Profile');
    }

  render() {
    return (
            <View style={styles.container}>
                <Text>Name:</Text>
                <TextInput style={styles.input}
                           placeholder="Name"
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('name', val)}
                />
                <Button
                    title={"Save Change"}
                    onPress={this.saveProfile}

                />
                <Button
                    title={"Upload Picture"}
                    onPress={(e)=>{
                      //var file = e.target.files[0];
                      //var filePath = 'pics/'+file.name;
                      this.handleChoosePhoto();
                      var filePath = this.state.filePath;
                      var storageRef = firebase.storage().ref(filePath);
                      var task = storageRef.put(file);
                      var usersRef = db.firestore().collection('users');
                      var userRef = usersRef.where('userid', '==', db.auth().currentUser.uid);
                      userRef.update({userPicUrl:filePath});
                      }}
                />
                <TextInput style={styles.input}
                           placeholder="New Password"
                           secureTextEntry={true}
                           autoCapitalize={"none"}
                           onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title={"Save New Password"}
                    onPress={(e)=>{
                      const {name, password, filePath} = this.state;
                      console.log(password);
                      firebase.auth().currentUser.updatePassword(password);
                      this.props.navigation.navigate('Profile');
                      }}
                />
                <Camera  ref={cam => {this.camera = cam}}  style={styles.preview}  aspect={Camera.constants.Aspect.fill}>  <Text style={styles.capture} onPress={this.takePicture.bind(this)}>    [CAPTURE]  </Text></Camera>

            </View>
        );
  }

}

// UI Design TODO
const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
