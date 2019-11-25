import db from "../base";

// Retrieve Firebase Messaging object.
const messaging = db.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey("BBCsDk5-ASqiHjqHwcdWGL42VB7CluU_TS9KLNgg_mU1lZV2LWwI_dkLOShsR3dCMjG0CjcmYELS54MNfpxU7yU");

Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
    } else {
        console.log('Unable to get permission to notify.');
    }
});