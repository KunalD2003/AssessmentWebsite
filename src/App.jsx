import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AssessmentPage} from './index'
import './App.css'
import { Outlet } from 'react-router'

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
