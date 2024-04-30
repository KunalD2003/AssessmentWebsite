import { useState } from 'react'
import { Route, Routes, Outlet } from "react-router-dom";


import {AssessmentPage} from './index'
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
<<<<<<< HEAD

<Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/assessment' element={<AssessmentPage/>}/>
      </Routes>
      <div>
        {/* <AssessmentPage /> */}
        <Login/>
=======
      <div>
<<<<<<< HEAD
        <Outlet />
=======
        <AssessmentPage />
        {/* <Login/> */}
>>>>>>> ace1c47bd52f24af3ee2f640682a1edca89a4407
>>>>>>> refs/remotes/origin/Authentication
      </div>
    </>
  )
}

export default App
