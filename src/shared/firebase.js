import firebase from "firebase/app";
import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyB1rzBUSDny_9mM7mSyTw9DOwbUcpxp2F4",
    authDomain: "react-simhwa-be385.firebaseapp.com",
    projectId: "react-simhwa-be385",
    storageBucket: "react-simhwa-be385.appspot.com",
    messagingSenderId: "290760389474",
    appId: "1:290760389474:web:49c146997f950b2cb5723b",
    measurementId: "G-3ZKE58VEYF"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();


export{auth, apiKey};