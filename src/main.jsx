import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import AddStudent from './pages/AddStudent.jsx';
import ManageStudent from './pages/ManageStudent.jsx';
import AddFee from './pages/AddFee.jsx';
import ManageFee from './pages/ManageFee.jsx';
import AddPayment from './pages/AddPayment.jsx';
import ManagePayment from './pages/ManagePayment.jsx';
import AddCourse from './pages/AddCourse.jsx';
import ManageCourse from './pages/ManageCourse.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children:[
      {
        path:"",
        element: <Home />
      },
      {
        path:"/addstudent",
        element: <AddStudent />
      },
      {
        path:"/managestudent",
        element: <ManageStudent />
      },
      {
        path:"/addfee",
        element: <AddFee />
      },
      {
        path:"/managefee",
        element: <ManageFee />
      },
      {
        path:"/addpayment",
        element: <AddPayment />
      },
      {
        path:"/managepayment",
        element: <ManagePayment />
      },
      {
        path:"/addcourse",
        element: <AddCourse />
      },
      {
        path:"/managecourse",
        element: <ManageCourse />
      },


    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
