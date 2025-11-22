import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav(): JSX.Element {
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" &&
    (sessionStorage.getItem("injaz_token") ||
      localStorage.getItem("injaz_token"));

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem("injaz_token");
      sessionStorage.removeItem("injaz_user");
      localStorage.removeItem("injaz_token");
      localStorage.removeItem("injaz_user");
    } catch (e) {}
    navigate("/login", { replace: true });
  };

  return (
    <header className="site-header">
      <div className="container-wide nav-inner">
        <div className="brand">
          <div className="logo">IJ</div>
          <div className="title">
            <h1>Injaz</h1>
            <div className="subtitle">Exercises platform</div>
          </div>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </div>

        <div className="cta">
          {token ? (
            <>
              <Link to="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="btn btn-ghost">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-ghost">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-primary">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
