import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store/store.js';
import {AssessmentPage,TermsandCondition,WebcamCapture, Login, Register } from './index.js'
import {AssessmentMCQ, TestAutoSubmittedPage} from './Components/index.js'
import Dashboard from './Pages/Candidate_Dashboard/Dashbored/Dashboard.jsx';
import Hero_section from './Pages/Candidate_Dashboard/Dashbored/Hero_section.jsx';
import ArchievedExams from './Pages/ArchievedExams/ArchievedExams.jsx';
import Support from './Pages/Support/Support.jsx';
import User from './Pages/User/User.jsx';
import ResultPage from './Pages/ResultPage/ResultPage.jsx';


const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/userid',
        element: <Dashboard />,
        children: [
          {
            path: '/userid/assessments',
            element: <Hero_section />
          },
          {
            path: '/userid/archivedexams',
            element: <ArchievedExams />
          },
          {
            path: '/userid/support',
            element: <Support />
          },
          {
            path: '/userid/profile',
            element: <User />
          },
        ]
      },
      {
        path: '/:assessmentid/termsandcondition',
        element: <TermsandCondition/>,
      },
      {
        path: '/:assessmentid/scanfaceid',
        element: <WebcamCapture/>,
      },
      {
        path: '/:assessmentid/assessment',
        element: <AssessmentPage/>,
      },
      
      {
        path: '/:assessmentid/guidlinesvoilated',
        element: <TestAutoSubmittedPage/>,
      },
      {
        path: '/:assessmentid/result',
        element: <ResultPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
