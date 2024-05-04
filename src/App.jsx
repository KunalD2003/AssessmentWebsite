
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AssessmentPage} from './index'
import './App.css'
import { Outlet } from 'react-router'

import React from 'react';
;
import WebScanning from './Pages/WebScanning/WebcamCapture';



function App() {
  return (
    <div className="App">
        <Outlet />
      </div>
  )
}

export default App;
