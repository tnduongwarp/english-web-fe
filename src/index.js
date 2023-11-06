import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from './uis/Login';
import Register from './uis/Register';
import ForgottenPassword from './uis/ForgottenPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    name: "",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/password",
    children: [
      {path:"reset", element: <ForgottenPassword />}
    ]
  }]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);