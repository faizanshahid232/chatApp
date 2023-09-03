import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from "./Dashboard"
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import Login from './Login';
import ProtectedRoute from "./routes/protectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <div>
          <App />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
          <Dashboard />
      </ProtectedRoute>
    ),
  },
]);


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

/*<BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<Login />} />
    </Routes>
</BrowserRouter>*/
  

reportWebVitals();
