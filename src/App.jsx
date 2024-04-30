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
        <Outlet />
      </div>
    </>
  )
}

export default App
