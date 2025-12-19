import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props): JSX.Element {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
