import { useProfile } from "context/profile.context";
import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { isLoading, profile } = useProfile();

  if (isLoading && !profile) {
    return <h2>Loading... {JSON.stringify({ isLoading, profile })}</h2>;
  }

  //   if profile is null then redirect to children i.e. signin page,
  //   else navigate to home i.e. "/"
  return profile && !isLoading ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute;
