import { Example } from "pages/Example";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Admin from "pages/admin/Admin";
import Login from "pages/auth/Login/Login";
import Signup from "pages/auth/Signup/Signup";
import PublicRoute from "authRoutes/PublicRoute";
import PrivateRoute from "authRoutes/PrivateRoute";
import Dashboard from "pages/dashboard/Dashboard";
import { ProfileProvider } from "context/profile.context";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </CookiesProvider>
  </React.StrictMode>
);
