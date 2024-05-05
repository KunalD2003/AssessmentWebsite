
import { useState } from 'react'

import {AssessmentPage} from './index'
import './App.css'
import TestAutoSubmittedPage from './Components/Webcame/TestAutoSubmittedPage'

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
