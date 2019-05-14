import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdJOm80VBF1FWX8FF38GTsCIFoKhwHqh8",
    authDomain: "baza-001.firebaseapp.com",
    databaseURL: "https://baza-001.firebaseio.com",
    projectId: "baza-001",
    storageBucket: "baza-001.appspot.com",
    messagingSenderId: "700605537672"
  };

  
  firebase.initializeApp(config);

  firebase.firestore();


export default firebase;



