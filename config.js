import firebase from "firebase"
require("@firebase/firestore")

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAKgJ56GnJrsLxy2HLNdS1hDLYnAU78ihY",
    authDomain: "booksanta-51ac6.firebaseapp.com",
    projectId: "booksanta-51ac6",
    storageBucket: "booksanta-51ac6.appspot.com",
    messagingSenderId: "258254972531",
    appId: "1:258254972531:web:9dc7f301eb0d0755566c06"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore()