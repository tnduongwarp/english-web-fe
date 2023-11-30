import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Login from './uis/Login';
import Register from './uis/Register';
import ForgottenPassword from './uis/ForgottenPassword';
import Dashboard from './uis/Dashboard';
import Category from './uis/Category';

const router = createBrowserRouter(
  [
    { path: "/login", element: <Login />, index: true },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/category", element: <Category /> },
    {
      path: "/password",
      children: [
        { path: "reset", element: <ForgottenPassword /> }
      ]
    },
    { path: "*", element: <Navigate to="/login" /> }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);