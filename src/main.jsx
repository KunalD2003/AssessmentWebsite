import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store/store.js';
import TermsandCondition from './Pages/TermsandCondition/TermsandCondition.jsx'
import AssessmentPage from './Pages/AssessmentPage/AssessmentPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<AssessmentPage />} />
      <Route path='/termsandcondition' element={<TermsandCondition />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
