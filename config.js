import firebase from "firebase"
require("@firebase/firestore")

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAopnTZJQxv_OQ25rMiPojEjAfYyGYB0fw",
  authDomain: "booksanta-de8d4.firebaseapp.com",
  projectId: "booksanta-de8d4",
  storageBucket: "booksanta-de8d4.appspot.com",
  messagingSenderId: "230141587911",
  appId: "1:230141587911:web:08e9f8c58afc796b14a9e2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase.firestore()