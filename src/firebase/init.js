import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection, doc, setDoc,
    serverTimestamp, getDoc, getDocs,
    updateDoc, addDoc, where, query
} from "firebase/firestore";
import {
    getAuth, GoogleAuthProvider, isSignInWithEmailLink,
    signInWithEmailLink, signInWithPopup,
    signOut, onAuthStateChanged, sendSignInLinkToEmail
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
const auth = getAuth()

export {
    db, auth, GoogleAuthProvider,
    serverTimestamp, isSignInWithEmailLink,
    signInWithEmailLink, signInWithPopup, signOut,
    onAuthStateChanged, sendSignInLinkToEmail,

    collection, doc, setDoc, getDoc, updateDoc, addDoc, getDocs,

    where, query,
}

export default db
