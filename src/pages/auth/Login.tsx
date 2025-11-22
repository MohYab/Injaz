import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginResponse = {
  token?: string;
  user?: { id: string; fullName?: string; email?: string };
  message?: string;
};

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: LoginResponse = await res
        .json()
        .catch(() => ({} as LoginResponse));
      if (!res.ok) {
        setError(data?.message || `Login failed (${res.status})`);
        setLoading(false);
        return;
      }
      if (data.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("injaz_token", data.token);
        if (data.user) storage.setItem("injaz_user", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
      } else {
        setError("No token returned.");
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
        <h2 style={{ fontSize: "1.5rem", marginBottom: 6 }}>Sign in</h2>
        <p className="small-muted" style={{ marginBottom: 12 }}>
          Enter your account to continue
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Password</label>
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
              Remember
            </label>
            <a className="small-muted" href="#">
              Forgot?
            </a>
          </div>

          <div>
            <button
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Signing..." : "Sign in"}
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
