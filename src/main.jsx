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

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Dashboard />}>
//       <Route path='' element={<Hero_section />} />
//       <Route path='/archivedexams' element={<ArchievedExams />} />
//       <Route path='/support' element={<Support />} />
//       <Route path='/user' element={<User />} />
//     </Route>
//   )
// )
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { AssessmentPage, Login, Register } from './index.js'


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
        path: '/assessment',
        element: <AssessmentPage />
      }
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
