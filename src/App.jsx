import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Login from './uis/Login/Login';
import Register from './uis/Register';
import ForgottenPassword from './uis/forgot-password/index';
import Dashboard from './uis/Dashboard';
import Category from './uis/Category/Category';
import VocabularyLesson from './uis/learning-word/vocabulary-lesson';


import { useState } from 'react';
import DashboardForAdmin from './uis/admin/Dashboard';

  function App(){
    const [categoryId, setCategoryId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const router = createBrowserRouter(
        [
          { path: "/login", element: <Login />, index: true },
          { path: "/register", element: <Register /> },
          { path: "/dashboard/*", element: <Dashboard categoryId={categoryId} courseId={courseId} setCourseId={setCourseId}/> },
          { path: "/vocabulary", element: <VocabularyLesson /> },
          {
            path: "/password",
            children: [
              { path: "reset", element: <ForgottenPassword /> }
            ]
          },
          { path: "/category", element: <Category setCategoryid={setCategoryId}/> },
          { path: "/admin/*", element: <DashboardForAdmin></DashboardForAdmin>},
          { path:"*", element: <Navigate to="/login" />}
          
        ]);
    return (
        <RouterProvider router={router} />
    )
  }
  export default App;