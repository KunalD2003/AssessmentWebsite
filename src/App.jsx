import { useState } from 'react'
import { Outlet, Route, Routes } from "react-router-dom";


import { AssessmentPage } from './index'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import './App.css'
import firebase from "./firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
