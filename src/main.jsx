import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Admin_Dashboard from './Pages/Admin_Dashboard/Admin_Dashboard.jsx'
import Hero from './Pages/Admin_Dashboard/Hero.jsx'
import UserData from './Pages/UserData/UserData.jsx'
import ScheduleExam from './Pages/ScheduleExam/ScheduleExam.jsx'
import QuestionBank from './Pages/QuestionBank/QuestionBank.jsx'
import ShowQuestions from './Pages/QuestionBank/ShowQuestions/ShowQuestions.jsx'
import Admin from './Pages/Admin/Admin.jsx'
<<<<<<< HEAD
import { SupportDesk } from './Pages/supportDesk/SupportDesk.jsx'
=======
import CodingProblems from './Pages/QuestionBank/CodingProblems/CodingProblems.jsx'
>>>>>>> 5746691 (Coading Question API commit)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Admin_Dashboard />}>
      <Route path='' element={<Hero />} />
      <Route path='/userdata' element={<UserData />} />
      <Route path='/scheduleexam' element={<ScheduleExam />} />
      <Route path='/questionbank' element={<QuestionBank />} />
      <Route path='/questionbank/showquestions/:sectionID' element={<ShowQuestions />} />
      <Route path='/questionbank/CodingProblems/:sectionID' element={<CodingProblems/>} />
      {/* <Route path='/questionbank/questinData/:sectionID' element={<CodingProblems/>} /> */}
      <Route path='/admin' element={<Admin />} />
      <Route path='/supportDesk' element={<SupportDesk />} />

      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
