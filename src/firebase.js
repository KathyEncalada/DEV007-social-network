// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRbJ35XGhiwu6tRquUVMMGxN6uCNanApw',
  authDomain: 'happy-pets-93463.firebaseapp.com',
  projectId: 'happy-pets-93463',
  storageBucket: 'happy-pets-93463.appspot.com',
  messagingSenderId: '24535562640',
  appId: '1:24535562640:web:3aa427bb91028424e49b15'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
