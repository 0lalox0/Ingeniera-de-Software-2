import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

//Codigo Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSvOY3OQxoKZ2F2R2hCvlwEYSM66oL8fw",
  authDomain: "ing2-e821f.firebaseapp.com",
  projectId: "ing2-e821f",
  storageBucket: "ing2-e821f.appspot.com",
  messagingSenderId: "132789045631",
  appId: "1:132789045631:web:9a27776d872d9803c2324a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

)