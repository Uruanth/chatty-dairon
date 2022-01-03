import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";



const config = {
    apiKey: "AIzaSyAfmpZK-7ygJLvtpikGqfxufgtHbfiSavo",
    authDomain: "chatty-dairon.firebaseapp.com",
    projectId: "chatty-dairon",
    storageBucket: "chatty-dairon.appspot.com",
    messagingSenderId: "1054160047634",
    appId: "1:1054160047634:web:999f1fa0b83dfa8395d2cb",
    measurementId: "G-3PNFY3P7ST"
}

const firebaseApp = firebase.initializeApp(config);

// Use these for db & auth
const db = getDatabase(firebaseApp);
const auth = firebase.auth();

export { auth, db };

