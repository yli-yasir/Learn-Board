import * as firebase from "firebase/app";
import "firebase/firestore";

console.log('initializing DB')

firebase.initializeApp({
    apiKey: "AIzaSyAKJNomvhV9qMjMhwSragwhmn8-7HzfQJA",
    authDomain: "learnboard-yli.firebaseapp.com",
    databaseURL: "https://learnboard-yli.firebaseio.com",
    projectId: "learnboard-yli",
    storageBucket: "learnboard-yli.appspot.com",
    messagingSenderId: "922994250885",
    appId: "1:922994250885:web:0cdecb14b26b7679"
  });

  console.log('db initialized')
  
const db = firebase.firestore();

export default db;