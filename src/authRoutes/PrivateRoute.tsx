import React from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../context/profile.context";

function PrivateRoute({ children }) {
  const { isLoading, profile } = useProfile();

  if (isLoading && !profile) {
    return <h2>Loading... {JSON.stringify({ isLoading, profile })}</h2>;
  }
  return !profile && !isLoading ? <Navigate to="/login" /> : children;
}

export default PrivateRoute;
