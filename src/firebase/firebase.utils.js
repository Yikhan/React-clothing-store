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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // snapShot is like the data set returned with informational properties
  const snapShot = await userRef.get();
  // create new user if not exits
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error when create user", error);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
