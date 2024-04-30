import { useState } from 'react'
import { Route, Routes } from "react-router-dom";

import {AssessmentPage} from './index'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Routes>
      <Route path="/" elemment={<Login/>}/>
      <Route path="/register" elemment={<Register/>}/>
      <Route path="/assessment" elemment={<AssessmentPage/>}/>
    </Routes>
      <div>
        <AssessmentPage />
      </div>
    </>
  )
}

export default App
