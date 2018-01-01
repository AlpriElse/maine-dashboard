import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC3CRn_9PMJ8O_pKZj5VpU2EFqpArkZ8zc",
    authDomain: "maine-dashboard.firebaseapp.com",
    databaseURL: "https://maine-dashboard.firebaseio.com",
    projectId: "maine-dashboard",
    storageBucket: "maine-dashboard.appspot.com",
    messagingSenderId: "923338764388"
  };
firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
