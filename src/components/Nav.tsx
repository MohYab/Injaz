import React, { JSX } from "react";
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
      <div className="container-max flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="brand-badge">IJ</div>
          <div>
            <h1 className="text-lg font-semibold text-brand">Injaz</h1>
            <p className="text-sm muted">Exercises platform</p>
          </div>
        </div>

        <nav className="site-nav">
          <a className="text-slate-600 hover:text-brand" href="#lessons">
            Lessons
          </a>
          <a className="text-slate-600 hover:text-brand" href="#features">
            Features
          </a>

          {token ? (
            <>
              <Link to="/dashboard" className="btn-primary ml-4">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="btn-ghost ml-2">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-accent ml-4"
                id="injaz-login-btn"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="btn-ghost ml-2"
                id="injaz-signup-btn"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
