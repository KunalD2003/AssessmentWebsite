import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
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
