import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();

  const validate = () => {
    if (!email || !password) {
      setError("Please fill email and password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await login(email, password, remember);
      if (result.success) {
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }} className="card">
        <h2 style={{ fontSize: "1.5rem", marginBottom: 6 }}>{t("auth.login")}</h2>
        <p className="small-muted" style={{ marginBottom: 12 }}>
          {t("auth.enterAccount")}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="form-label">{t("auth.email")}</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">{t("auth.password")}</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              {t("auth.remember")}
            </label>
            <a className="small-muted" href="#">
              {t("auth.forgot")}
            </a>
          </div>

          <div>
            <button
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? t("common.loading") : t("auth.login")}
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
