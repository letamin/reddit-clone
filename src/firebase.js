import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDB8SMnOMVvfHb6R3L123gswpuez6C7rw8",
    authDomain: "reddit-clone-7280b.firebaseapp.com",
    databaseURL: "https://reddit-clone-7280b.firebaseio.com",
    projectId: "reddit-clone-7280b",
    storageBucket: "reddit-clone-7280b.appspot.com",
    messagingSenderId: "1070996258073",
    appId: "1:1070996258073:web:3d54cf4cf2dfe25b385988"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;