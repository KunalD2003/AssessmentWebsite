import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'
import React from 'react';
import { Outlet} from "react-router-dom";


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
