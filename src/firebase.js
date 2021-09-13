import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyC5EHLFbjdBF8I-OZwRkp4zlZLLV3AJWqg",
    authDomain: "logify-f2286.firebaseapp.com",
    projectId: "logify-f2286",
    storageBucket: "logify-f2286.appspot.com",
    messagingSenderId: "679521800946",
    appId: "1:679521800946:web:f90e3a7e50d234416a766b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();

  export {auth, provider, db}