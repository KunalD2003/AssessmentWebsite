
import { useState } from 'react'
import './App.css'
import TestAutoSubmittedPage from './Components/Webcame/TestAutoSubmittedPage'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'
import Dashboard from './Pages/Candidate_Dashboard/Dashbored/Dashboard';
import React from 'react';
import WebScanning from './Pages/WebScanning/WebcamCapture';
import { Outlet, Route, Routes } from "react-router-dom";


import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import firebase from "./firebase";
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from 'react-toastify';

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);

    // ...
  } else {
    // User is signed out
    // ...
  }
});


function App() {
  return (
    <div className="App">
        <Outlet />
        <ToastContainer
        theme="colored"
        />
      </div>
  )
}

export default App;
