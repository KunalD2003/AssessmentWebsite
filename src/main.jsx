import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store/store.js';
import {AssessmentPage,TermsandCondition,WebcamCapture} from './index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<TermsandCondition />} />
      <Route path='/scanfaceid' element={<WebcamCapture />} />
      <Route path='/assessment' element={<AssessmentPage />} />
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
