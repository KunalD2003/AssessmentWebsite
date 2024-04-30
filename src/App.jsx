import { useState } from 'react'
import { Route, Routes, Outlet } from "react-router-dom";

import {AssessmentPage} from './index'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
<<<<<<< HEAD
        <Outlet />
=======
        <AssessmentPage />
        {/* <Login/> */}
>>>>>>> ace1c47bd52f24af3ee2f640682a1edca89a4407
      </div>
    </>
  )
}

export default App
