import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props): JSX.Element {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("injaz_token") ||
        localStorage.getItem("injaz_token")
      : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
