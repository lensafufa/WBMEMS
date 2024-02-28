// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration, replace it with your project keys
const firebaseConfig = {
    apiKey: "AIzaSyCL1LBuAJSJTtX3dG9GVTUVgvQV2HM1510",
    authDomain: "auth-d3dfa.firebaseapp.com",
    projectId: "auth-d3dfa",
    storageBucket: "auth-d3dfa.appspot.com",
    messagingSenderId: "915911285797",
    appId: "1:915911285797:web:f412362a159d78991973cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);