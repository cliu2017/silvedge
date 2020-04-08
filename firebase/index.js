import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC7PRKrTu5ND_g4fnP-NPn740Z4idykn_Q",
    authDomain: "gogoosemax.firebaseapp.com",
    databaseURL: "https://gogoosemax.firebaseio.com",
    projectId: "gogoosemax",
    storageBucket: "gs://gogoosemax.appspot.com",
    messagingSenderId: "141485546537",
    appId: "1:141485546537:web:73cb6c2d4f09149e071038",
    measurementId: "G-4GS65VQ7W7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
