import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyAwleexWMVvIg7ytCBdehHJESQV-vyicCk",
  authDomain: "crown-shop-907ed.firebaseapp.com",
  databaseURL: "https://crown-shop-907ed.firebaseio.com",
  projectId: "crown-shop-907ed",
  storageBucket: "crown-shop-907ed.appspot.com",
  messagingSenderId: "1069948568116",
  appId: "1:1069948568116:web:a67635af33c389922e0061",
  measurementId: "G-TMGHHPPZQZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
