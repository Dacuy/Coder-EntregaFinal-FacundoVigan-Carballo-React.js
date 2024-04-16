import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCmuXe-X6tbK_2ZeVnnHUGhCiZjTXwFuJo",
  authDomain: "ecommerce-entregafinal.firebaseapp.com",
  projectId: "ecommerce-entregafinal",
  storageBucket: "ecommerce-entregafinal.appspot.com",
  messagingSenderId: "427742890208",
  appId: "1:427742890208:web:5a119d25d99761ceede885"
};

console.log({ firebaseConfig })

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
