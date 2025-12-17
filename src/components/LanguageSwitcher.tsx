import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitcher(): JSX.Element {
  const { language, setLanguage, isRTL } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "ar" as const, name: "العربية", flag: "🇸🇦" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn btn-ghost"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          fontSize: "0.9rem",
        }}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span style={{ fontSize: "1.2rem" }}>{currentLang?.flag}</span>
        <span>{currentLang?.name}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            [isRTL ? "left" : "right"]: 0,
            marginTop: 8,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "1px solid #e5e7eb",
            minWidth: 150,
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "10px 16px",
                textAlign: isRTL ? "right" : "left",
                background: language === lang.code ? "#f3f4f6" : "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.9rem",
                color: language === lang.code ? "var(--accent)" : "#374151",
                fontWeight: language === lang.code ? 600 : 400,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.background = "#f9fafb";
                }
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

