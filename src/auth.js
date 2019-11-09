import db from "./base";

export const user = db.auth().currentUser;

export var isSignedIn;

db.auth().onAuthStateChanged(function(user) {
    if (user) {
        isSignedIn = true;
    } else {
        isSignedIn = false;
    }
});

