import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {createBrowserRouter,RouterProvider, Route, createRoutesFromElements} from 'react-router-dom'
import Dashboard from './Pages/Candidate_Dashboard/Dashbored/Dashboard.jsx';
import Hero_section from './Pages/Candidate_Dashboard/Dashbored/Hero_section.jsx';
import ArchievedExams from './Pages/ArchievedExams/ArchievedExams.jsx';
import Support from './Pages/Support/Support.jsx';
import User from './Pages/User/User.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Dashboard />}>
      <Route path='' element={<Hero_section />} />
      <Route path='/archivedexams' element={<ArchievedExams />} />
      <Route path='/support' element={<Support />} />
      <Route path='/user' element={<User />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)



