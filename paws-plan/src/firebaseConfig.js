import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCzZ5k5GSr9IklJl0zDM1yMH8sxfCeQklI",
    authDomain: "pawsplan-f6073.firebaseapp.com",
    projectId: "pawsplan-f6073",
    storageBucket: "pawsplan-f6073.appspot.com",
    messagingSenderId: "669654788227",
    appId: "1:669654788227:web:768acd41cd3783261c13b6",
    measurementId: "G-JF8Q71ZNXF"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
