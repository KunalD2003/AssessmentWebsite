import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store/store.js';
import { AssessmentPage, TermsandCondition, WebcamCapture, Login, Register } from './import.js'
import { AssessmentMCQ, TestAutoSubmittedPage } from './Components/index.js'
import Dashboard from './Pages/Candidate_Dashboard/Dashbored/Dashboard.jsx';
import Hero_section from './Pages/Candidate_Dashboard/Dashbored/Hero_section.jsx';
import ArchievedExams from './Pages/ArchievedExams/ArchievedExams.jsx';
import Support from './Pages/Support/Support.jsx';
import User from './Pages/User/User.jsx';
import ResultPage from './Pages/ResultPage/ResultPage.jsx';
import AuthLayout from './Components/AuthLayout/AuthLayout.jsx';
import AssessmentLayout from './Components/AssessmentLayout/AssessmentLayout.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/register',
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        )
      },
      {
        path: '/userid',
        element: <Dashboard authentication />,
        children: [
          {
            path: '/userid/assessments',
            element: (
              <AuthLayout authentication>
                <Hero_section />
              </AuthLayout>
            )
          },
          {
            path: '/userid/archivedexams',
            element: (
              <AuthLayout authentication>
                <ArchievedExams />
              </AuthLayout>
            )
          },
          {
            path: '/userid/support',
            element: (
              <AuthLayout authentication>
                <Support />
              </AuthLayout>
            )
          },
          {
            path: '/userid/profile',
            element: (
              <AuthLayout authentication>
                <User />
              </AuthLayout>
            )
          },
        ]
      },
      {
        path: '/:assessmentid/termsandcondition',
        element: (
          <AuthLayout authentication>
            <TermsandCondition />
          </AuthLayout>
        ),
      },
      {
        path: '/:assessmentid/scanfaceid',
        element: (
          <AuthLayout authentication>
            <WebcamCapture />
          </AuthLayout>
        ),
      },
      {
        path: '/:assessmentid/assessment',
        element: (
          <AuthLayout authentication>
            <AssessmentLayout assessment>
              <AssessmentPage />
            </AssessmentLayout>
          </AuthLayout>
        ),
      },

      {
        path: '/:assessmentid/guidlinesvoilated',
        element: (
          <AuthLayout authentication>
            <AssessmentLayout assessment = {false}>
              <TestAutoSubmittedPage/>
            </AssessmentLayout>
          </AuthLayout>
        ),
      },
      {
        path: '/:assessmentid/result',
        element: (
          <AuthLayout authentication>
            <AssessmentLayout assessment = {false}>
              <ResultPage />
            </AssessmentLayout>
          </AuthLayout>
        ),
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
