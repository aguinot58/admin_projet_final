import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyCUdlxy1aznOB66jibvaZAdma7BK28lRW8",
  authDomain: "projet-final-5ee16.firebaseapp.com",
  projectId: "projet-final-5ee16",
  storageBucket: "projet-final-5ee16.appspot.com",
  messagingSenderId: "265741752262",
  appId: "1:265741752262:web:aa84ee5ca70c2c1201c4c7"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export {
    db,
    auth
}