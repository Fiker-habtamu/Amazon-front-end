import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR07vj8GOg8jdMqspYJsGOoCFAK57d5e8",
  authDomain: "clone-fiker.firebaseapp.com",
  projectId: "clone-fiker",
  storageBucket: "clone-fiker.appspot.com",
  messagingSenderId: "1470593114",
  appId: "1:1470593114:web:d478ce3576f6fcada7c063",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db = app.firestore();
