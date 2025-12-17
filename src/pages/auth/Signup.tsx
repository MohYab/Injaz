import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

type SignupResponse = { token?: string; user?: any; message?: string };

export default function Signup(): JSX.Element {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const validate = () => {
    if (!fullName || !email || !password) {
      setError(t("auth.completeFields"));
      return false;
    }
    if (password !== confirmPwd) {
      setError(t("auth.passwordsMatch"));
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data: SignupResponse = await res
        .json()
        .catch(() => ({} as SignupResponse));
      if (!res.ok) {
        setError(data.message || t("auth.signupFailed"));
        setLoading(false);
        return;
      }
      if (data.token) {
        sessionStorage.setItem("injaz_token", data.token);
        if (data.user)
          sessionStorage.setItem("injaz_user", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
        return;
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(t("auth.networkError"));
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
      <div style={{ maxWidth: 540, width: "100%" }} className="card">
        <h2 style={{ fontSize: "1.6rem", marginBottom: 6 }}>
          {t("auth.createAccount")}
        </h2>
        <p className="small-muted" style={{ marginBottom: 12 }}>
          {t("auth.signupDescription")}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="form-label">{t("auth.fullName")}</label>
            <input
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

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

          <div>
            <label className="form-label">{t("auth.confirmPassword")}</label>
            <input
              className="form-input"
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
          </div>

          <div>
            <button
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? t("auth.creating") : t("auth.signup")}
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
