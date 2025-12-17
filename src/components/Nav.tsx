import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("injaz_token") ||
        localStorage.getItem("injaz_token")
      : null;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem("injaz_token");
      sessionStorage.removeItem("injaz_user");
      localStorage.removeItem("injaz_token");
      localStorage.removeItem("injaz_user");
    } catch (e) {}
    navigate("/login", { replace: true });
  };

  // Lock scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onNavigateClose = () => setOpen(false);

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

        {/* Desktop links */}
        <div className="nav-links hide-mobile" aria-hidden={open}>
          <Link to="/about">{t("nav.about")}</Link>
          <a href="#goals">{t("nav.goals")}</a>
          <a href="#features">{t("nav.features")}</a>
          <a href="#pricing">{t("nav.pricing")}</a>
          <Link to="/contact">{t("nav.contact")}</Link>
          <a href="#download">{t("nav.download")}</a>
        </div>

        <div className="cta hide-mobile">
          <LanguageSwitcher />
          {token ? (
            <>
              <Link to="/exercises" className="btn btn-ghost">
                {t("nav.exercises")}
              </Link>
              <Link to="/dashboard" className="btn btn-primary">
                {t("nav.dashboard")}
              </Link>
              <button onClick={handleSignOut} className="btn btn-ghost">
                {t("nav.signout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-ghost">
                {t("nav.signup")}
              </Link>
              <Link to="/login" className="btn btn-primary">
                {t("nav.signin")}
              </Link>
            </>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <div className="only-mobile" aria-hidden={false}>
          <button
            ref={btnRef}
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? (
              // Close (X) icon
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Menu icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Backdrop */}
        <div
          className={`mobile-backdrop ${open ? "open" : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />

        {/* Mobile off-canvas menu (slide in from right) */}
        <aside
          id="mobile-menu"
          ref={menuRef}
          className={`mobile-menu ${open ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          <nav className="mobile-menu-inner" aria-label="Mobile">
            <div className="mobile-links">
              <Link to="/about" onClick={onNavigateClose}>
                {t("nav.about")}
              </Link>
              <a href="#goals" onClick={onNavigateClose}>
                {t("nav.goals")}
              </a>
              <a href="#features" onClick={onNavigateClose}>
                {t("nav.features")}
              </a>
              <a href="#pricing" onClick={onNavigateClose}>
                {t("nav.pricing")}
              </a>
              <Link to="/contact" onClick={onNavigateClose}>
                {t("nav.contact")}
              </Link>
              <a href="#download" onClick={onNavigateClose}>
                {t("nav.download")}
              </a>
            </div>

            <div className="mobile-cta">
              <div style={{ marginBottom: 8 }}>
                <LanguageSwitcher />
              </div>
              {token ? (
                <>
                  <Link
                    to="/exercises"
                    onClick={onNavigateClose}
                    className="btn btn-ghost"
                    style={{ width: "100%" }}
                  >
                    {t("nav.exercises")}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={onNavigateClose}
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: 8 }}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <button
                    onClick={() => {
                      onNavigateClose();
                      handleSignOut();
                    }}
                    className="btn btn-ghost"
                    style={{ width: "100%", marginTop: 8 }}
                  >
                    {t("nav.signout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={onNavigateClose}
                    className="btn btn-ghost"
                    style={{ width: "100%" }}
                  >
                    {t("nav.signup")}
                  </Link>
                  <Link
                    to="/login"
                    onClick={onNavigateClose}
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: 8 }}
                  >
                    {t("nav.signin")}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
