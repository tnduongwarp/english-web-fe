import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Login from './uis/Login/Login';
import Register from './uis/Register';
import ForgottenPassword from './uis/ForgottenPassword';
import Dashboard from './uis/Dashboard';
import Category from './uis/Category/Category';
import VocabularyLesson from './uis/learning-word/vocabulary-lesson';
import Quiz from './uis/Quiz/Quiz';
const router = createBrowserRouter(
  [
    { path: "/login", element: <Login />, index: true },
    { path: "/register", element: <Register /> },
    { path: "/dashboard/*", element: <Dashboard /> },
    { path: "/vocabulary", element: <VocabularyLesson /> },
    { path: "quiz/:id", element: <Quiz/>},
    {
      path: "/password",
      children: [
        { path: "reset", element: <ForgottenPassword /> }
      ]
    },
    { path: "/category", element: <Category /> },
    
    { path:"*", element: <Navigate to="/login" />}
    
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);