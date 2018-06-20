import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD9x3ecmctrxTEq9R8lxi4tfnhhbMTbYHY",
    authDomain: "ufm-treasurehunt.firebaseapp.com",
    databaseURL: "https://ufm-treasurehunt.firebaseio.com",
    projectId: "ufm-treasurehunt",
    storageBucket: "ufm-treasurehunt.appspot.com",
    messagingSenderId: "1091186750130"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase
