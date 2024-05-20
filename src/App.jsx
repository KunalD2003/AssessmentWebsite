import { useState } from 'react';
import './App.css';
import Admin_Dashboard from './Pages/Admin_Dashboard/Admin_Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Admin_Dashboard></Admin_Dashboard>
      <ToastContainer
        theme="colored"
        />
    </>
  )
}

export default App
