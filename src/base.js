/**
 * This file is for connecting to Firebase
 * @author Qingcheng You, Andy Duong
 * @since  11.17.2019
 */

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3fisAfTsTZh5yQrpTReyqx-U4fxj_Ki0",
    authDomain: "rootappcse110ntl.firebaseapp.com",
    databaseURL: "https://rootappcse110ntl.firebaseio.com",
    projectId: "rootappcse110ntl",
    storageBucket: "rootappcse110ntl.appspot.com",
    messagingSenderId: "135825060838",
    appId: "1:135825060838:web:6705d99215c5bbc19f1c27"
};

// Initialize firebase
const db = firebase.initializeApp(firebaseConfig);

export default db;
